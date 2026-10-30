import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './PublicRecord.css';

function PublicRecord() {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  const handleLetterClick = () => {
    if (record && record.pdfUrl) {
      window.open(record.pdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('لا يوجد ملف PDF مرتبط بهذه المعاملة');
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
              <h1 className="verification-title">التحقق من المعاملات:</h1>
              <div className="verification-divider" />
            </div>

            {/* Information Fields List */}
            <div className="verification-fields-list">
              {/* Field 1: Organization Name */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  Organization Name / اسم المنشأة
                </span>
                <span className="field-bold-value organization-value">
                  {record.organizationName || '—'}
                </span>
              </div>

              {/* Field 2: National Number */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  National Number / الرقم الموحد
                </span>
                <span className="field-bold-value" dir="ltr">
                  {record.nationalNumber || '—'}
                </span>
              </div>

              {/* Field 3: Member Number */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  Member Number / رقم العضوية
                </span>
                <span className="field-bold-value" dir="ltr">
                  {record.memberNumber || '—'}
                </span>
              </div>

              {/* Field 4: Document Number */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  Document Number / رقم الوثيقة
                </span>
                <span className="field-bold-value" dir="ltr">
                  {record.documentNumber || '—'}
                </span>
              </div>

              {/* Field 5: Status */}
              <div className="verification-field-item">
                <span className="field-bilingual-label">
                  Status / حالة الوثيقة
                </span>
                <div className="status-badge-container">
                  <span
                    className={`verified-status-badge ${
                      record.status === 'غير مصدقة' || record.status === 'Uncertified'
                        ? 'status-uncertified'
                        : 'status-certified'
                    }`}
                  >
                    {record.status || 'مصدقة'}
                  </span>
                </div>
              </div>
            </div>

            {/* Letter / خطاب Button */}
            <div className="letter-action-container">
              <button
                type="button"
                className="letter-action-btn"
                onClick={handleLetterClick}
              >
                خطاب / Letter
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
