'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DentalTableComponent() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    doctorName: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      // Build query params for filters
      const params = new URLSearchParams();
      if (filters.doctorName) params.append('doctorName', filters.doctorName);
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const url = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/consultations${params.toString() ? `?${params}` : ''}`);
      const response = await axios.get(url);
      
      console.log('Full API Response:', response);
      console.log('Response Data:', response.data);
      
      let consultationData = [];
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        consultationData = response.data;
      } 
      else if (response.data && typeof response.data === 'object') {
        if (response.data.data && Array.isArray(response.data.data)) {
          consultationData = response.data.data;
        }
        else if (response.data.consultations && Array.isArray(response.data.consultations)) {
          consultationData = response.data.consultations;
        }
        else if (response.data.results && Array.isArray(response.data.results)) {
          consultationData = response.data.results;
        }
        else {
          consultationData = [response.data];
        }
      }
      
      console.log('Processed Consultations Data:', consultationData);
      setConsultations(consultationData);
      setError('');
      
    } catch (error) {
      console.error('Fetch Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Server se connect nahi ho paya. Please check if backend is running on port 3000');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchConsultations();
  };

  const resetFilters = () => {
    setFilters({
      doctorName: '',
      status: '',
      startDate: '',
      endDate: '',
    });
    setTimeout(() => fetchConsultations(), 100);
  };

  const formatCellValue = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'string' && value.trim() === '') return '-';
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    if (value instanceof Date) return value.toLocaleDateString();
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Scheduled': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'No-show': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl mb-2">Loading Dental Consultations...</div>
          <div className="text-sm text-gray-500">Please wait while we fetch data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-lg">
          <h3 className="font-bold text-lg mb-2">Error!</h3>
          <p>{error}</p>
          <button 
            onClick={fetchConsultations}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dental Consultations <span className="text-blue-600">({consultations.length})</span>
            </h1>
            <p className="text-gray-600 mt-1">Manage and view all dental consultation records</p>
          </div>
          <button
            onClick={fetchConsultations}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={filters.doctorName}
                onChange={handleFilterChange}
                placeholder="Search by doctor"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No-show">No-show</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Data Table */}
        {consultations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🦷</div>
            <div className="text-xl text-gray-500 mb-2">No Consultations Found</div>
            <div className="text-sm text-gray-400">Add some consultations to see them here</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-teal-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Patient Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Age/Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Symptoms</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Doctor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Appointment</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">First Visit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {consultations.map((consultation, index) => (
                    <tr 
                      key={consultation.id || index} 
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {consultation.id || index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{consultation.patientName || '-'}</div>
                        {consultation.email && (
                          <div className="text-xs text-gray-500">{consultation.email}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div>{consultation.age || '-'} yrs</div>
                        <div className="text-xs text-gray-500">{consultation.gender || '-'}</div>
                      </td>
                      <td className="px-4 py-3">
                        {consultation.phoneNumber || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs truncate" title={consultation.symptoms}>
                          {consultation.symptoms || '-'}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{consultation.doctorName || '-'}</div>
                        <div className="text-xs text-gray-500">{consultation.specialization || '-'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div>{consultation.appointmentDate ? new Date(consultation.appointmentDate).toLocaleDateString() : '-'}</div>
                        <div className="text-xs text-gray-500">{consultation.appointmentTime || '-'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(consultation.status)}`}>
                          {consultation.status || 'Scheduled'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={consultation.isFirstVisit ? 'text-green-600' : 'text-gray-500'}>
                          {consultation.isFirstVisit ? '✓ Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>



{/* Data Table */}
{consultations.length === 0 ? (
  <div className="bg-white rounded-lg shadow-lg p-12 text-center">
    <div className="text-6xl mb-4">🦷</div>
    <div className="text-xl text-gray-500 mb-2">No Consultations Found</div>
    <div className="text-sm text-gray-400">Add some consultations to see them here</div>
  </div>
) : (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-600 to-teal-600">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Patient Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Age/Gender</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Phone</th>
           
            <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Address</th>
            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {consultations.map((consultation, index) => (
            <tr 
              key={consultation.id || index} 
              className="hover:bg-blue-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {consultation.id || index + 1}
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{consultation.patientName || '-'}</div>
                {consultation.email && (
                  <div className="text-xs text-gray-500">{consultation.email}</div>
                )}
              </td>
              <td className="px-4 py-3">
                <div>{consultation.age || '-'} yrs</div>
                <div className="text-xs text-gray-500">{consultation.gender || '-'}</div>
              </td>
              <td className="px-4 py-3">
                {consultation.phoneNumber || '-'}
              </td>
              <td className="px-4 py-3">
                <div className="max-w-xs truncate" title={consultation.address || '-'}>
                          {consultation.address || '-'}
                        
              
                </div>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
       

            
            {/* Table Footer with Stats */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex gap-4">
                  <span>Total: {consultations.length} records</span>
                  <span>Scheduled: {consultations.filter(c => c.status === 'Scheduled').length}</span>
                  <span>Completed: {consultations.filter(c => c.status === 'Completed').length}</span>
                  <span>First Visit: {consultations.filter(c => c.isFirstVisit).length}</span>
                </div>
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



