'use client';
// Dental Consultation Booking Form
import { useState } from 'react';
import axios from 'axios';

export default function DentalFormComponent() {
  const [formData, setFormData] = useState({
    // Patient Info
    patientName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    
    // Medical Info
    symptoms: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    isFirstVisit: true,
    
    // Dental Specific
    chiefComplaint: '',
    dentalHistory: '',
    oralExamination: '',
    
    // Doctor & Appointment
    doctorName: '',
    specialization: '',
    appointmentDate: '',
    appointmentTime: '',
    
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
    
    // Validate required fields
    if (!formData.patientName || !formData.age || !formData.gender || 
        !formData.phoneNumber || !formData.symptoms || !formData.doctorName || 
        !formData.specialization || !formData.appointmentDate || !formData.appointmentTime) {
      alert("Please fill all required fields!");
      setLoading(false);
      return;
    }
    
    // Prepare data for backend
    const submitData = {
      patientName: formData.patientName,
      age: parseInt(formData.age),
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      symptoms: formData.symptoms,
      medicalHistory: formData.medicalHistory,
      allergies: formData.allergies,
      currentMedications: formData.currentMedications,
      isFirstVisit: formData.isFirstVisit,
      chiefComplaint: formData.chiefComplaint,
      dentalHistory: formData.dentalHistory,
      oralExamination: formData.oralExamination,
      doctorName: formData.doctorName,
      specialization: formData.specialization,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      notes: formData.notes,
    };
    
    console.log("Submitting:", submitData);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/consultations`, submitData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Success:", response.data);
      alert("✅ Dental consultation booked successfully!");
      
      // Reset form after success
      setFormData({
        patientName: '',
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        address: '',
        symptoms: '',
        medicalHistory: '',
        allergies: '',
        currentMedications: '',
        isFirstVisit: true,
        chiefComplaint: '',
        dentalHistory: '',
        oralExamination: '',
        doctorName: '',
        specialization: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
      });
      
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("❌ Error booking consultation! " + (error.response?.data?.message || "Please try again"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Dental <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Consultation</span>
          </h2>
          <p className="text-gray-600 text-lg">Book your dental consultation appointment</p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Patient Information Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👤</span> Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Enter patient full name"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="0"
                    max="120"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Enter age"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="example@email.com"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏥</span> Medical Information
              </h3>
              <div className="space-y-4">
                {/* Symptoms */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Symptoms <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Describe your symptoms"
                  />
                </div>

                {/* Medical History */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Medical History</label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Any previous medical conditions?"
                  />
                </div>

                {/* Allergies */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Allergies</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Any allergies to medicines or materials?"
                  />
                </div>

                {/* Current Medications */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Current Medications</label>
                  <textarea
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Any medicines you are currently taking?"
                  />
                </div>

                {/* First Visit Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isFirstVisit"
                    checked={formData.isFirstVisit}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm font-semibold text-gray-700">First Visit to this clinic?</label>
                </div>
              </div>
            </div>

            {/* Dental Specific Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🦷</span> Dental Information
              </h3>
              <div className="space-y-4">
                {/* Chief Complaint */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Chief Complaint</label>
                  <textarea
                    name="chiefComplaint"
                    value={formData.chiefComplaint}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="What is the main dental problem?"
                  />
                </div>

                {/* Dental History */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Dental History</label>
                  <textarea
                    name="dentalHistory"
                    value={formData.dentalHistory}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Previous dental treatments?"
                  />
                </div>

                {/* Oral Examination */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Oral Examination</label>
                  <textarea
                    name="oralExamination"
                    value={formData.oralExamination}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Any specific findings?"
                  />
                </div>
              </div>
            </div>

            {/* Doctor & Appointment Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span> Appointment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Doctor Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Doctor Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Dr. John Doe"
                  />
                </div>

                {/* Specialization */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
                  >
                    <option value="">Select Specialization</option>
                    <option value="General Dentistry">General Dentistry</option>
                    <option value="Orthodontics">Orthodontics (Braces)</option>
                    <option value="Endodontics">Endodontics (Root Canal)</option>
                    <option value="Periodontics">Periodontics (Gum Treatment)</option>
                    <option value="Oral Surgery">Oral Surgery</option>
                    <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                  </select>
                </div>

                {/* Appointment Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                {/* Appointment Time */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Appointment Time <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="Any additional information?"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  <span>🦷</span>
                  Book Dental Consultation
                  <span>→</span>
                </>
              )}
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