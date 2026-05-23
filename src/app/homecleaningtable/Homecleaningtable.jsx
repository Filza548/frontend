'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/home-cleaning`) 
const statusConfig = {
  pending:     { bg: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-400',   label: 'Pending' },
  confirmed:   { bg: 'bg-sky-50 text-sky-700 border-sky-200',         dot: 'bg-sky-500',     label: 'Confirmed' },
  in_progress: { bg: 'bg-blue-50 text-blue-700 border-blue-200',      dot: 'bg-blue-500',    label: 'In Progress' },
  completed:   { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'Completed' },
  cancelled:   { bg: 'bg-red-50 text-red-700 border-red-200',         dot: 'bg-red-400',     label: 'Cancelled' },
};

const serviceConfig = {
  deep_cleaning:       { icon: '🧼', label: 'Deep Cleaning' },
  regular_maintenance: { icon: '🔄', label: 'Regular Maintenance' },
  eco_friendly:        { icon: '🌱', label: 'Eco-friendly' },
  insured:             { icon: '🛡️', label: 'Insured Premium' },
};

export default function HomeCleaningTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    serviceType: '',
    startDate: '',
    endDate: '',
    search: '',
  });

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status)    params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate)   params.append('endDate', filters.endDate);
      const url = `${API_URL}${params.toString() ? `?${params}` : ''}`;
      const response = await axios.get(url);

      let data = [];
      if (Array.isArray(response.data))       data = response.data;
      else if (response.data?.data)           data = response.data.data;
      else if (response.data?.bookings)       data = response.data.bookings;

      // client-side search filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(b =>
          b.customerName?.toLowerCase().includes(q) ||
          b.phone?.toLowerCase().includes(q) ||
          b.address?.toLowerCase().includes(q)
        );
      }
      if (filters.serviceType) {
        data = data.filter(b => b.serviceType === filters.serviceType);
      }

      setBookings(data);
      setError('');
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Unable to connect to server. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => fetchBookings();

  const resetFilters = () => {
    setFilters({ status: '', serviceType: '', startDate: '', endDate: '', search: '' });
    setTimeout(() => fetchBookings(), 100);
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const stats = [
    { label: 'Total Bookings',  value: bookings.length,                                          icon: '🏠', bg: 'bg-green-50',   text: 'text-green-700',  border: 'border-green-100' },
    { label: 'Pending',         value: bookings.filter(b => b.status === 'pending').length,       icon: '⏳', bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-100' },
    { label: 'Completed',       value: bookings.filter(b => b.status === 'completed').length,     icon: '✅', bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-100' },
    { label: 'Total Revenue',   value: `$${totalRevenue.toLocaleString()}`,                       icon: '💵', bg: 'bg-green-50',   text: 'text-green-800',  border: 'border-green-100' },
  ];

  if (loading) {
    return (
      <div style={styles.centered}>
        <div style={styles.spinnerWrap}>
          <div style={styles.spinner}></div>
          <p style={{ color: '#15803d', fontFamily: 'DM Sans, sans-serif', marginTop: 16 }}>Loading bookings...</p>
        </div>
        <style>{spinnerKeyframes}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centered}>
        <div style={styles.errorCard}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
          <h3 style={{ color: '#1f2937', fontFamily: 'DM Serif Display, serif', marginBottom: 8 }}>Connection Error</h3>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>{error}</p>
          <button onClick={fetchBookings} style={styles.retryBtn}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        ${spinnerKeyframes}
        ${fadeIn}

        * { box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f0fdf4;
          margin: 0;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(160deg, #f0fdf4 0%, #ffffff 60%, #dcfce7 100%);
          padding: 36px 16px 60px;
        }

        .inner { max-width: 1400px; margin: 0 auto; animation: fadeIn 0.5s ease both; }

        /* ── Header ── */
        .header { margin-bottom: 28px; }

        .header-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 6px;
        }

        .header-icon {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }

        .header-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: #14532d;
          margin: 0;
          line-height: 1.1;
        }

        .header-title span { color: #16a34a; font-style: italic; }

        .header-sub { color: #6b7280; font-size: 14px; font-weight: 300; margin-left: 62px; }

        /* ── Stats ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .stats-grid { grid-template-columns: 1fr; } }

        .stat-card {
          background: white;
          border-radius: 18px;
          border: 1.5px solid #dcfce7;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 2px 10px rgba(22,163,74,0.06);
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .stat-card:hover { box-shadow: 0 6px 20px rgba(22,163,74,0.12); transform: translateY(-2px); }

        .stat-icon {
          width: 46px; height: 46px;
          background: #f0fdf4;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #14532d;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label { font-size: 12px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }

        /* ── Filter Card ── */
        .filter-card {
          background: white;
          border-radius: 20px;
          border: 1.5px solid #dcfce7;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 10px rgba(22,163,74,0.05);
        }

        .filter-title {
          font-size: 13px;
          font-weight: 600;
          color: #15803d;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .filter-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #dcfce7;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 12px;
          align-items: end;
        }

        @media (max-width: 900px) { .filter-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 500px) { .filter-grid { grid-template-columns: 1fr; } }

        .filter-field { display: flex; flex-direction: column; gap: 5px; }

        .filter-label {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .filter-input {
          font-family: 'DM Sans', sans-serif;
          padding: 9px 14px;
          border: 1.5px solid #dcfce7;
          border-radius: 10px;
          font-size: 13px;
          color: #374151;
          background: white;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .filter-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.08);
        }

        .filter-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 14px;
        }

        .btn-reset {
          font-family: 'DM Sans', sans-serif;
          padding: 9px 18px;
          border: 1.5px solid #dcfce7;
          border-radius: 10px;
          background: white;
          color: #6b7280;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-reset:hover { background: #f9fafb; }

        .btn-apply {
          font-family: 'DM Sans', sans-serif;
          padding: 9px 18px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(22,163,74,0.25);
          transition: opacity 0.15s, transform 0.15s;
        }
        .btn-apply:hover { opacity: 0.9; transform: translateY(-1px); }

        .btn-refresh {
          font-family: 'DM Sans', sans-serif;
          padding: 9px 16px;
          border: 1.5px solid #dcfce7;
          border-radius: 10px;
          background: #f0fdf4;
          color: #15803d;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-refresh:hover { background: #dcfce7; }

        /* ── Table Card ── */
        .table-card {
          background: white;
          border-radius: 20px;
          border: 1.5px solid #dcfce7;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(22,163,74,0.07);
        }

        .table-wrap { overflow-x: auto; }

        table { width: 100%; border-collapse: collapse; }

        thead { background: linear-gradient(to right, #f0fdf4, #dcfce7); }

        th {
          padding: 14px 16px;
          text-align: left;
          font-size: 10.5px;
          font-weight: 700;
          color: #15803d;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        tbody tr {
          border-top: 1px solid #f0fdf4;
          transition: background 0.15s;
        }

        tbody tr:hover { background: #f9fffe; }

        td {
          padding: 14px 16px;
          font-size: 13.5px;
          color: #374151;
          vertical-align: middle;
        }

        /* avatar */
        .avatar {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #15803d;
          flex-shrink: 0;
        }

        /* status badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          border: 1.5px solid;
          white-space: nowrap;
        }

        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* service badge */
        .service-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 8px;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          font-size: 12px;
          font-weight: 500;
          color: #15803d;
          white-space: nowrap;
        }

        /* eco / insured chips */
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 600;
          margin-right: 4px;
          margin-top: 3px;
        }

        .chip-eco   { background: #dcfce7; color: #15803d; }
        .chip-ins   { background: #dbeafe; color: #1d4ed8; }

        /* table footer */
        .table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          background: #f9fffe;
          border-top: 1.5px solid #f0fdf4;
        }

        .footer-count { font-size: 12px; color: #9ca3af; }
        .footer-count span { font-weight: 600; color: #374151; }
        .footer-time  { font-size: 11px; color: #d1d5db; }

        /* empty */
        .empty {
          padding: 80px 24px;
          text-align: center;
        }
        .empty-icon { font-size: 56px; opacity: 0.3; margin-bottom: 12px; }
        .empty-text { color: #9ca3af; font-size: 15px; }
        .empty-sub  { color: #d1d5db; font-size: 13px; margin-top: 4px; }
      `}</style>

      <div className="page">
        <div className="inner">

          {/* Header */}
          <div className="header">
            <div className="header-top">
              <div className="header-icon">🏠</div>
              <h1 className="header-title">Home <span>Cleaning</span> Bookings</h1>
            </div>
            <p className="header-sub">Manage cleaning appointments, track services and customer details</p>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{s.icon}</div>
                <div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="filter-card">
            <div className="filter-title">Filters</div>
            <div className="filter-grid">
              <div className="filter-field">
                <label className="filter-label">Search</label>
                <input
                  className="filter-input"
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Name, phone, address..."
                />
              </div>
              <div className="filter-field">
                <label className="filter-label">Status</label>
                <select className="filter-input" name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="filter-field">
                <label className="filter-label">Service Type</label>
                <select className="filter-input" name="serviceType" value={filters.serviceType} onChange={handleFilterChange}>
                  <option value="">All Services</option>
                  <option value="deep_cleaning">Deep Cleaning</option>
                  <option value="regular_maintenance">Regular Maintenance</option>
                  <option value="eco_friendly">Eco-friendly</option>
                  <option value="insured">Insured Premium</option>
                </select>
              </div>
              <div className="filter-field">
                <label className="filter-label">From Date</label>
                <input className="filter-input" type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
              </div>
              <div className="filter-field">
                <label className="filter-label">To Date</label>
                <input className="filter-input" type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
              </div>
            </div>
            <div className="filter-actions">
              <button className="btn-reset"   onClick={resetFilters}>Reset</button>
              <button className="btn-apply"   onClick={applyFilters}>Apply Filters</button>
              <button className="btn-refresh" onClick={fetchBookings}>⟳ Refresh</button>
            </div>
          </div>

          {/* Table */}
          {bookings.length === 0 ? (
            <div className="table-card">
              <div className="empty">
                <div className="empty-icon">🧹</div>
                <p className="empty-text">No bookings found</p>
                <p className="empty-sub">Create a new cleaning booking to see it here</p>
              </div>
            </div>
          ) : (
            <div className="table-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Contact</th>
                      <th>Service</th>
                      <th>Scheduled</th>
                      <th>Duration</th>
                      <th>Amount</th>
                      <th>Features</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, idx) => {
                      const svc    = serviceConfig[b.serviceType] || { icon: '🧹', label: b.serviceType };
                      const status = statusConfig[b.status]       || { bg: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400', label: b.status };
                      return (
                        <tr key={b.id || idx}>

                          {/* # */}
                          <td>
                            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#9ca3af' }}>
                              #{String(b.id || idx + 1).slice(-4)}
                            </span>
                          </td>

                          {/* Customer */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div className="avatar">
                                {(b.customerName || '?')[0].toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, color: '#1f2937', fontSize: 13 }}>{b.customerName || '-'}</div>
                                {b.email && <div style={{ fontSize: 11, color: '#9ca3af' }}>{b.email}</div>}
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td>
                            <div style={{ fontSize: 13, color: '#4b5563' }}>{b.phone || '-'}</div>
                            {b.address && (
                              <div style={{ fontSize: 11, color: '#9ca3af', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                   title={b.address}>
                                📍 {b.address}
                              </div>
                            )}
                          </td>

                          {/* Service */}
                          <td>
                            <span className="service-badge">
                              {svc.icon} {svc.label}
                            </span>
                          </td>

                          {/* Scheduled */}
                          <td>
                            <div style={{ fontWeight: 500, color: '#1f2937', fontSize: 13 }}>
                              {b.scheduledDate
                                ? new Date(b.scheduledDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                                : '-'}
                            </div>
                            {b.scheduledTime && (
                              <div style={{ fontSize: 11, color: '#9ca3af' }}>⏰ {b.scheduledTime.slice(0, 5)}</div>
                            )}
                          </td>

                          {/* Duration */}
                          <td>
                            {b.estimatedHours ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 8, padding: '3px 10px', fontSize: 12, color: '#15803d', fontWeight: 500 }}>
                                ⏱️ {b.estimatedHours}h
                              </span>
                            ) : <span style={{ color: '#d1d5db' }}>—</span>}
                          </td>

                          {/* Amount */}
                          <td>
                            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 15, color: '#14532d' }}>
                              {b.totalAmount ? `$${Number(b.totalAmount).toLocaleString()}` : '—'}
                            </span>
                          </td>

                          {/* Features */}
                          <td>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                              {b.ecoFriendlyProducts && <span className="chip chip-eco">🌱 Eco</span>}
                              {b.isInsured           && <span className="chip chip-ins">🛡️ Insured</span>}
                              {!b.ecoFriendlyProducts && !b.isInsured && <span style={{ color: '#d1d5db', fontSize: 12 }}>—</span>}
                            </div>
                          </td>

                          {/* Status */}
                          <td>
                            <span
                              className="status-badge"
                              style={{
                                background: status.bg.includes('amber') ? '#fffbeb' :
                                            status.bg.includes('sky')   ? '#f0f9ff' :
                                            status.bg.includes('blue')  ? '#eff6ff' :
                                            status.bg.includes('emerald') ? '#ecfdf5' :
                                            status.bg.includes('red')   ? '#fef2f2' : '#f9fafb',
                                color:      status.bg.includes('amber') ? '#b45309' :
                                            status.bg.includes('sky')   ? '#0369a1' :
                                            status.bg.includes('blue')  ? '#1d4ed8' :
                                            status.bg.includes('emerald') ? '#065f46' :
                                            status.bg.includes('red')   ? '#b91c1c' : '#4b5563',
                                borderColor: status.bg.includes('amber') ? '#fde68a' :
                                             status.bg.includes('sky')   ? '#bae6fd' :
                                             status.bg.includes('blue')  ? '#bfdbfe' :
                                             status.bg.includes('emerald') ? '#a7f3d0' :
                                             status.bg.includes('red')   ? '#fecaca' : '#e5e7eb',
                              }}
                            >
                              <span
                                className="status-dot"
                                style={{
                                  background: status.bg.includes('amber') ? '#f59e0b' :
                                              status.bg.includes('sky')   ? '#0ea5e9' :
                                              status.bg.includes('blue')  ? '#3b82f6' :
                                              status.bg.includes('emerald') ? '#10b981' :
                                              status.bg.includes('red')   ? '#ef4444' : '#9ca3af',
                                }}
                              ></span>
                              {status.label}
                            </span>
                          </td>

                          {/* Notes */}
                          <td style={{ maxWidth: 180 }}>
                            <p style={{ fontSize: 12, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}
                               title={b.notes}>
                              {b.notes || '—'}
                            </p>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="table-footer">
                <div className="footer-count">
                  Showing <span>{bookings.length}</span> booking{bookings.length !== 1 ? 's' : ''}
                </div>
                <div className="footer-time">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

const spinnerKeyframes = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;
const fadeIn = '';

const styles = {
  centered: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0fdf4',
  },
  spinnerWrap: { textAlign: 'center' },
  spinner: {
    width: 52, height: 52,
    border: '4px solid #dcfce7',
    borderTopColor: '#16a34a',
    borderRadius: '50%',
    margin: '0 auto',
    animation: 'spin 0.8s linear infinite',
  },
  errorCard: {
    background: 'white',
    borderRadius: 20,
    padding: '40px 32px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    maxWidth: 380,
  },
  retryBtn: {
    fontFamily: 'DM Sans, sans-serif',
    background: 'linear-gradient(135deg, #16a34a, #15803d)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
  },
};