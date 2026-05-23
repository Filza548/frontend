'use client';
// page.jsx - Complete Form
import { useState } from 'react';
import axios from 'axios';

export default function DoctorBookingComponent() {
  const [patientName, setPatientName] = useState('');        // ✅ name change kiya
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');       // ✅ phoneNumber
  const [email, setEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');             // ✅ symptoms (spelling sahi)
  const [isFirstVisit, setIsFirstVisit] = useState('');     // ✅ isFirstVisit
  const [doctorName, setDoctorName] = useState('');         // ✅ doctorName
  const [specialization, setSpecialization] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!patientName || !age || !gender || !phoneNumber || !email || !symptoms || !isFirstVisit || !doctorName || !specialization || !appointmentDate || !appointmentTime) {
      alert("Please fill all fields!");
      return;
    }
    
    // ✅ FIELDS BACKEND SE MATCH KARO
    const formData = {
      patientName: patientName,           // ✅ exact match
      age: age,                           // ✅ exact match
      gender: gender,                      // ✅ exact match
      phoneNumber: phoneNumber,            // ✅ exact match
      email: email,                         // ✅ exact match
      symptoms: symptoms,                   // ✅ exact match
      isFirstVisit: isFirstVisit,           // ✅ exact match
      doctorName: doctorName,               // ✅ exact match
      specialization: specialization,       // ✅ exact match
      appointmentDate: appointmentDate,     // ✅ exact match
      appointmentTime: appointmentTime      // ✅ exact match
    };
    
    console.log("Submitting:", formData);
    
    try {
      // ✅ URL check karo - yeh sahi hai?
      const response = await axios.post(`${process.env.BACKEND_URL}/doctor-consultation`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log("Success:", response.data);
      alert("✅ Appointment booked successfully!");

      // Clear fields
      setPatientName('');
      setAge('');
      setGender('');
      setPhoneNumber('');
      setEmail('');
      setSymptoms('');
      setIsFirstVisit('');
      setDoctorName('');
      setSpecialization('');
      setAppointmentDate('');
      setAppointmentTime('');

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("❌ Error booking appointment!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Doctor Consultation</span>
          </h2>
          <p className="text-gray-600 text-lg">Schedule your appointment in just a few clicks</p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">👤</span>
                </span>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter patient's full name"
              />
            </div>

            {/* Age Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📅</span>
                </span>
                Age <span className="text-red-500">*</span>
              </label>
              <input 
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="1"
                max="120"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter age"
              />
            </div>

            {/* Gender Field - Better as Select */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">⚥</span>
                </span>
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-gray-700"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">📞</span>
                </span>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="03XX-XXXXXXX"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm">✉️</span>
                </span>
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="email@example.com"
              />
            </div>

            {/* Symptoms Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-sm">🏥</span>
                </span>
                Symptoms <span className="text-red-500">*</span>
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="Describe your symptoms..."
              />
            </div>

            {/* First Visit Field - Better as Radio */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-sm">🔄</span>
                </span>
                First Visit? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="true"
                    checked={isFirstVisit === "true"}
                    onChange={(e) => setIsFirstVisit(e.target.value)}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span>Yes, first time</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="false"
                    checked={isFirstVisit === "false"}
                    onChange={(e) => setIsFirstVisit(e.target.value)}
                    className="w-4 h-4 text-pink-600"
                  />
                  <span>No, follow-up</span>
                </label>
              </div>
            </div>

            {/* Doctor Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 text-sm">👨‍⚕️</span>
                </span>
                Doctor Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter doctor's name"
              />
            </div>

            {/* Specialization Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 text-sm">🔬</span>
                </span>
                Specialization <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all outline-none text-gray-700 placeholder-gray-400"
                placeholder="e.g., Cardiologist, Dermatologist"
              />
            </div>    

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-sm">📅</span>
                  </span>
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all outline-none text-gray-700"
                />
              </div>

              {/* Time Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 text-sm">⏰</span>
                  </span>
                  Appointment Time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-8"
            >
              <span>📝</span>
              Book Appointment
              <span className="text-xl">→</span>
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </div>
    </div>
  );
}