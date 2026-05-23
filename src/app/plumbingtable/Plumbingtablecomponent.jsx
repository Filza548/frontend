'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/plumbing-services`);

const statusConfig = {
  pending:     { bg: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-400',   label: 'Pending' },
  confirmed:   { bg: 'bg-sky-50 text-sky-700 border-sky-200',         dot: 'bg-sky-500',     label: 'Confirmed' },
  in_progress: { bg: 'bg-orange-50 text-orange-700 border-orange-200',dot: 'bg-orange-500',  label: 'In Progress' },
  completed:   { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'Completed' },
  cancelled:   { bg: 'bg-red-50 text-red-700 border-red-200',         dot: 'bg-red-400',     label: 'Cancelled' },
};

const serviceConfig = {
  emergency:    { icon: '🚨', label: 'Emergency',    color: 'text-red-600 bg-red-50' },
  leak_repair:  { icon: '💧', label: 'Leak Repair',  color: 'text-blue-600 bg-blue-50' },
  installation: { icon: '🛠️', label: 'Installation', color: 'text-violet-600 bg-violet-50' },
  maintenance:  { icon: '🔍', label: 'Maintenance',  color: 'text-teal-600 bg-teal-50' },
};

export default function PlumbingTableComponent() {
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [filters, setFilters]     = useState({
    search:      '',
    status:      '',
    serviceType: '',
    fromDate:    '',
    toDate:      '',
  });

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => { if (val) params.append(key, val); });
      const url = `${API_URL}${params.toString() ? `?${params}` : ''}`;
      const response = await axios.get(url);

      let data = [];
      if (Array.isArray(response.data))           data = response.data;
      else if (response.data?.data)               data = response.data.data;
      else if (response.data?.bookings)           data = response.data.bookings;

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
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', status: '', serviceType: '', fromDate: '', toDate: '' });
    setTimeout(() => fetchBookings(), 100);
  };

  const totalRevenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const stats = [
    { label: 'Total Bookings',  value: bookings.length,                                             icon: '📋', light: 'bg-orange-50', text: 'text-orange-600' },
    { label: 'Pending',         value: bookings.filter((b) => b.status === 'pending').length,        icon: '⏳', light: 'bg-amber-50',  text: 'text-amber-600' },
    { label: 'In Progress',     value: bookings.filter((b) => b.status === 'in_progress').length,    icon: '🔧', light: 'bg-blue-50',   text: 'text-blue-600' },
    { label: 'Completed',       value: bookings.filter((b) => b.status === 'completed').length,      icon: '✅', light: 'bg-emerald-50',text: 'text-emerald-600' },
    { label: 'Total Revenue',   value: `$${totalRevenue.toLocaleString()}`,                          icon: '💰', light: 'bg-violet-50', text: 'text-violet-600' },
  ];

  /* ─── Loading ─────────────────────────────────────────── */
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Loading bookings...</p>
      </div>
    </div>
  );

  /* ─── Error ───────────────────────────────────────────── */
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button onClick={fetchBookings} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl hover:bg-orange-600 transition font-medium">
          Try Again
        </button>
      </div>
    </div>
  );

  /* ─── Main ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xl">🔧</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Plumbing Services</h1>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Manage service bookings, track status, and monitor revenue
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${s.light} rounded-xl flex items-center justify-center`}>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <span className="text-xl font-bold text-gray-800">{s.value}</span>
              </div>
              <p className={`text-xs font-semibold ${s.text} uppercase tracking-wide`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700 font-semibold text-sm">Filters</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Search Customer</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Name..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Service Type</label>
              <select
                name="serviceType"
                value={filters.serviceType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50"
              >
                <option value="">All Services</option>
                <option value="emergency">Emergency</option>
                <option value="leak_repair">Leak Repair</option>
                <option value="installation">Installation</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">To Date</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={resetFilters} className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              Reset
            </button>
            <button onClick={fetchBookings} className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-sm font-medium">
              Apply Filters
            </button>
            <button onClick={fetchBookings} className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="text-6xl mb-4 opacity-40">🔧</div>
            <p className="text-gray-500 text-lg font-medium">No bookings found</p>
            <p className="text-gray-400 text-sm mt-1">Create a new plumbing service booking to see it here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['#', 'Customer', 'Contact', 'Service Type', 'Address', 'Schedule', 'Duration', 'Est. Amount', 'Total Billed', 'Inspection', 'Status', 'Notes'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((b, index) => {
                    const svc    = serviceConfig[b.serviceType] || { icon: '🔧', label: b.serviceType, color: 'text-gray-600 bg-gray-50' };
                    const status = statusConfig[b.status]       || { bg: 'bg-gray-50 text-gray-500 border-gray-200', dot: 'bg-gray-300', label: b.status };

                    return (
                      <tr key={b.id || index} className="hover:bg-orange-50/30 transition-colors">

                        {/* ID */}
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono text-gray-300">
                            #{String(b.id || index + 1).slice(-4)}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-orange-600 text-sm font-semibold">
                                {(b.customerName || '?')[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 text-sm whitespace-nowrap">{b.customerName || '—'}</div>
                              {b.email && <div className="text-xs text-gray-400">{b.email}</div>}
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600 whitespace-nowrap">{b.phone || '—'}</div>
                        </td>

                        {/* Service Type */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${svc.color}`}>
                            <span>{svc.icon}</span>
                            {svc.label}
                          </span>
                        </td>

                        {/* Address */}
                        <td className="px-4 py-3 max-w-[160px]">
                          <p className="text-xs text-gray-500 truncate" title={b.serviceAddress}>
                            {b.serviceAddress || '—'}
                          </p>
                        </td>

                        {/* Schedule */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {b.scheduledDate
                              ? new Date(b.scheduledDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
                              : '—'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {b.scheduledTime ? b.scheduledTime.slice(0, 5) : '—'}
                          </div>
                        </td>

                        {/* Duration */}
                        <td className="px-4 py-3">
                          {b.estimatedDurationHours ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs whitespace-nowrap">
                              ⏱️ {b.estimatedDurationHours} hr{b.estimatedDurationHours > 1 ? 's' : ''}
                            </span>
                          ) : <span className="text-gray-300 text-sm">—</span>}
                        </td>

                        {/* Estimated Amount */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {b.estimatedAmount ? `$${Number(b.estimatedAmount).toLocaleString()}` : '—'}
                          </span>
                        </td>

                        {/* Total Billed */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-semibold text-gray-800 text-sm">
                            {b.totalAmount ? `$${Number(b.totalAmount).toLocaleString()}` : '—'}
                          </span>
                        </td>

                        {/* Inspection */}
                        <td className="px-4 py-3">
                          {b.inspectionCompleted ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-medium">
                              ✓ Done
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 text-gray-400 text-xs">
                              — Pending
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`}></span>
                            {status.label}
                          </span>
                        </td>

                        {/* Notes */}
                        <td className="px-4 py-3 max-w-[180px]">
                          <p className="text-xs text-gray-400 truncate" title={b.notes}>
                            {b.notes || '—'}
                          </p>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-600">{bookings.length}</span> booking{bookings.length !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}