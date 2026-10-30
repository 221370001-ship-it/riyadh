import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Converts a browser File/Blob to a Base64 string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Chunks large base64 data and stores in Firestore subcollection or document
 */
export async function storePdfInFirestore(recordId, base64Data, fileName) {
  const CHUNK_SIZE = 700 * 1024; // 700KB chunks
  const totalChunks = Math.ceil(base64Data.length / CHUNK_SIZE);

  if (totalChunks === 1) {
    const docRef = doc(db, 'record_pdfs', recordId);
    await setDoc(docRef, {
      data: base64Data,
      fileName,
      totalChunks: 1,
      createdAt: new Date().toISOString()
    });
    return `firestore:${recordId}`;
  }

  // Multi-chunk storage
  for (let i = 0; i < totalChunks; i++) {
    const chunkData = base64Data.substring(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const chunkRef = doc(db, 'record_pdfs', `${recordId}_chunk_${i}`);
    await setDoc(chunkRef, {
      chunk: chunkData,
      index: i,
      totalChunks,
      fileName,
      recordId
    });
  }

  const metaRef = doc(db, 'record_pdfs', recordId);
  await setDoc(metaRef, {
    totalChunks,
    fileName,
    isChunked: true,
    createdAt: new Date().toISOString()
  });

  return `firestore:${recordId}`;
}

/**
 * Retrieves PDF Data URI from Firestore if stored via chunks
 */
export async function getPdfFromFirestore(recordId) {
  try {
    const metaRef = doc(db, 'record_pdfs', recordId);
    const metaSnap = await getDoc(metaRef);

    if (!metaSnap.exists()) return null;

    const meta = metaSnap.data();
    if (!meta.isChunked && meta.data) {
      return meta.data;
    }

    let fullBase64 = '';
    for (let i = 0; i < meta.totalChunks; i++) {
      const chunkRef = doc(db, 'record_pdfs', `${recordId}_chunk_${i}`);
      const chunkSnap = await getDoc(chunkRef);
      if (chunkSnap.exists()) {
        fullBase64 += chunkSnap.data().chunk;
      }
    }

    return fullBase64 || null;
  } catch (err) {
    console.error('Error fetching PDF from Firestore:', err);
    return null;
  }
}

/**
 * Unified, bulletproof PDF upload service:
 * 1. Attempts direct Firebase Storage upload with 4s timeout
 * 2. If Storage is blocked (due to Google Cloud project billing or bucket status),
 *    instantly and reliably falls back to secure Firestore document chunking.
 * Zero technical messages shown to the user.
 */
export async function uploadDocument(file, recordId, onProgress) {
  const base64Data = await fileToBase64(file);

  // Try Firebase Storage first with a swift timeout
  try {
    const storagePromise = new Promise((resolve, reject) => {
      const storagePath = `documents/${recordId}_${Date.now()}_${file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (onProgress) onProgress(progress);
        },
        (err) => reject(err),
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url, path: storagePath });
          } catch (e) {
            reject(e);
          }
        }
      );
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storage timeout')), 4000)
    );

    const result = await Promise.race([storagePromise, timeoutPromise]);
    return {
      pdfUrl: result.url,
      pdfPath: result.path,
      fileName: file.name,
      fileSize: file.size
    };
  } catch (storageErr) {
    // Silent fallback to robust Firestore storage
    console.warn('Storage unavailable, saving securely to Firestore database:', storageErr.message);
    if (onProgress) onProgress(90);

    const firestoreRef = await storePdfInFirestore(recordId, base64Data, file.name);
    if (onProgress) onProgress(100);

    return {
      pdfUrl: firestoreRef,
      pdfPath: '',
      fileName: file.name,
      fileSize: file.size,
      directDataUri: base64Data
    };
  }
}
