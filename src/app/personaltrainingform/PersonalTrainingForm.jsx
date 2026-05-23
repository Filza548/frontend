'use client';
import { useState } from 'react';
import axios from 'axios';

const inputClass =
  'w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 text-sm font-medium';

const labelClass =
  'block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5';

const sectionCard =
  'bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5';

const GOALS = [
  { value: 'weight_loss',     label: 'Weight Loss',     icon: '🔥' },
  { value: 'muscle_gain',     label: 'Muscle Gain',     icon: '💪' },
  { value: 'endurance',       label: 'Endurance',       icon: '🏃' },
  { value: 'flexibility',     label: 'Flexibility',     icon: '🧘' },
  { value: 'general_fitness', label: 'General Fitness', icon: '⚡' },
  { value: 'rehabilitation',  label: 'Rehabilitation',  icon: '🩺' },
];

export default function PersonalTrainingForm() {
  const [formData, setFormData] = useState({
    clientName: '', phone: '', email: '', age: '', gender: '',
    trainerName: '', trainerSpecialization: '',
    sessionMode: '', packageType: '', sessionDate: '', sessionTime: '',
    durationMinutes: '60', fitnessGoal: '',
    customWorkout: false, nutritionAdvice: false, progressTracking: false,
    currentFitnessLevel: '', medicalConditions: '',
    pricePerSession: '', notes: '',
  });

  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleFeature = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const required = ['clientName', 'phone', 'age', 'gender', 'trainerName', 'sessionMode', 'packageType', 'sessionDate', 'sessionTime', 'fitnessGoal', 'pricePerSession'];
    for (const f of required) {
      if (!formData[f]) {
        alert('Please fill all required fields!');
        setLoading(false);
        return;
      }
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/personal-training`, {
        ...formData,
        age: parseInt(formData.age),
        durationMinutes: parseInt(formData.durationMinutes),
        pricePerSession: parseFloat(formData.pricePerSession),
      }, { headers: { 'Content-Type': 'application/json' } });
      setSubmitted(true);
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      clientName: '', phone: '', email: '', age: '', gender: '',
      trainerName: '', trainerSpecialization: '',
      sessionMode: '', packageType: '', sessionDate: '', sessionTime: '',
      durationMinutes: '60', fitnessGoal: '',
      customWorkout: false, nutritionAdvice: false, progressTracking: false,
      currentFitnessLevel: '', medicalConditions: '',
      pricePerSession: '', notes: '',
    });
  };

  if (submitted) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Session Booked!</h2>
        <p className="text-gray-400 text-sm mb-8">Your personal training session has been booked. Your trainer will confirm shortly.</p>
        <button onClick={handleReset} className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-sm hover:from-orange-600 hover:to-red-600 transition-all shadow-md shadow-orange-500/20">
          + Book Another Session
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .fu  { animation: fadeUp .45s ease both; }
        .fu1 { animation-delay:.04s } .fu2 { animation-delay:.10s }
        .fu3 { animation-delay:.16s } .fu4 { animation-delay:.22s }
        .fu5 { animation-delay:.28s } .fu6 { animation-delay:.34s }
        select option { background: #111827; }
      `}</style>

      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 fu fu1">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-pulse"></span>
            Personal Training
          </div>
          <h1 className="text-5xl font-black text-white uppercase leading-none mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Book Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Training Session</span>
          </h1>
          <p className="text-gray-500 text-sm">$40 – $120 per session &nbsp;·&nbsp; ⏱️ 60 min &nbsp;·&nbsp; Online / Offline</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ── Client Info ── */}
          <div className={`${sectionCard} fu fu2`}>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Client Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Full Name <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required placeholder="e.g. Ahmed Khan" className={inputClass} /></div>
              <div><label className={labelClass}>Phone <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="03XX-XXXXXXX" className={inputClass} /></div>
              <div><label className={labelClass}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} /></div>
              <div><label className={labelClass}>Age <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="5" max="100" placeholder="e.g. 28" className={inputClass} /></div>
              <div className="md:col-span-2">
                <label className={labelClass}>Gender <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <div className="flex gap-3">
                  {['male','female','other'].map((g) => (
                    <label key={g} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all font-semibold text-sm capitalize ${formData.gender === g ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-gray-700 text-gray-500 hover:border-gray-600'}`}>
                      <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="hidden" />
                      {g === 'male' ? '♂' : g === 'female' ? '♀' : '⚧'} {g}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Trainer Info ── */}
          <div className={`${sectionCard} fu fu3`}>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Trainer Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Trainer Name <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="text" name="trainerName" value={formData.trainerName} onChange={handleChange} required placeholder="e.g. Coach Sara" className={inputClass} /></div>
              <div><label className={labelClass}>Specialization</label>
                <input type="text" name="trainerSpecialization" value={formData.trainerSpecialization} onChange={handleChange} placeholder="e.g. Strength & Conditioning" className={inputClass} /></div>
            </div>
          </div>

          {/* ── Session Details ── */}
          <div className={`${sectionCard} fu fu3`}>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Session Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Session Mode */}
              <div className="md:col-span-2">
                <label className={labelClass}>Session Mode <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {[{v:'online',l:'🌐 Online'},{v:'offline',l:'🏋️ Offline'}].map(({v,l}) => (
                    <label key={v} className={`flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer font-bold text-sm transition-all ${formData.sessionMode === v ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-gray-700 text-gray-500 hover:border-gray-600'}`}>
                      <input type="radio" name="sessionMode" value={v} checked={formData.sessionMode === v} onChange={handleChange} className="hidden" />{l}
                    </label>
                  ))}
                </div>
              </div>

              {/* Package */}
              <div className="md:col-span-2">
                <label className={labelClass}>Package Type <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[{v:'single',l:'Single',s:'1 Session'},{v:'package_5',l:'Pack 5',s:'5 Sessions'},{v:'package_10',l:'Pack 10',s:'10 Sessions'},{v:'monthly',l:'Monthly',s:'~20 Sessions'}].map(({v,l,s}) => (
                    <label key={v} className={`flex flex-col items-center py-3 px-2 rounded-xl border-2 cursor-pointer transition-all ${formData.packageType === v ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                      <input type="radio" name="packageType" value={v} checked={formData.packageType === v} onChange={handleChange} className="hidden" />
                      <span className={`text-sm font-bold ${formData.packageType === v ? 'text-orange-400' : 'text-gray-400'}`}>{l}</span>
                      <span className="text-xs text-gray-600 mt-0.5">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div><label className={labelClass}>Session Date <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="date" name="sessionDate" value={formData.sessionDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputClass} /></div>
              <div><label className={labelClass}>Session Time <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="time" name="sessionTime" value={formData.sessionTime} onChange={handleChange} required className={inputClass} /></div>

              <div><label className={labelClass}>Duration (minutes)</label>
                <select name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} className={inputClass}>
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
              </div>

              <div><label className={labelClass}>Price / Session ($) <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="number" name="pricePerSession" value={formData.pricePerSession} onChange={handleChange} required min="40" max="500" placeholder="40 – 120" className={inputClass} /></div>
            </div>
          </div>

          {/* ── Fitness Goals ── */}
          <div className={`${sectionCard} fu fu4`}>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Fitness Goals</h2>
            </div>

            <div>
              <label className={labelClass}>Primary Goal <span className="text-red-500 normal-case tracking-normal">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {GOALS.map(({ value, label, icon }) => (
                  <label key={value} className={`flex items-center gap-2.5 py-3 px-4 rounded-xl border-2 cursor-pointer transition-all ${formData.fitnessGoal === value ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                    <input type="radio" name="fitnessGoal" value={value} checked={formData.fitnessGoal === value} onChange={handleChange} className="hidden" />
                    <span className="text-lg">{icon}</span>
                    <span className={`text-sm font-semibold ${formData.fitnessGoal === value ? 'text-orange-400' : 'text-gray-400'}`}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className={labelClass}>Add-on Services</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { field: 'customWorkout',   icon: '🏋️', label: 'Custom Workout',  desc: 'Tailored program' },
                  { field: 'nutritionAdvice', icon: '🥗', label: 'Nutrition Advice', desc: 'Diet planning' },
                  { field: 'progressTracking',icon: '📊', label: 'Progress Tracking',desc: 'Weekly reports' },
                ].map(({ field, icon, label, desc }) => (
                  <button type="button" key={field} onClick={() => toggleFeature(field)}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl border-2 text-left transition-all ${formData[field] ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className={`text-sm font-bold ${formData[field] ? 'text-orange-400' : 'text-gray-400'}`}>{label}</p>
                      <p className="text-xs text-gray-600">{desc}</p>
                    </div>
                    {formData[field] && <div className="ml-auto w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Health Info ── */}
          <div className={`${sectionCard} fu fu5`}>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Health Information</h2>
            </div>
            <div className="space-y-4">
              <div><label className={labelClass}>Current Fitness Level</label>
                <textarea name="currentFitnessLevel" value={formData.currentFitnessLevel} onChange={handleChange} rows={2} placeholder="Describe your current fitness level..." className={inputClass + ' resize-none'} /></div>
              <div><label className={labelClass}>Medical Conditions</label>
                <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} rows={2} placeholder="Any injuries or medical conditions we should know about?" className={inputClass + ' resize-none'} /></div>
              <div><label className={labelClass}>Additional Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} placeholder="Anything else you'd like to share..." className={inputClass + ' resize-none'} /></div>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="fu fu6">
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-black text-base uppercase tracking-wide hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}>
              {loading ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Booking...</>
              ) : (
                <><span>💪</span> Book Training Session <span>→</span></>
              )}
            </button>
            <p className="text-center text-xs text-gray-600 mt-4">Fields marked <span className="text-red-500">*</span> are required</p>
          </div>
        </form>
      </div>
    </div>
  );
}