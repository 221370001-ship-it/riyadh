import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getPdfFromFirestore } from '../../utils/documentStorage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './PublicRecord.css';

function PublicRecord() {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [resolvingPdf, setResolvingPdf] = useState(false);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const docRef = doc(db, 'records', recordId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecord({ id: docSnap.id, ...docSnap.data() });
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching record:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [recordId]);

  const handleLetterClick = async () => {
    if (!record || !record.pdfUrl) {
      alert('لا يوجد ملف PDF مرتبط بهذه المعاملة');
      return;
    }

    // Direct HTTP URL
    if (record.pdfUrl.startsWith('http://') || record.pdfUrl.startsWith('https://')) {
      window.open(record.pdfUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Direct Data URI
    if (record.pdfUrl.startsWith('data:application/pdf')) {
      const win = window.open();
      if (win) {
        win.document.write(
          `<iframe src="${record.pdfUrl}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
        );
        win.document.title = record.pdfName || 'مستند المعاملة';
      }
      return;
    }

    // Handled via secure Firestore storage
    if (record.pdfUrl.startsWith('firestore:')) {
      setResolvingPdf(true);
      try {
        const base64Data = await getPdfFromFirestore(recordId);
        if (base64Data) {
          const win = window.open();
          if (win) {
            win.document.write(
              `<iframe src="${base64Data}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
            );
            win.document.title = record.pdfName || 'مستند المعاملة';
          }
        } else {
          alert('تعذر فتح ملف المستند.');
        }
      } catch (e) {
        console.error('PDF resolution error:', e);
        alert('حدث خطأ أثناء تحميل المستند.');
      } finally {
        setResolvingPdf(false);
      }
    }
  };

  return (
    <div className="public-page-wrapper">
      <Header />

      <main className="public-content-container">
        {loading ? (
          <div className="public-status-card" dir="rtl">
            <div className="spinner"></div>
            <p>جاري تحميل البيانات...</p>
          </div>
        ) : notFound ? (
          <div className="public-status-card" dir="rtl">
            <div className="status-icon">⚠️</div>
            <h2>السجل غير موجود</h2>
            <p>لم يتم العثور على المعاملة المطلوبة، يرجى التأكد من صحة الرابط.</p>
          </div>
        ) : (
          <div className="riyadh-verification-card" dir="rtl">
            {/* Card Header Title */}
            <div className="verification-card-header">
              <h1 className="verification-title">
                <span className="title-en">Transaction verification:</span>
                <span className="title-ar">التحقق من المعاملات:</span>
              </h1>
              <div className="verification-divider" />
            </div>

            {/* Information Fields List */}
            <div className="verification-fields-list">
              {/* Field 1: Organization Name */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  <span className="field-label-en">Organization Name</span>
                  <span className="field-label-ar">اسم المنشأة / </span>
                </span>
                <span className="field-bold-value organization-value">
                  {record.organizationName || '—'}
                </span>
              </div>

              {/* Field 2: National Number */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  <span className="field-label-en">National Number</span>
                  <span className="field-label-ar">الرقم الموحد / </span>
                </span>
                <span className="field-bold-value">
                  {record.nationalNumber || '—'}
                </span>
              </div>

              {/* Field 3: Member Number */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  <span className="field-label-en">Member Number</span>
                  <span className="field-label-ar">رقم العضوية / </span>
                </span>
                <span className="field-bold-value">
                  {record.memberNumber || '—'}
                </span>
              </div>

              {/* Field 4: Document Number */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  <span className="field-label-en">Document Number</span>
                  <span className="field-label-ar">رقم الوثيقة / </span>
                </span>
                <span className="field-bold-value">
                  {record.documentNumber || '—'}
                </span>
              </div>

              {/* Field 5: Status */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  <span className="field-label-en">Document status</span>
                  <span className="field-label-ar">حالة الوثيقة / </span>
                </span>
                <div className="status-badge-container">
                  <span
                    className={`verified-status-badge ${
                      record.status === 'Uncertified' || record.status === 'غير مصدقة'
                        ? 'status-uncertified'
                        : 'status-certified'
                    }`}
                  >
                    {record.status === 'Uncertified' || record.status === 'غير مصدقة'
                      ? 'Uncertified'
                      : 'Certified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Letter / خطاب Action Button */}
            <div className="letter-action-container">
              <button
                type="button"
                className="letter-action-btn"
                onClick={handleLetterClick}
                disabled={resolvingPdf}
              >
                {resolvingPdf ? (
                  'Loading...'
                ) : (
                  <>
                    <span className="btn-label-en">Letter</span>
                    <span className="btn-label-ar">خطاب / </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default PublicRecord;
