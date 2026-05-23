'use client';
import { useState } from 'react';
import axios from 'axios';

const inputClass =
  'w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 text-sm font-medium';

const labelClass = 'block text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5';

const sectionCard = 'bg-white rounded-2xl border border-blue-100 shadow-sm p-6 space-y-5';

export default function WebDevProjectForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    email: '',
    projectType: '',
    techStack: '',
    startDate: '',
    deadline: '',
    repositoryUrl: '',
    liveUrl: '',
    isResponsive: true,
    seoOptimized: false,
    projectBudget: '',
    requirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const required = ['clientName', 'phone', 'projectType', 'techStack', 'startDate'];
    for (const field of required) {
      if (!formData[field]) {
        alert('Please fill all required fields!');
        setLoading(false);
        return;
      }
    }

    const submitData = {
      ...formData,
      projectBudget: formData.projectBudget ? parseFloat(formData.projectBudget) : null,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/web-dev-projects`, submitData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSubmitted(true);
    } catch (error) {
      alert('❌ Error submitting project! ' + (error.response?.data?.message || 'Please try again'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      clientName: '', phone: '', email: '', projectType: '', techStack: '',
      startDate: '', deadline: '', repositoryUrl: '', liveUrl: '',
      isResponsive: true, seoOptimized: false, projectBudget: '', requirements: '',
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
        <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Project Submitted!</h2>
          <p className="text-gray-500 text-sm mb-8">Your web development project has been successfully created. Our team will review it shortly.</p>
          <button onClick={handleReset} className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg">
            + Submit Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-12 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.12s; }
        .fade-up-3 { animation-delay: 0.19s; }
        .fade-up-4 { animation-delay: 0.26s; }
        .fade-up-5 { animation-delay: 0.33s; }
        .dot-grid {
          background-image: radial-gradient(circle, #bfdbfe 1px, transparent 1px);
          background-size: 22px 22px;
        }
      `}</style>

      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 fade-up">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-300 inline-block"></span>
            New Project Request
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Web Dev<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">Project Form</span>
          </h1>
          <p className="text-gray-500 text-base max-w-sm mx-auto">Fill in the details below to kick off your web development project.</p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Client Info ── */}
          <div className={`${sectionCard} fade-up fade-up-1`}>
            <div className="flex items-center gap-3 pb-3 border-b border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Client Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required placeholder="e.g. Ali Hassan" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="03XX-XXXXXXX" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="client@example.com" className={inputClass} />
              </div>
            </div>
          </div>

          {/* ── Project Details ── */}
          <div className={`${sectionCard} fade-up fade-up-2`}>
            <div className="flex items-center gap-3 pb-3 border-b border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Project Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Project Type <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <select name="projectType" value={formData.projectType} onChange={handleChange} required className={inputClass}>
                  <option value="">Select type...</option>
                  <option value="landing_page">Landing Page</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="web_app">Web App</option>
                  <option value="cms">CMS</option>
                  <option value="api_integration">API Integration</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Tech Stack <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <select name="techStack" value={formData.techStack} onChange={handleChange} required className={inputClass}>
                  <option value="">Select stack...</option>
                  <option value="react">React.js</option>
                  <option value="nextjs">Next.js</option>
                  <option value="vue">Vue.js</option>
                  <option value="angular">Angular</option>
                  <option value="html_css">HTML / CSS</option>
                  <option value="nodejs">Node.js</option>
                  <option value="fullstack">Full Stack</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Start Date <span className="text-red-500 normal-case tracking-normal">*</span></label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} min={formData.startDate || new Date().toISOString().split('T')[0]} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Project Budget (PKR)</label>
                <input type="number" name="projectBudget" value={formData.projectBudget} onChange={handleChange} placeholder="e.g. 50000" min="0" className={inputClass} />
              </div>
            </div>
          </div>

          {/* ── Links ── */}
          <div className={`${sectionCard} fade-up fade-up-3`}>
            <div className="flex items-center gap-3 pb-3 border-b border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Project Links</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Repository URL</label>
                <input type="url" name="repositoryUrl" value={formData.repositoryUrl} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Live URL</label>
                <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} placeholder="https://yoursite.com" className={inputClass} />
              </div>
            </div>
          </div>

          {/* ── Tech Requirements ── */}
          <div className={`${sectionCard} fade-up fade-up-4`}>
            <div className="flex items-center gap-3 pb-3 border-b border-blue-50">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Technical Requirements</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-3 cursor-pointer group flex-1 bg-blue-50 border-2 border-blue-100 rounded-xl px-5 py-4 hover:border-blue-400 transition-all">
                <input type="checkbox" name="isResponsive" checked={formData.isResponsive} onChange={handleChange} className="w-5 h-5 accent-blue-600 rounded" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Responsive Design</p>
                  <p className="text-xs text-gray-500">Mobile & tablet friendly</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group flex-1 bg-blue-50 border-2 border-blue-100 rounded-xl px-5 py-4 hover:border-blue-400 transition-all">
                <input type="checkbox" name="seoOptimized" checked={formData.seoOptimized} onChange={handleChange} className="w-5 h-5 accent-blue-600 rounded" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">SEO Optimized</p>
                  <p className="text-xs text-gray-500">Search engine ready</p>
                </div>
              </label>
            </div>

            <div>
              <label className={labelClass}>Project Requirements</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Describe all project requirements, features, and special instructions..." className={inputClass + ' resize-none'} />
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="fade-up fade-up-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-4 px-8 rounded-2xl font-bold text-base hover:from-blue-700 hover:to-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting Project...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Submit Web Dev Project
                  <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Fields marked <span className="text-red-500">*</span> are required
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
