'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorCosultationComponent() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fieldNames, setFieldNames] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
       console.log('Fetching Doctor-Consultation data from API...',process.env.BACKEND_URL);
      const response = await axios.get(`${process.env.BACKEND_URL}/doctor-consultation`);
      console.log('Full API Response:', response);
      console.log('Response Data:', response.data);
      
      let doctorData = [];
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        doctorData = response.data;
        console.log('Data is direct array');
      } 
      else if (response.data && typeof response.data === 'object') {
        // Check for common wrapper patterns
        if (response.data.data && Array.isArray(response.data.data)) {
          doctorData = response.data.data;
          console.log('Data wrapped in data property');
        }
        else if (response.data.doctors && Array.isArray(response.data.doctors)) {
          doctorData = response.data.doctors;
          console.log('Data wrapped in doctors property');
        }
        else if (response.data.results && Array.isArray(response.data.results)) {
          doctorData = response.data.results;
          console.log('Data wrapped in results property');
        }
        else {
          // Agar koi array nahi mila to object ko array mein convert karo
          doctorData = [response.data];
          console.log('Single object converted to array');
        }
      }
      
      console.log('Processed Doctors-Consulting Data:', doctorData);
      
      if (doctorData.length > 0) {
        // Get all field names from first record
        const fields = Object.keys(doctorData[0]);
        setFieldNames(fields);
        console.log('Available Fields in Data:', fields);
        console.log('First Record Values:', doctorData[0]);
        
        // Check for specific fields
        console.log('patientName field exists?', fields.includes('patientName'));
        console.log('age field exists?', fields.includes('age'));
        console.log('gender field exists?', fields.includes('gender'));
        console.log('Department field exists?', fields.includes('phoneNumber'));
        console.log('email field exists?', fields.includes('email'));
        console.log('symptoms field exists?', fields.includes('symptoms'));
        console.log('doctorName field exists?', fields.includes('doctorName'));
        console.log('appointmentDate field exists?', fields.includes('appointmentDate'));
        console.log('appointmentTime field exists?', fields.includes('appointmentTime'));
      }
      
      setAppointments(doctorData);
      setError('');
      
    } catch (error) {
      console.error('Fetch Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Server se connect nahi ho paya. Please check if backend is running on port 3001');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format cell values
  const formatCellValue = (value) => {
    if (value === null || value === undefined) {
      return '-';
    }
    
    if (typeof value === 'string' && value.trim() === '') {
      return '-';
    }
    
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  // Helper function to find field value with fallbacks
  const getFieldValue = (doc, possibleNames) => {
    for (const name of possibleNames) {
      if (doc[name] !== undefined && doc[name] !== null && doc[name] !== '') {
        return formatCellValue(doc[name]);
      }
    }
    return '-';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-2">Loading Doctors-Consulting...</div>
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
            onClick={fetchAppointments}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-500 mb-2">No Doctor-Consulting Found</div>
          <div className="text-sm text-gray-400">Add some records to see them here</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Refresh Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Doctor Consulting List <span className="text-blue-600">({appointments.length})</span>
          </h1>
          <button
            onClick={fetchAppointments}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">patientName</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">age</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">gender</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">phoneNumber</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider] ">symptoms</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">isFirstVisit</th>

                   <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">doctorName</th>


                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">specialization</th>


                     <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">appointmentDate</th>


                      <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">appointmentTime</th>

                      

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((doc, index) => (
                  <tr 
                    key={doc.id || index} 
                    className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{doc.id || index + 1}</td>
                    
                    {/* patientName field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['patientName'])}
                    </td>
                    
                    {/* age field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['age',])}
                    </td>
                    
                    {/* gender field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['gender'])}
                    </td>
                    
                    {/* phoneNumber field with fallbacks */}
                    <td className=" py-4">
                      {getFieldValue(doc, ['phoneNumber'])}
                    </td>
                    
                    {/* email field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['email'])}
                    </td>
                    
                    {/* symptoms field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['symptoms'])}
                    </td>

                     {/* isFirstVisit field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['isFirstVisit'])}
                    </td>


                     {/* doctorName field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['doctorName'])}
                    </td>


                     {/* specialization field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['specialization'])}
                    </td>


                     {/* appointmentDate field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['appointmentDate'])}
                    </td>


                     {/* appointmentTime field with fallbacks */}
                    <td className="px-6 py-4">
                      {getFieldValue(doc, ['appointmentTime'])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer with Stats */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Showing {appointments.length} records</span>
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>

       
       
      </div>
    </div>
  );
}