import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { clearAdminSession } from '../../utils/authSecurity';
import { uploadDocument } from '../../utils/documentStorage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './AdminDashboard.css';

const emptyForm = {
  organizationName: '',
  nationalNumber: '',
  memberNumber: '',
  documentNumber: '',
  status: 'Certified',
  pdfUrl: '',
};

function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // PDF Handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayFileName, setDisplayFileName] = useState('');
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [copyMsg, setCopyMsg] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'records'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setRecords(list);
    } catch (err) {
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    clearAdminSession();
    try {
      await signOut(auth);
    } catch (_) {}
    navigate('/');
  };

  const openAddModal = () => {
    setEditId(null);
    setForm(emptyForm);
    resetUploadState();
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditId(record.id);
    setForm({
      organizationName: record.organizationName || '',
      nationalNumber: record.nationalNumber || '',
      memberNumber: record.memberNumber || '',
      documentNumber: record.documentNumber || '',
      status: record.status === 'Uncertified' || record.status === 'غير مصدقة' ? 'Uncertified' : 'Certified',
      pdfUrl: record.pdfUrl || '',
    });
    resetUploadState();
    if (record.pdfUrl) {
      setDisplayFileName(record.pdfName || 'المستند الحالي مرفق');
      setUploadComplete(true);
    }
    setFormError('');
    setShowModal(true);
  };

  const resetUploadState = () => {
    setSelectedFile(null);
    setDisplayFileName('');
    setUploadPercent(0);
    setIsUploading(false);
    setUploadComplete(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    resetUploadState();
    setFormError('');
    setSaving(false);
  };

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Simple, user-friendly file selection:
   * Instant feedback, no technical jargon.
   */
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setFormError('يرجى اختيار ملف PDF صالح.');
      return;
    }

    setFormError('');
    setSelectedFile(file);
    setDisplayFileName(file.name);
    setUploadComplete(true); // Ready for instant save
  };

  /**
   * Save record and upload document smoothly in background
   */
  const handleSaveRecord = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.organizationName.trim()) {
      setFormError('يرجى إدخال اسم المنشأة.');
      return;
    }

    setSaving(true);
    setIsUploading(Boolean(selectedFile));

    try {
      let finalPdfUrl = form.pdfUrl.trim();
      let finalPdfPath = '';
      let finalPdfName = displayFileName;

      if (selectedFile) {
        const uploadResult = await uploadDocument(
          selectedFile,
          editId || `doc_${Date.now()}`,
          (pct) => setUploadPercent(pct)
        );

        finalPdfUrl = uploadResult.pdfUrl;
        finalPdfPath = uploadResult.pdfPath || '';
        finalPdfName = uploadResult.fileName;
      }

      if (editId) {
        // Update existing record
        const updatePayload = {
          organizationName: form.organizationName.trim(),
          nationalNumber: form.nationalNumber.trim(),
          memberNumber: form.memberNumber.trim(),
          documentNumber: form.documentNumber.trim(),
          status: form.status,
          updatedAt: serverTimestamp(),
        };

        if (finalPdfUrl) {
          updatePayload.pdfUrl = finalPdfUrl;
          updatePayload.pdfName = finalPdfName;
          if (finalPdfPath) updatePayload.pdfPath = finalPdfPath;
        }

        await updateDoc(doc(db, 'records', editId), updatePayload);
      } else {
        // Create new record
        const newPayload = {
          organizationName: form.organizationName.trim(),
          nationalNumber: form.nationalNumber.trim(),
          memberNumber: form.memberNumber.trim(),
          documentNumber: form.documentNumber.trim(),
          status: form.status,
          pdfUrl: finalPdfUrl,
          pdfPath: finalPdfPath,
          pdfName: finalPdfName,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await addDoc(collection(db, 'records'), newPayload);
      }

      closeModal();
      fetchRecords();
    } catch (err) {
      console.error('Error saving record:', err);
      setFormError('تعذر حفظ المعاملة. يرجى المحاولة مرة أخرى.');
    } finally {
      setSaving(false);
      setIsUploading(false);
    }
  };

  const handleDeleteRecord = async (record) => {
    try {
      if (record.pdfPath) {
        try {
          await deleteObject(ref(storage, record.pdfPath));
        } catch (_) {}
      }
      await deleteDoc(doc(db, 'records', record.id));
      setDeleteConfirm(null);
      fetchRecords();
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const copyPublicUrl = (recordId) => {
    const fullUrl = `${window.location.origin}/record/${recordId}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopyMsg(recordId);
      setTimeout(() => setCopyMsg(''), 2500);
    });
  };

  const filteredRecords = records.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      (r.organizationName && r.organizationName.toLowerCase().includes(term)) ||
      (r.nationalNumber && r.nationalNumber.includes(term)) ||
      (r.memberNumber && r.memberNumber.includes(term)) ||
      (r.documentNumber && r.documentNumber.includes(term))
    );
  });

  return (
    <div className="adm-page-container">
      <Header />

      <main className="adm-main-body">
        {/* Header Panel */}
        <div className="adm-header-panel" dir="rtl">
          <div className="adm-header-info">
            <h1 className="adm-main-heading">لوحة تحكم إدارة المعاملات</h1>
            <p className="adm-sub-heading">نظام التوثيق والتحقق الإلكتروني — غرفة الرياض</p>
          </div>

          <div className="adm-header-buttons">
            <button type="button" onClick={openAddModal} className="adm-btn adm-btn-create">
              <span className="adm-btn-plus">+</span> إضافة معاملة جديدة
            </button>
            <button type="button" onClick={handleLogout} className="adm-btn adm-btn-exit">
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* Dashboard Stat Counters */}
        <div className="adm-metrics-row" dir="rtl">
          <div className="adm-metric-card card-total">
            <span className="metric-title">إجمالي المعاملات</span>
            <span className="metric-value">{records.length}</span>
          </div>
          <div className="adm-metric-card card-certified">
            <span className="metric-title">معاملات مصدقة (Certified)</span>
            <span className="metric-value">
              {records.filter(r => r.status === 'Certified' || r.status === 'مصدقة').length}
            </span>
          </div>
          <div className="adm-metric-card card-uncertified">
            <span className="metric-title">معاملات غير مصدقة (Uncertified)</span>
            <span className="metric-value">
              {records.filter(r => r.status === 'Uncertified' || r.status === 'غير مصدقة').length}
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="adm-filter-bar" dir="rtl">
          <div className="adm-search-container">
            <input
              type="text"
              className="adm-search-field"
              placeholder="ابحث باسم المنشأة، الرقم الموحد، رقم العضوية أو الوثيقة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="adm-count-badge">
            عرض {filteredRecords.length} من أصل {records.length} معاملة
          </div>
        </div>

        {/* Table View */}
        <div className="adm-table-card">
          {loading ? (
            <div className="adm-loader" dir="rtl">
              <div className="adm-spinner"></div>
              <p>جاري تحميل المعاملات...</p>
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-data-table" dir="rtl">
                <thead>
                  <tr>
                    <th>اسم المنشأة</th>
                    <th>الرقم الموحد</th>
                    <th>رقم العضوية</th>
                    <th>رقم الوثيقة</th>
                    <th>حالة الوثيقة</th>
                    <th>ملف المستند (PDF)</th>
                    <th style={{ textAlign: 'center' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="adm-empty-message">
                        لا توجد سجلات مطابقة. انقر على "+ إضافة معاملة جديدة" للبدء.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map(record => {
                      const isCert = record.status === 'Certified' || record.status === 'مصدقة';
                      return (
                        <tr key={record.id} className="adm-row-item">
                          <td className="adm-col-org">
                            <strong>{record.organizationName}</strong>
                          </td>
                          <td className="adm-col-number">{record.nationalNumber || '—'}</td>
                          <td className="adm-col-number">{record.memberNumber || '—'}</td>
                          <td className="adm-col-number">{record.documentNumber || '—'}</td>
                          <td>
                            <span className={`adm-status-tag ${isCert ? 'tag-certified' : 'tag-uncertified'}`}>
                              {isCert ? 'Certified' : 'Uncertified'}
                            </span>
                          </td>
                          <td>
                            {record.pdfUrl ? (
                              <a
                                href={`/record/${record.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="adm-pdf-badge"
                                title="عرض المستند في صفحة المعاملة"
                              >
                                📄 مستند مرفق
                              </a>
                            ) : (
                              <span className="adm-no-doc">لا يوجد</span>
                            )}
                          </td>
                          <td className="adm-col-btns">
                            <button
                              type="button"
                              onClick={() => copyPublicUrl(record.id)}
                              className={`adm-pill-btn pill-copy ${copyMsg === record.id ? 'pill-copied' : ''}`}
                              title="نسخ الرابط العام للمستخدم"
                            >
                              {copyMsg === record.id ? '✓ تم النسخ' : '🔗 نسخ الرابط'}
                            </button>
                            <a
                              href={`/record/${record.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="adm-pill-btn pill-view"
                              title="معاينة الصفحة العامة"
                            >
                              👁️ معاينة
                            </a>
                            <button
                              type="button"
                              onClick={() => openEditModal(record)}
                              className="adm-pill-btn pill-edit"
                              title="تعديل بيانات المعاملة"
                            >
                              ✏️ تعديل
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(record)}
                              className="adm-pill-btn pill-delete"
                              title="حذف المعاملة"
                            >
                              🗑️ حذف
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* --- ADD / EDIT RECORD MODAL --- */}
      {showModal && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-window" dir="rtl">
            <div className="adm-modal-head">
              <h2 className="adm-modal-title">
                {editId ? 'تعديل بيانات المعاملة' : 'إضافة معاملة جديدة'}
              </h2>
              <button type="button" onClick={closeModal} className="adm-modal-close" title="إغلاق">✕</button>
            </div>

            <form onSubmit={handleSaveRecord} className="adm-modal-body">
              <div className="adm-form-group">
                <label className="adm-label">
                  اسم المنشأة / Organization Name <span className="adm-required">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  className="adm-text-input"
                  value={form.organizationName}
                  onChange={handleFormChange}
                  placeholder="مؤسسة ..."
                  required
                />
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-label">الرقم الموحد / National Number</label>
                  <input
                    type="text"
                    name="nationalNumber"
                    className="adm-text-input"
                    value={form.nationalNumber}
                    onChange={handleFormChange}
                    placeholder="7003200974"
                    dir="ltr"
                  />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">رقم العضوية / Member Number</label>
                  <input
                    type="text"
                    name="memberNumber"
                    className="adm-text-input"
                    value={form.memberNumber}
                    onChange={handleFormChange}
                    placeholder="260041"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">رقم الوثيقة / Document Number</label>
                <input
                  type="text"
                  name="documentNumber"
                  className="adm-text-input"
                  value={form.documentNumber}
                  onChange={handleFormChange}
                  placeholder="28388431"
                  dir="ltr"
                />
              </div>

              {/* Exact Status Buttons: Certified (Green) & Uncertified (Red) */}
              <div className="adm-form-group">
                <label className="adm-label">حالة الوثيقة / Document Status</label>
                <div className="adm-status-btn-group">
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, status: 'Certified' }))}
                    className={`adm-choice-btn btn-choice-certified ${
                      form.status === 'Certified' || form.status === 'مصدقة' ? 'active-cert' : ''
                    }`}
                  >
                    <span className="adm-btn-dot"></span>
                    Certified
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, status: 'Uncertified' }))}
                    className={`adm-choice-btn btn-choice-uncertified ${
                      form.status === 'Uncertified' || form.status === 'غير مصدقة' ? 'active-uncert' : ''
                    }`}
                  >
                    <span className="adm-btn-dot"></span>
                    Uncertified
                  </button>
                </div>
              </div>

              {/* Streamlined Simple PDF Upload Area */}
              <div className="adm-form-group">
                <label className="adm-label">مستند الخطاب / Document PDF</label>

                <div
                  className={`adm-upload-box ${uploadComplete ? 'upload-done' : ''}`}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                  />

                  <div className="upload-box-content">
                    <span className="upload-box-icon">
                      {uploadComplete ? '✅' : '📁'}
                    </span>
                    <p className="upload-box-text">
                      {displayFileName
                        ? `تم اختيار الملف: ${displayFileName}`
                        : 'انقر هنا لاختيار ملف PDF من جهازك'}
                    </p>
                    <span className="upload-box-note">
                      سيتم حفظ المستند تلقائياً مع المعاملة
                    </span>
                  </div>

                  {isUploading && (
                    <div className="adm-upload-progress-bar">
                      <div className="progress-fill" style={{ width: `${uploadPercent || 70}%` }}></div>
                    </div>
                  )}
                </div>

                {/* Direct Document URL Option */}
                <div className="adm-direct-link-row">
                  <label className="adm-direct-label">أو ضع رابط مستند مباشر (Direct Link):</label>
                  <input
                    type="url"
                    name="pdfUrl"
                    className="adm-text-input"
                    value={form.pdfUrl}
                    onChange={handleFormChange}
                    placeholder="https://.../letter.pdf"
                    dir="ltr"
                  />
                </div>
              </div>

              {formError && <div className="adm-error-alert">{formError}</div>}

              {/* Actions: Save & Cancel */}
              <div className="adm-modal-footer">
                <button
                  type="submit"
                  className="adm-btn adm-btn-submit"
                  disabled={saving}
                >
                  {saving ? 'جاري حفظ المعاملة...' : editId ? 'تحديث المعاملة' : 'حفظ المعاملة'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="adm-btn adm-btn-dismiss"
                  disabled={saving}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirm && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-window confirm-box" dir="rtl">
            <div className="confirm-icon-big">⚠️</div>
            <h3 className="confirm-box-title">تأكيد حذف المعاملة</h3>
            <p className="confirm-box-text">
              هل أنت متأكد من رغبتك في حذف معاملة <strong>"{deleteConfirm.organizationName}"</strong>؟
              سيتم إزالة السجل نهائياً.
            </p>
            <div className="adm-modal-footer">
              <button
                type="button"
                onClick={() => handleDeleteRecord(deleteConfirm)}
                className="adm-btn adm-btn-danger"
              >
                نعم، احذف المعاملة
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="adm-btn adm-btn-dismiss"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AdminDashboard;
