'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/yoga-meditation`);

const statusConfig = {
  pending:   { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  confirmed: { bg: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  completed: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  cancelled: { bg: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
};

const serviceLabels = {
  beginner:            { label: 'Beginner Yoga', icon: '🌱' },
  stress_relief:       { label: 'Stress Relief',  icon: '🧘' },
  flexibility:         { label: 'Flexibility',     icon: '🤸' },
  breathing_exercises: { label: 'Breathing',       icon: '🌬️' },
};

export default function YogaMeditationTableComponent() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    instructorName: '',
    status: '',
    serviceType: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val) params.append(key, val);
      });
      const url = `${API_URL}${params.toString() ? `?${params}` : ''}`;
      const response = await axios.get(url);

      let data = [];
      if (Array.isArray(response.data)) data = response.data;
      else if (response.data?.data) data = response.data.data;
      else if (response.data?.sessions) data = response.data.sessions;

      setSessions(data);
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

  const applyFilters = () => fetchSessions();

  const resetFilters = () => {
    setFilters({ instructorName: '', status: '', serviceType: '', startDate: '', endDate: '' });
    setTimeout(() => fetchSessions(), 100);
  };

  const stats = [
    {
      label: 'Total Sessions',
      value: sessions.length,
      icon: '📋',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Pending',
      value: sessions.filter((s) => s.status === 'pending').length,
      icon: '⏳',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Completed',
      value: sessions.filter((s) => s.status === 'completed').length,
      icon: '✅',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Total Revenue',
      value: `$${sessions.reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0).toLocaleString()}`,
      icon: '💰',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
    },
  ];

  const inputClass =
    'w-full px-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm bg-white';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading sessions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center border border-yellow-100">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={fetchSessions}
            className="bg-gradient-to-r from-yellow-400 to-amber-400 text-white px-6 py-2.5 rounded-xl hover:from-yellow-500 hover:to-amber-500 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🧘</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Yoga &amp; Meditation</h1>
          </div>
          <p className="text-gray-400 mt-1 ml-1">
            Manage sessions, track instructors, and monitor client progress
          </p>
          <div className="flex gap-3 mt-3 flex-wrap">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">⏱️ 60 min sessions</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">💰 $25 – $80</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">🌿 Beginner Friendly</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 ${stat.lightColor} rounded-xl flex items-center justify-center`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className={`text-sm font-medium ${stat.textColor}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gray-700 font-semibold">Filters</span>
            <div className="flex-1 h-px bg-yellow-100"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Instructor Name</label>
              <input
                type="text"
                name="instructorName"
                value={filters.instructorName}
                onChange={handleFilterChange}
                placeholder="Search instructor..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange} className={inputClass}>
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Service Type</label>
              <select name="serviceType" value={filters.serviceType} onChange={handleFilterChange} className={inputClass}>
                <option value="">All Services</option>
                <option value="beginner">🌱 Beginner Yoga</option>
                <option value="stress_relief">🧘 Stress Relief</option>
                <option value="flexibility">🤸 Flexibility</option>
                <option value="breathing_exercises">🌬️ Breathing Exercises</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">From Date</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">To Date</label>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className={inputClass} />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button onClick={resetFilters} className="px-4 py-2 text-sm text-gray-600 border border-yellow-200 rounded-lg hover:bg-yellow-50 transition">
              Reset
            </button>
            <button onClick={applyFilters} className="px-4 py-2 text-sm bg-gradient-to-r from-yellow-400 to-amber-400 text-white rounded-lg hover:from-yellow-500 hover:to-amber-500 transition shadow-sm">
              Apply Filters
            </button>
            <button onClick={fetchSessions} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-16 text-center">
            <div className="text-6xl mb-4 opacity-40">🧘</div>
            <p className="text-gray-500 text-lg">No sessions found</p>
            <p className="text-gray-400 text-sm mt-1">Book a new session to see it here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-50 border-b border-yellow-100">
                  <tr>
                    {['#', 'Client', 'Contact', 'Service', 'Instructor', 'Session', 'Duration', 'Amount', 'Trial', 'Status', 'Notes'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-yellow-700 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-50">
                  {sessions.map((s, index) => (
                    <tr key={s.id || index} className="hover:bg-yellow-50/50 transition-colors">

                      {/* ID */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-400">
                          #{String(s.id || index + 1).slice(-4)}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-yellow-600 text-sm font-medium">
                              {(s.customerName || '?')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{s.customerName || '-'}</div>
                            {s.email && <div className="text-xs text-gray-400">{s.email}</div>}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600">{s.phone || '-'}</div>
                      </td>

                      {/* Service */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{serviceLabels[s.serviceType]?.icon || '🧘'}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {serviceLabels[s.serviceType]?.label || s.serviceType || '-'}
                          </span>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-700">{s.instructorName || '-'}</div>
                      </td>

                      {/* Date & Time */}
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700">
                          {s.sessionDate
                            ? new Date(s.sessionDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })
                            : '-'}
                        </div>
                        <div className="text-xs text-gray-400">{s.sessionTime?.slice(0, 5) || '-'}</div>
                      </td>

                      {/* Duration */}
                      <td className="px-4 py-3">
                        {s.durationMinutes ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 text-xs border border-yellow-200">
                            ⏱️ {s.durationMinutes} min
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-800 text-sm">
                          {s.totalAmount ? `$${Number(s.totalAmount).toFixed(2)}` : '—'}
                        </span>
                      </td>

                      {/* Trial Completed */}
                      <td className="px-4 py-3">
                        {s.trialCompleted ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs border border-emerald-200">✓ Done</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-gray-400 text-xs border border-gray-200">— No</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {s.status ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[s.status]?.bg || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[s.status]?.dot || 'bg-gray-400'}`}></span>
                            {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                          </span>
                        ) : '-'}
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-3 max-w-[180px]">
                        <p className="text-xs text-gray-400 truncate" title={s.notes}>
                          {s.notes || '—'}
                        </p>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-100 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Showing <span className="font-medium text-gray-700">{sessions.length}</span> sessions
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