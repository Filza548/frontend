'use client';

import { useState } from 'react';
import axios from 'axios';

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/makeup-bridal`);

const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition';
const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5';
const sectionClass = 'bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-5';

export default function BridalFormComponent() {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    serviceType: 'bridal',
    eventDate: '',
    eventTime: '',
    location: '',
    trialCompleted: false,
    status: 'pending',
    totalAmount: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const payload = {
        ...form,
        eventDate: new Date(form.eventDate),
        totalAmount: form.totalAmount ? Number(form.totalAmount) : undefined,
        eventTime: form.eventTime || undefined,
        email: form.email || undefined,
        location: form.location || undefined,
        notes: form.notes || undefined,
      };
      await axios.post(API_URL, payload);
      setSuccess('✨ Booking successfully created!');
      setForm({
        customerName: '', phone: '', email: '', serviceType: 'bridal',
        eventDate: '', eventTime: '', location: '', trialCompleted: false,
        status: 'pending', totalAmount: '', notes: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    { value: 'bridal', label: '👰 Bridal', desc: 'Full bridal makeup' },
    { value: 'party', label: '🎉 Party', desc: 'Party & event makeup' },
    { value: 'hair', label: '💇 Hair', desc: 'Hair styling' },
    { value: 'trial', label: '🪞 Trial', desc: 'Trial session' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-pink-100 rounded-full px-5 py-2 shadow-sm mb-4">
          <span>💄</span>
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Makeup & Bridal Studio</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          New Booking
        </h1>
        <p className="text-gray-400 text-sm">Fill in the details to create a new appointment</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">

        {/* Customer Info */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs font-bold">1</div>
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Customer Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" name="customerName" value={form.customerName}
                onChange={handleChange} required placeholder="e.g. Ayesha Khan"
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input type="text" name="phone" value={form.phone}
                onChange={handleChange} required placeholder="e.g. 0300-1234567"
                className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="e.g. ayesha@email.com"
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Service Type */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs font-bold">2</div>
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Service Type *</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {serviceOptions.map((s) => (
              <label key={s.value}
                className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                  form.serviceType === s.value
                    ? 'border-pink-400 bg-pink-50 shadow-sm'
                    : 'border-gray-200 bg-gray-50 hover:border-pink-200'
                }`}>
                <input type="radio" name="serviceType" value={s.value}
                  checked={form.serviceType === s.value}
                  onChange={handleChange} className="hidden" />
                <div className="text-xl mb-1">{s.label.split(' ')[0]}</div>
                <div className="text-xs font-semibold text-gray-700">{s.label.split(' ')[1]}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs font-bold">3</div>
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Event Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Event Date *</label>
              <input type="date" name="eventDate" value={form.eventDate}
                onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Event Time</label>
              <input type="time" name="eventTime" value={form.eventTime}
                onChange={handleChange} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Location / Venue</label>
              <input type="text" name="location" value={form.location}
                onChange={handleChange} placeholder="e.g. Pearl Continental Hotel, Karachi"
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs font-bold">4</div>
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Booking Info</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status}
                onChange={handleChange} className={inputClass}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Total Amount (PKR)</label>
              <input type="number" name="totalAmount" value={form.totalAmount}
                onChange={handleChange} placeholder="e.g. 25000" min={0}
                className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:bg-pink-50 hover:border-pink-200 transition">
                <input type="checkbox" name="trialCompleted" checked={form.trialCompleted}
                  onChange={handleChange} className="w-4 h-4 accent-pink-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-700">Trial Completed</div>
                  <div className="text-xs text-gray-400">Check if trial session has been done</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xs font-bold">5</div>
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Additional Notes</h2>
          </div>
          <textarea name="notes" value={form.notes} onChange={handleChange}
            rows={3} placeholder="Any special requirements, skin concerns, references..."
            className={inputClass} />
        </div>

        {/* Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-4 text-sm font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl px-5 py-4 mb-4 text-sm font-medium">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-2xl text-white text-sm font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}>
          {loading ? '⏳ Creating Booking...' : '💄 Create Booking'}
        </button>

      </form>
    </div>
  );
}
