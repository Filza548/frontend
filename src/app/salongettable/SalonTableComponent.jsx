'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/salon-spa-consultations';

const statusConfig = {
  Scheduled:  { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  Confirmed:  { bg: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  Completed:  { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Cancelled:  { bg: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  'No-show':  { bg: 'bg-gray-50 text-gray-600 border-gray-200', dot: 'bg-gray-400' },
};

const paymentConfig = {
  Pending:  { bg: 'bg-amber-50 text-amber-700', icon: '⏳' },
  Paid:     { bg: 'bg-emerald-50 text-emerald-700', icon: '✓' },
  Refunded: { bg: 'bg-purple-50 text-purple-700', icon: '↩' },
};

const serviceIcons = { 
  Salon: '✂️', 
  Spa: '🧘', 
  Both: '✨' 
};

export default function SalonTableComponent() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    staffName: '', 
    status: '', 
    serviceType: '',
    paymentStatus: '', 
    startDate: '', 
    endDate: '',
  });

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
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
      else if (response.data?.consultations) data = response.data.consultations;
      
      setConsultations(data);
      setError('');
    } catch (error) {
      console.error('Fetch Error:', error);
      setError('Unable to connect to server. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchConsultations();
  };

  const resetFilters = () => {
    setFilters({ 
      staffName: '', 
      status: '', 
      serviceType: '', 
      paymentStatus: '', 
      startDate: '', 
      endDate: '' 
    });
    setTimeout(() => fetchConsultations(), 100);
  };

  const stats = [
    { 
      label: 'Total Bookings', 
      value: consultations.length, 
      icon: '📋', 
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Scheduled', 
      value: consultations.filter(c => c.status === 'Scheduled').length, 
      icon: '🗓️', 
      color: 'from-amber-500 to-amber-600',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    { 
      label: 'Completed', 
      value: consultations.filter(c => c.status === 'Completed').length, 
      icon: '✅', 
      color: 'from-emerald-500 to-emerald-600',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      label: 'Total Revenue', 
      value: `PKR ${consultations.filter(c => c.paymentStatus === 'Paid').reduce((sum, c) => sum + (Number(c.totalAmount) || 0), 0).toLocaleString()}`, 
      icon: '💰', 
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchConsultations} 
            className="bg-pink-500 text-white px-6 py-2.5 rounded-xl hover:bg-pink-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">💅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Salon & Spa
            </h1>
          </div>
          <p className="text-gray-500 mt-1">
            Manage appointments, track services, and view customer details
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
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

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gray-700 font-semibold">Filters</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Staff Name</label>
              <input
                type="text"
                name="staffName"
                value={filters.staffName}
                onChange={handleFilterChange}
                placeholder="Search staff..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm bg-white"
              >
                <option value="">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No-show">No-show</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Service Type</label>
              <select
                name="serviceType"
                value={filters.serviceType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm bg-white"
              >
                <option value="">All Services</option>
                <option value="Salon">Salon</option>
                <option value="Spa">Spa</option>
                <option value="Both">Both</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Payment Status</label>
              <select
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm bg-white"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">From Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">To Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition shadow-sm"
            >
              Apply Filters
            </button>
            <button
              onClick={fetchConsultations}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        {consultations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="text-6xl mb-4 opacity-50">💆‍♀️</div>
            <p className="text-gray-500 text-lg">No appointments found</p>
            <p className="text-gray-400 text-sm mt-1">Create a new booking to see it here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Staff</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Appointment</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {consultations.map((c, index) => (
                    <tr key={c.id || index} className="hover:bg-gray-50 transition-colors">
                      
                      {/* ID */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-400">
                          #{String(c.id || index + 1).slice(-4)}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-pink-600 text-sm font-medium">
                              {(c.customerName || '?')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{c.customerName || '-'}</div>
                            {c.email && <div className="text-xs text-gray-400">{c.email}</div>}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600">{c.phoneNumber || '-'}</div>
                      </td>

                      {/* Service */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm">{serviceIcons[c.serviceType] || '✨'}</span>
                          <span className="text-sm font-medium text-gray-700">{c.serviceType || '-'}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {[c.hairService, c.nailService, c.massageType].filter(Boolean).join(' · ') || '—'}
                        </div>
                      </td>

                      {/* Staff */}
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-700">{c.staffName || '-'}</div>
                        <div className="text-xs text-gray-400">{c.staffSpecialization || ''}</div>
                      </td>

                      {/* Date & Time */}
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700">
                          {c.appointmentDate ? new Date(c.appointmentDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }) : '-'}
                        </div>
                        <div className="text-xs text-gray-400">{c.appointmentTime?.slice(0, 5) || '-'}</div>
                      </td>

                      {/* Duration */}
                      <td className="px-4 py-3">
                        {c.totalDuration ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs">
                            ⏱️ {c.totalDuration} min
                          </span>
                        ) : <span className="text-gray-400 text-sm">—</span>}
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-800 text-sm">
                          {c.totalAmount ? `PKR ${Number(c.totalAmount).toLocaleString()}` : '—'}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${paymentConfig[c.paymentStatus]?.bg || 'bg-gray-100 text-gray-600'}`}>
                          <span>{paymentConfig[c.paymentStatus]?.icon}</span>
                          <span>{c.paymentStatus || '-'}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {c.status ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[c.status]?.bg || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[c.status]?.dot || 'bg-gray-400'}`}></span>
                            {c.status}
                          </span>
                        ) : '-'}
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="text-xs text-gray-400 truncate" title={c.notes}>
                          {c.notes || '—'}
                        </p>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Showing <span className="font-medium text-gray-700">{consultations.length}</span> appointments
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