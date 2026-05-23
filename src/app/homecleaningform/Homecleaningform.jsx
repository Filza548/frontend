'use client';
import { useState } from 'react';
import axios from 'axios';

export default function HomeCleaningForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    scheduledDate: '',
    scheduledTime: '',
    estimatedHours: '',
    ecoFriendlyProducts: false,
    isInsured: true,
    totalAmount: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.customerName || !formData.phone || !formData.serviceType ||
        !formData.scheduledDate || !formData.address) {
      alert('Please fill all required fields!');
      setLoading(false);
      return;
    }

    const submitData = {
      ...formData,
      estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null,
      totalAmount: formData.totalAmount ? parseFloat(formData.totalAmount) : null,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home-cleaning`, submitData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Success:', response.data);
      alert('✅ Home cleaning booking confirmed!');
      setFormData({
        customerName: '', phone: '', email: '', address: '',
        serviceType: '', scheduledDate: '', scheduledTime: '',
        estimatedHours: '', ecoFriendlyProducts: false,
        isInsured: true, totalAmount: '', notes: '',
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('❌ Booking failed! ' + (error.response?.data?.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none bg-white text-gray-700 placeholder-gray-400';
  const labelClass = 'text-sm font-semibold text-gray-600 tracking-wide uppercase';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f0faf4;
          min-height: 100vh;
        }

        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(145deg, #f0faf4 0%, #ffffff 50%, #e8f5e9 100%);
          padding: 48px 16px;
          position: relative;
          overflow: hidden;
        }

        .page-wrapper::before {
          content: '';
          position: fixed;
          top: -120px;
          right: -120px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(134,239,172,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .page-wrapper::after {
          content: '';
          position: fixed;
          bottom: -100px;
          left: -100px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .container { max-width: 860px; margin: 0 auto; }

        .header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeDown 0.6s ease both;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #dcfce7;
          color: #16a34a;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 20px;
          border: 1px solid #bbf7d0;
        }

        .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse 2s infinite;
        }

        .title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          color: #14532d;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .title span {
          color: #16a34a;
          font-style: italic;
        }

        .subtitle {
          color: #6b7280;
          font-size: 1.05rem;
          font-weight: 300;
          margin-bottom: 20px;
        }

        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #86efac;
          font-size: 18px;
        }

        .divider-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(to right, transparent, #86efac);
        }

        .divider-line.rev {
          background: linear-gradient(to left, transparent, #86efac);
        }

        /* Feature pills */
        .features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .feature-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1.5px solid #d1fae5;
          color: #15803d;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 999px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        /* Card */
        .card {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          box-shadow:
            0 0 0 1px rgba(134,239,172,0.3),
            0 20px 60px rgba(22,163,74,0.08),
            0 4px 16px rgba(0,0,0,0.04);
          padding: 40px;
          animation: fadeUp 0.7s ease both 0.1s;
        }

        /* Section */
        .section {
          border-bottom: 1.5px solid #f0fdf4;
          padding-bottom: 32px;
          margin-bottom: 32px;
        }

        .section:last-of-type { border-bottom: none; }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: #14532d;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        /* Grid */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .col-span-2 { grid-column: span 2; }

        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr; }
          .col-span-2 { grid-column: span 1; }
          .card { padding: 24px 18px; }
        }

        /* Field */
        .field { display: flex; flex-direction: column; gap: 8px; }

        .label {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .req { color: #ef4444; }

        input, select, textarea {
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #dcfce7;
          border-radius: 12px;
          background: white;
          color: #1f2937;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 4px rgba(34,197,94,0.08);
        }

        input::placeholder, textarea::placeholder { color: #9ca3af; font-weight: 300; }

        select { cursor: pointer; }
        textarea { resize: vertical; min-height: 90px; }

        /* Price hint */
        .price-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #16a34a;
          font-weight: 500;
          margin-top: 4px;
        }

        /* Checkbox */
        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 2px solid #dcfce7;
          border-radius: 12px;
          background: #f0fdf4;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .checkbox-row:hover { border-color: #86efac; }

        .checkbox-row input[type='checkbox'] {
          width: 18px; height: 18px;
          padding: 0;
          border: 2px solid #22c55e;
          border-radius: 5px;
          accent-color: #16a34a;
          cursor: pointer;
          flex-shrink: 0;
        }

        .checkbox-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .checkbox-sub {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 300;
          margin-top: 2px;
        }

        /* Submit */
        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white;
          border: none;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 20px rgba(22,163,74,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(22,163,74,0.4);
        }

        .submit-btn:active:not(:disabled) { transform: translateY(0); }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px; height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .footer-note {
          text-align: center;
          font-size: 12.5px;
          color: #9ca3af;
          margin-top: 20px;
          font-weight: 300;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="container">

          {/* Header */}
          <div className="header">
            <div className="badge">
              <span className="badge-dot"></span>
              Professional Services
            </div>
            <h1 className="title">
              Home <span>Cleaning</span><br />Booking
            </h1>
            <p className="subtitle">Schedule a spotless clean — $60 to $200 · 2–3 hours</p>
            <div className="divider">
              <div className="divider-line rev"></div>
              🌿
              <div className="divider-line"></div>
            </div>
            <div className="features">
              <span className="feature-pill">🧹 Deep Cleaning</span>
              <span className="feature-pill">🔄 Regular Maintenance</span>
              <span className="feature-pill">🌱 Eco-friendly Products</span>
              <span className="feature-pill">🛡️ Fully Insured</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="card">
            <form onSubmit={handleSubmit}>

              {/* Customer Info */}
              <div className="section">
                <h3 className="section-title">
                  <div className="section-icon">👤</div>
                  Customer Information
                </h3>
                <div className="grid-2">
                  <div className="field">
                    <label className="label">Full Name <span className="req">*</span></label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="field">
                    <label className="label">Phone Number <span className="req">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>

                  <div className="field">
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="field col-span-2">
                    <label className="label">Service Address <span className="req">*</span></label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={2}
                      placeholder="Enter the address to be cleaned"
                    />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="section">
                <h3 className="section-title">
                  <div className="section-icon">🧹</div>
                  Service Details
                </h3>
                <div className="grid-2">
                  <div className="field col-span-2">
                    <label className="label">Service Type <span className="req">*</span></label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="deep_cleaning">🧼 Deep Cleaning</option>
                      <option value="regular_maintenance">🔄 Regular Maintenance</option>
                      <option value="eco_friendly">🌱 Eco-friendly Cleaning</option>
                      <option value="insured">🛡️ Insured Premium Clean</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="label">Estimated Duration (hrs)</label>
                    <select
                      name="estimatedHours"
                      value={formData.estimatedHours}
                      onChange={handleChange}
                    >
                      <option value="">Select hours</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5+ hours</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="label">Total Amount ($)</label>
                    <input
                      type="number"
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                      min="60"
                      max="200"
                      placeholder="60 – 200"
                    />
                    <div className="price-hint">
                      💵 Price range: $60 – $200
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid-2" style={{ marginTop: '18px' }}>
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      name="ecoFriendlyProducts"
                      checked={formData.ecoFriendlyProducts}
                      onChange={handleChange}
                    />
                    <div>
                      <div className="checkbox-label">🌱 Eco-friendly Products</div>
                      <div className="checkbox-sub">Use green, non-toxic cleaning materials</div>
                    </div>
                  </label>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      name="isInsured"
                      checked={formData.isInsured}
                      onChange={handleChange}
                    />
                    <div>
                      <div className="checkbox-label">🛡️ Insured Service</div>
                      <div className="checkbox-sub">Fully covered for any accidental damage</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Schedule */}
              <div className="section">
                <h3 className="section-title">
                  <div className="section-icon">📅</div>
                  Schedule Appointment
                </h3>
                <div className="grid-2">
                  <div className="field">
                    <label className="label">Scheduled Date <span className="req">*</span></label>
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
                    <label className="label">Preferred Time</label>
                    <input
                      type="time"
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="section" style={{ borderBottom: 'none', marginBottom: '24px' }}>
                <h3 className="section-title">
                  <div className="section-icon">📝</div>
                  Additional Notes
                </h3>
                <div className="field">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special instructions, areas to focus on, pets at home, entry instructions..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Booking...
                  </>
                ) : (
                  <>
                    🏠 Confirm Cleaning Booking →
                  </>
                )}
              </button>
            </form>

            <p className="footer-note">
              Fields marked <span style={{ color: '#ef4444' }}>*</span> are required &nbsp;·&nbsp; We'll confirm your booking via phone or email
            </p>
          </div>

        </div>
      </div>
    </>
  );
}