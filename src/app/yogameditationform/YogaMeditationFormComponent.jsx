'use client';
// Yoga & Meditation Session Booking Form
import { useState } from 'react';
import axios from 'axios';

export default function YogaMeditationFormComponent() {
  const [formData, setFormData] = useState({
    // Client Info
    customerName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',

    // Health Info
    healthConditions: '',
    injuries: '',
    fitnessLevel: '',
    goals: '',
    isFirstSession: true,

    // Yoga Specific
    serviceType: '',
    experienceLevel: '',
    preferredStyle: '',

    // Instructor & Session
    instructorName: '',
    sessionDate: '',
    sessionTime: '',
    location: '',
    durationMinutes: '60',
    totalAmount: '',

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

    if (
      !formData.customerName || !formData.phone || !formData.gender ||
      !formData.serviceType || !formData.instructorName ||
      !formData.sessionDate || !formData.sessionTime
    ) {
      alert('Please fill all required fields!');
      setLoading(false);
      return;
    }

    // Only sending fields that exist in the backend entity
    const submitData = {
      customerName: formData.customerName,
      phone: formData.phone,
      ...(formData.email && { email: formData.email }),
      serviceType: formData.serviceType,
      sessionDate: formData.sessionDate,
      ...(formData.sessionTime && { sessionTime: formData.sessionTime }),
      ...(formData.location && { location: formData.location }),
      trialCompleted: false,
      ...(formData.durationMinutes && { durationMinutes: parseInt(formData.durationMinutes) }),
      ...(formData.totalAmount && { totalAmount: parseFloat(formData.totalAmount) }),
      ...(formData.notes && { notes: formData.notes }),
    };

    console.log('Submitting:', submitData);

    try {
      const response = await axios.post('http://localhost:3001/yoga-meditation', submitData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Success:', response.data);
      alert('✅ Yoga & Meditation session booked successfully!');

      setFormData({
        customerName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        healthConditions: '',
        injuries: '',
        fitnessLevel: '',
        goals: '',
        isFirstSession: true,
        serviceType: '',
        experienceLevel: '',
        preferredStyle: '',
        instructorName: '',
        sessionDate: '',
        sessionTime: '',
        location: '',
        durationMinutes: '60',
        totalAmount: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('❌ Error booking session! ' + (error.response?.data?.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all outline-none bg-white text-gray-700 placeholder-gray-400';

  const selectClass =
    'w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all outline-none bg-white text-gray-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="text-6xl">🧘</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Yoga &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">Meditation</span>
          </h2>
          <p className="text-gray-500 text-lg">Find your inner peace — book a guided session today</p>
          <div className="flex justify-center gap-3 mt-4 text-sm text-gray-500 flex-wrap">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">⏱️ 60 min</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">💰 $25 – $80</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">🌿 Beginner Friendly</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">🌬️ Breathing Exercises</span>
          </div>
          <div className="mt-5 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-yellow-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Client Information */}
            <div className="border-b border-yellow-100 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👤</span> Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-yellow-500">*</span></label>
                  <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required className={inputClass} placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} min="5" max="100" className={inputClass} placeholder="Enter age" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender <span className="text-yellow-500">*</span></label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required className={selectClass}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-yellow-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="03XX-XXXXXXX" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="example@email.com" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className={inputClass} placeholder="Enter your address" />
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="border-b border-yellow-100 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌿</span> Health Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Health Conditions</label>
                  <textarea name="healthConditions" value={formData.healthConditions} onChange={handleChange} rows={2} className={inputClass} placeholder="Any health conditions we should know about? (e.g. hypertension, asthma)" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Injuries / Physical Limitations</label>
                  <textarea name="injuries" value={formData.injuries} onChange={handleChange} rows={2} className={inputClass} placeholder="Any injuries or limitations? (e.g. back pain, knee issue)" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Current Fitness Level</label>
                    <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className={selectClass}>
                      <option value="">Select Fitness Level</option>
                      <option value="sedentary">Sedentary (little to no exercise)</option>
                      <option value="light">Light (1–2 days/week)</option>
                      <option value="moderate">Moderate (3–4 days/week)</option>
                      <option value="active">Active (5+ days/week)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Goals</label>
                    <select name="goals" value={formData.goals} onChange={handleChange} className={selectClass}>
                      <option value="">Select Your Goal</option>
                      <option value="stress_relief">Stress Relief</option>
                      <option value="flexibility">Flexibility</option>
                      <option value="strength">Strength & Balance</option>
                      <option value="weight_loss">Weight Loss</option>
                      <option value="mindfulness">Mindfulness & Peace</option>
                      <option value="breathing">Better Breathing</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" name="isFirstSession" checked={formData.isFirstSession} onChange={handleChange} className="w-5 h-5 text-yellow-500 rounded focus:ring-yellow-400 accent-yellow-400" />
                  <label className="text-sm font-semibold text-gray-700">Is this your first yoga/meditation session?</label>
                </div>
              </div>
            </div>

            {/* Yoga Specific */}
            <div className="border-b border-yellow-100 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🕉️</span> Session Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Service Type <span className="text-yellow-500">*</span></label>
                  <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className={selectClass}>
                    <option value="">Select Service</option>
                    <option value="beginner">🌱 Beginner Yoga</option>
                    <option value="stress_relief">🧘 Stress Relief</option>
                    <option value="flexibility">🤸 Flexibility Training</option>
                    <option value="breathing_exercises">🌬️ Breathing Exercises</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className={selectClass}>
                    <option value="">Select Experience</option>
                    <option value="none">No Experience</option>
                    <option value="beginner">Beginner (0–6 months)</option>
                    <option value="intermediate">Intermediate (6m–2 years)</option>
                    <option value="advanced">Advanced (2+ years)</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Preferred Yoga Style</label>
                  <select name="preferredStyle" value={formData.preferredStyle} onChange={handleChange} className={selectClass}>
                    <option value="">Select Preferred Style (optional)</option>
                    <option value="hatha">Hatha (slow & gentle)</option>
                    <option value="vinyasa">Vinyasa (flow-based)</option>
                    <option value="restorative">Restorative (deep relaxation)</option>
                    <option value="yin">Yin (deep stretching)</option>
                    <option value="guided_meditation">Guided Meditation only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="border-b border-yellow-100 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span> Appointment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Instructor Name <span className="text-yellow-500">*</span></label>
                  <input type="text" name="instructorName" value={formData.instructorName} onChange={handleChange} required className={inputClass} placeholder="e.g. Sara Khan" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Location / Studio</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Studio address or 'Online'" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Session Date <span className="text-yellow-500">*</span></label>
                  <input type="date" name="sessionDate" value={formData.sessionDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Session Time <span className="text-yellow-500">*</span></label>
                  <input type="time" name="sessionTime" value={formData.sessionTime} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Duration</label>
                  <select name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} className={selectClass}>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes (recommended)</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Total Amount ($25 – $80)</label>
                  <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} min="25" max="80" step="0.01" className={inputClass} placeholder="e.g. 50" />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Additional Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className={inputClass} placeholder="Anything else you'd like us to know?" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-yellow-500 hover:to-amber-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <span>🧘</span>
                  Book Yoga &amp; Meditation Session
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Fields marked with <span className="text-yellow-500 font-semibold">*</span> are required
          </p>
        </div>
      </div>
    </div>
  );
}