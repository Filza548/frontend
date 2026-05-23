'use client';

import { useState, useEffect } from 'react';


const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/makeup-bridal`;

const statusConfig = {
  pending:   { pill: 'bg-amber-50 text-amber-600 border border-amber-200', dot: 'bg-amber-400' },
  confirmed: { pill: 'bg-sky-50 text-sky-600 border border-sky-200', dot: 'bg-sky-400' },
  completed: { pill: 'bg-green-50 text-green-600 border border-green-200', dot: 'bg-green-400' },
  cancelled: { pill: 'bg-red-50 text-red-500 border border-red-200', dot: 'bg-red-400' },
};

const serviceConfig = {
  bridal: { label: '👰 Bridal', style: 'bg-pink-50 text-pink-600 border border-pink-200' },
  party:  { label: '🎉 Party', style: 'bg-purple-50 text-purple-600 border border-purple-200' },
  hair:   { label: '💇 Hair', style: 'bg-amber-50 text-amber-600 border border-amber-200' },
  trial:  { label: '🪞 Trial', style: 'bg-teal-50 text-teal-600 border border-teal-200' },
};

const avatarColors = [
  'bg-pink-100 text-pink-600',
  'bg-purple-100 text-purple-600',
  'bg-amber-100 text-amber-600',
  'bg-teal-100 text-teal-600',
  'bg-sky-100 text-sky-600',
  'bg-rose-100 text-rose-600',
];

// ===================== DELETE MODAL =====================
function DeleteModal({ booking, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full p-6">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
         <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 text-center mb-1"
          style={{ fontFamily: 'Georgia, serif' }}>
          Delete Booking?
        </h3>
        <p className="text-gray-400 text-sm text-center mb-5">
          Kya aap <span className="font-semibold text-gray-700">{booking?.customerName}</span> ki booking delete karna chahte hain? Yeh undo nahi hoga.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 text-xs text-gray-500 space-y-1.5">
          <div className="flex justify-between">
            <span>Service</span>
            <span className="font-medium text-gray-700">{serviceConfig[booking?.serviceType]?.label || booking?.serviceType}</span>
          </div>
          <div className="flex justify-between">
            <span>Event Date</span>
            <span className="font-medium text-gray-700">
              {booking?.eventDate ? new Date(booking.eventDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="font-medium text-gray-700">
              {booking?.totalAmount ? `PKR ${Number(booking.totalAmount).toLocaleString()}` : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>ID</span>
            <span className="font-mono text-gray-400 text-xs truncate max-w-[160px]">{booking?.id}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-black rounded-xl text-sm font-semibold transition shadow-sm disabled:opacity-60">
            {loading ? '⏳ Deleting...' : '🗑 Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================== TOAST =====================
function Toast({ message, type }) {
  if (!message) return null;
  const isSuccess = type === 'success';
  return (
    <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-medium transition-all
      ${isSuccess
        ? 'bg-white border-green-200 text-green-700'
        : 'bg-white border-red-200 text-red-600'
      }`}>
      <span>{isSuccess ? '✅' : '❌'}</span>
      <span>{message}</span>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================
export default function BridalComponent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    serviceType: '', status: '', phone: '', startDate: '', endDate: '',
  });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => { fetchBookings(); }, []);

  // ---- FETCH ----
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => { if (val) params.append(key, val); });
      const url = `${API_URL}${params.toString() ? `?${params}` : ''}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) setBookings(data);
      else if (data?.data) setBookings(data.data);
      else setBookings([]);

      setError('');
    } catch (err) {
      setError('Backend se connect nahi ho paya. Check karo NestJS port 3001 pe chal raha hai.');
    } finally {
      setLoading(false);
    }
  };

  // ---- DELETE ----
  const handleDeleteClick = (booking) => {
    setDeleteTarget(booking);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget?.id) {
      showToast('Booking ID nahi mila!', 'error');
      return;
    }

    setDeleteLoading(true);
    const deleteUrl = `${API_URL}/${deleteTarget.id}`;

    try {
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || `HTTP ${res.status}`);
      }

      // ✅ Table se remove karo
      setBookings((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      showToast(`${deleteTarget.customerName} ki booking delete ho gayi!`, 'success');
      setDeleteTarget(null);

    } catch (err) {
      showToast(`Delete nahi hua: ${err.message}`, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => setDeleteTarget(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ serviceType: '', status: '', phone: '', startDate: '', endDate: '' });
    setTimeout(() => fetchBookings(), 100);
  };

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📋', bg: 'bg-white', border: 'border-gray-200', accent: 'text-gray-800' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: '⏳', bg: 'bg-amber-50', border: 'border-amber-100', accent: 'text-amber-600' },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: '✅', bg: 'bg-sky-50', border: 'border-sky-100', accent: 'text-sky-600' },
    {
      label: 'Total Revenue',
      value: `PKR ${bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (Number(b.totalAmount) || 0), 0).toLocaleString()}`,
      icon: '💰', bg: 'bg-pink-50', border: 'border-pink-100', accent: 'text-pink-600',
    },
  ];

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-gray-400';

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full border-4 border-pink-100"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-pink-400 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xl">💄</div>
        </div>
        <p className="text-pink-400 text-xs uppercase tracking-widest font-medium">Loading bookings...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-red-100 rounded-2xl shadow-sm p-8 max-w-md text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-400 text-sm mb-5">{error}</p>
        <button onClick={fetchBookings}
          className="bg-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-pink-600 transition">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          booking={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleteLoading}
        />
      )}

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} />

      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div>
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span className="ml-2 text-xs text-gray-400 uppercase tracking-widest">Makeup & Bridal Studio</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Bookings <span className="text-2xl font-normal text-pink-400">({bookings.length})</span>
            </h1>
            <p className="text-gray-400 text-sm">Manage all makeup & bridal appointments</p>
          </div>
          <button onClick={fetchBookings}
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm relative overflow-hidden`}>
              <div className="absolute top-4 right-4 text-2xl opacity-30">{s.icon}</div>
              <p className="text-xs uppercase tracking-wider font-medium mb-2 text-gray-400">{s.label}</p>
              <p className={`text-2xl font-bold ${s.accent}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-pink-400"></div>
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Filters</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">Service Type</label>
              <select name="serviceType" value={filters.serviceType} onChange={handleFilterChange} className={inputClass}>
                <option value="">All Services</option>
                <option value="bridal">👰 Bridal</option>
                <option value="party">🎉 Party</option>
                <option value="hair">💇 Hair</option>
                <option value="trial">🪞 Trial</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange} className={inputClass}>
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">Phone</label>
              <input type="text" name="phone" value={filters.phone} onChange={handleFilterChange}
                placeholder="Search phone..." className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">From Date</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-medium">To Date</label>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className={inputClass} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={resetFilters}
              className="px-4 py-2 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 transition font-medium">
              Reset
            </button>
            <button onClick={fetchBookings}
              className="px-5 py-2 text-white rounded-xl text-sm font-medium shadow-sm transition hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}>
              Apply Filters
            </button>
          </div>
        </div>

        {/* Table */}
        {bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-20 text-center">
            <div className="text-6xl mb-4">💄</div>
            <p className="text-gray-400 text-sm">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100"
                    style={{ background: 'linear-gradient(90deg, #fdf2f8, #faf5ff)' }}>
                    {['#', 'Customer', 'Contact', 'Service', 'Event Date', 'Location', 'Trial', 'Amount', 'Status', 'Notes', 'Action'].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((b, i) => (
                    <tr key={b.id || i} className="hover:bg-pink-50/40 transition-colors group">

                      {/* # */}
                      <td className="px-4 py-4">
                        <span className="text-xs font-mono text-gray-300 group-hover:text-pink-400 transition-colors">
                          {String(i + 1).padStart(3, '0')}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                            {(b.customerName || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 whitespace-nowrap">{b.customerName || '-'}</div>
                            {b.email && <div className="text-xs text-gray-400">{b.email}</div>}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-4 text-gray-500 text-xs whitespace-nowrap">{b.phone || '-'}</td>

                      {/* Service */}
                      <td className="px-4 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap ${serviceConfig[b.serviceType]?.style || 'bg-gray-100 text-gray-500'}`}>
                          {serviceConfig[b.serviceType]?.label || b.serviceType || '-'}
                        </span>
                      </td>

                      {/* Event Date */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-700">
                          {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                        {b.eventTime && <div className="text-xs text-gray-400">{b.eventTime?.slice(0, 5)}</div>}
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4 max-w-[140px]">
                        <p className="text-xs text-gray-500 truncate" title={b.location}>{b.location || '—'}</p>
                      </td>

                      {/* Trial */}
                      <td className="px-4 py-4">
                        {b.trialCompleted ? (
                          <span className="text-xs font-medium bg-green-50 text-green-600 border border-green-200 rounded-lg px-2.5 py-1">✓ Done</span>
                        ) : (
                          <span className="text-xs text-gray-300 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">Pending</span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-800">
                          {b.totalAmount ? `PKR ${Number(b.totalAmount).toLocaleString()}` : '—'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusConfig[b.status]?.pill || 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusConfig[b.status]?.dot || 'bg-gray-400'}`}></span>
                          {b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : '-'}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-4 max-w-[140px]">
                        <p className="text-xs text-gray-400 truncate" title={b.notes}>{b.notes || '—'}</p>
                      </td>

                      {/* DELETE BUTTON */}
                      <td className="px-4 py-4">
                      <button
  onClick={() => handleDeleteClick(b)}
  className="group flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 border-2 border-red-200/50 
             bg-gradient-to-r from-red-50/80 to-red-100/80 
             hover:bg-gradient-to-r hover:from-red-400/95 hover:to-red-500/95 
             hover:text-red-50 hover:border-red-300/70 
             hover:shadow-xl hover:shadow-red-500/40 
             transition-all duration-300 ease-out hover:scale-[1.05] active:scale-[0.98]
             backdrop-blur-sm"
>
  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  <span className="group-hover:font-bold transition-all duration-200">Delete</span>
</button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">{bookings.length} total records</span>
              <span className="text-xs text-gray-300">Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

