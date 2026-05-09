'use client';
// Plumbing Service Booking Form
import { useState } from 'react';
import axios from 'axios';

export default function PlumbingFormComponent() {
  const [formData, setFormData] = useState({
    // Customer Info
    customerName: '',
    phone: '',
    email: '',
    serviceAddress: '',

    // Service Details
    serviceType: '',
    issueDescription: '',
    estimatedDurationHours: '',
    estimatedAmount: '',

    // Scheduling
    scheduledDate: '',
    scheduledTime: '',

    // Extra
    inspectionCompleted: false,
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.serviceType ||
      !formData.scheduledDate ||
      !formData.scheduledTime
    ) {
      alert('Please fill all required fields!');
      setLoading(false);
      return;
    }

    const submitData = {
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      serviceAddress: formData.serviceAddress,
      serviceType: formData.serviceType,
      issueDescription: formData.issueDescription,
      estimatedDurationHours: formData.estimatedDurationHours
        ? parseInt(formData.estimatedDurationHours)
        : null,
      estimatedAmount: formData.estimatedAmount
        ? parseFloat(formData.estimatedAmount)
        : null,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      inspectionCompleted: formData.inspectionCompleted,
      notes: formData.notes,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/plumbing-services',
        submitData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Success:', response.data);
      alert('✅ Plumbing service booked successfully!');

      setFormData({
        customerName: '',
        phone: '',
        email: '',
        serviceAddress: '',
        serviceType: '',
        issueDescription: '',
        estimatedDurationHours: '',
        estimatedAmount: '',
        scheduledDate: '',
        scheduledTime: '',
        inspectionCompleted: false,
        notes: '',
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(
        '❌ Error booking service! ' +
          (error.response?.data?.message || 'Please try again')
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-50 transition-all outline-none bg-white text-gray-800 placeholder-gray-400';

  const labelClass = 'text-sm font-semibold text-gray-600 tracking-wide uppercase';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        * { font-family: 'DM Sans', sans-serif; }

        .page-wrap {
          min-height: 100vh;
          background-color: #f9f9f7;
          background-image:
            radial-gradient(circle at 10% 20%, rgba(251,146,60,0.08) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(251,146,60,0.06) 0%, transparent 50%);
          padding: 48px 16px;
        }

        .card {
          background: #ffffff;
          border-radius: 24px;
          box-shadow:
            0 1px 3px rgba(0,0,0,0.06),
            0 8px 32px rgba(0,0,0,0.08),
            0 0 0 1px rgba(0,0,0,0.04);
          padding: 48px;
          max-width: 860px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(251,146,60,0.1);
          border: 1px solid rgba(251,146,60,0.25);
          color: #ea580c;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        h1.title {
          font-family: 'Sora', sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: #111;
          line-height: 1.15;
          margin-bottom: 8px;
        }

        h1.title span {
          color: #ea580c;
        }

        .subtitle {
          color: #888;
          font-size: 16px;
          margin-bottom: 0;
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, #ea580c33, transparent);
          margin: 32px 0;
        }

        .section-header {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .section-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(251,146,60,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .grid-2.col-span {
          grid-column: 1 / -1;
        }

        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr; }
          .card { padding: 28px 20px; }
          h1.title { font-size: 28px; }
        }

        .field { display: flex; flex-direction: column; gap: 8px; }
        .field.full { grid-column: 1 / -1; }

        input, select, textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          color: #1a1a1a;
          background: #fafafa;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 4px rgba(249,115,22,0.1);
          background: #fff;
        }

        input::placeholder, textarea::placeholder { color: #bbb; }

        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; background-size: 18px; padding-right: 44px; }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (max-width: 480px) {
          .service-grid { grid-template-columns: 1fr; }
        }

        .service-card {
          border: 2px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s;
          background: #fafafa;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .service-card:hover {
          border-color: #f97316;
          background: rgba(249,115,22,0.03);
        }

        .service-card.selected {
          border-color: #f97316;
          background: rgba(249,115,22,0.07);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.12);
        }

        .service-card-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .service-card-label {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a1a;
        }

        .service-card-desc {
          font-size: 12px;
          color: #888;
          margin-top: 2px;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          background: #fafafa;
        }

        .checkbox-row:hover { border-color: #f97316; }

        .checkbox-row input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: #f97316;
          border-radius: 6px;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          border: none;
          box-shadow: none;
        }

        .checkbox-row input[type="checkbox"]:focus {
          box-shadow: none;
          border: none;
        }

        .submit-btn {
          width: 100%;
          background: #ea580c;
          color: white;
          padding: 16px 24px;
          border-radius: 14px;
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.02em;
          margin-top: 8px;
          box-shadow: 0 4px 20px rgba(234,88,12,0.3);
        }

        .submit-btn:hover:not(:disabled) {
          background: #c2410c;
          box-shadow: 0 6px 28px rgba(234,88,12,0.4);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .price-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 12px;
          color: #9a3412;
          font-weight: 600;
        }

        .required { color: #ef4444; margin-left: 2px; }

        .spin {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .footer-note {
          text-align: center;
          font-size: 13px;
          color: #aaa;
          margin-top: 24px;
        }

        .info-strip {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .info-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          color: #555;
          font-weight: 500;
        }

        .info-chip span:first-child { font-size: 16px; }
      `}</style>

      <div className="page-wrap">
        <div className="card">

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div className="hero-badge">
              🔧 Professional Plumbing
            </div>
            <h1 className="title">
              Book a <span>Plumbing</span><br />Service
            </h1>
            <p className="subtitle">Fast, reliable plumbing solutions — booked in minutes.</p>

            <div className="info-strip" style={{ marginTop: '20px' }}>
              <div className="info-chip"><span>💰</span> $50 – $250</div>
              <div className="info-chip"><span>⏱️</span> 1–2 Hours</div>
              <div className="info-chip"><span>✅</span> Expert Plumbers</div>
              <div className="info-chip"><span>🚨</span> Emergency Available</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── Service Type ── */}
            <div style={{ marginBottom: '32px' }}>
              <div className="section-header">
                <div className="section-icon">🔧</div>
                Select Service Type <span className="required">*</span>
              </div>

              <div className="service-grid">
                {[
                  { value: 'emergency', icon: '🚨', label: 'Emergency Service', desc: 'Urgent same-day response' },
                  { value: 'leak_repair', icon: '💧', label: 'Leak Repair', desc: 'Fix pipes & faucet leaks' },
                  { value: 'installation', icon: '🛠️', label: 'Installation', desc: 'New fixtures & fittings' },
                  { value: 'maintenance', icon: '🔍', label: 'Maintenance', desc: 'Routine checkup & service' },
                ].map((svc) => (
                  <div
                    key={svc.value}
                    className={`service-card ${formData.serviceType === svc.value ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, serviceType: svc.value })}
                  >
                    <div className="service-card-icon">{svc.icon}</div>
                    <div>
                      <div className="service-card-label">{svc.label}</div>
                      <div className="service-card-desc">{svc.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider" />

            {/* ── Customer Info ── */}
            <div style={{ marginBottom: '32px' }}>
              <div className="section-header">
                <div className="section-icon">👤</div>
                Customer Information
              </div>

              <div className="grid-2">
                <div className="field">
                  <label className={labelClass}>Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Ali Hassan"
                    required
                  />
                </div>

                <div className="field">
                  <label className={labelClass}>Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX-XXXXXXX"
                    required
                  />
                </div>

                <div className="field">
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="field full" style={{ gridColumn: '1 / -1' }}>
                  <label className={labelClass}>Service Address</label>
                  <input
                    type="text"
                    name="serviceAddress"
                    value={formData.serviceAddress}
                    onChange={handleChange}
                    placeholder="House #5, Street 7, Islamabad"
                  />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* ── Issue Details ── */}
            <div style={{ marginBottom: '32px' }}>
              <div className="section-header">
                <div className="section-icon">📋</div>
                Issue Details
              </div>

              <div className="grid-2">
                <div className="field full" style={{ gridColumn: '1 / -1' }}>
                  <label className={labelClass}>Describe the Issue</label>
                  <textarea
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. Leaking pipe under kitchen sink, water pressure issue..."
                  />
                </div>

                <div className="field">
                  <label className={labelClass}>Estimated Duration (hrs)</label>
                  <select
                    name="estimatedDurationHours"
                    value={formData.estimatedDurationHours}
                    onChange={handleChange}
                  >
                    <option value="">Select Duration</option>
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4+ Hours</option>
                  </select>
                </div>

                <div className="field">
                  <label className={labelClass}>
                    Estimated Budget &nbsp;
                    <span className="price-badge">💰 $50–$250</span>
                  </label>
                  <input
                    type="number"
                    name="estimatedAmount"
                    value={formData.estimatedAmount}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    min="50"
                    max="250"
                  />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* ── Scheduling ── */}
            <div style={{ marginBottom: '32px' }}>
              <div className="section-header">
                <div className="section-icon">📅</div>
                Schedule Appointment
              </div>

              <div className="grid-2">
                <div className="field">
                  <label className={labelClass}>Preferred Date <span className="required">*</span></label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="field">
                  <label className={labelClass}>Preferred Time <span className="required">*</span></label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field full" style={{ gridColumn: '1 / -1' }}>
                  <label
                    className="checkbox-row"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <input
                      type="checkbox"
                      name="inspectionCompleted"
                      checked={formData.inspectionCompleted}
                      onChange={handleChange}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>Pre-Inspection Completed</div>
                      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Check if a site inspection has already been done</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* ── Notes ── */}
            <div style={{ marginBottom: '32px' }}>
              <div className="section-header">
                <div className="section-icon">📝</div>
                Additional Notes
              </div>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special instructions or access details for the plumber..."
              />
            </div>

            {/* ── Submit ── */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="spin" />
                  Booking Service...
                </>
              ) : (
                <>
                  🔧 Book Plumbing Service →
                </>
              )}
            </button>
          </form>

          <p className="footer-note">
            Fields marked with <span style={{ color: '#ef4444' }}>*</span> are required &nbsp;·&nbsp; We'll confirm within 30 minutes
          </p>
        </div>
      </div>
    </>
  );
}