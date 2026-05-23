'use client';

import { useState } from 'react';
import axios from 'axios';

const API_URL = (`${process.env.NEXT_PUBLIC_BACKEND_URL}/salon-spa-consultations`);

const inputClass =
  'w-full bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 text-gray-700 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-sm';
const labelClass = 'block text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1';
const sectionClass = 'bg-white rounded-2xl shadow-sm border border-rose-100 p-6 mb-6';

export default function SalonComponentForm() {
  const [form, setForm] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    serviceType: 'Salon',
    hairService: '',
    nailService: '',
    spaService: '',
    serviceNotes: '',
    appointmentDate: '',
    appointmentTime: '',
    totalDuration: 60,
    staffName: '',
    staffSpecialization: '',
    isMember: false,
    membershipId: '',
    loyaltyPoints: 0,
    totalAmount: '',
    paymentStatus: 'Pending',
    paymentMethod: '',
    status: 'Scheduled',
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
  totalDuration: Number(form.totalDuration),
  loyaltyPoints: Number(form.loyaltyPoints),
  appointmentDate: new Date(form.appointmentDate),

  // ✅ Yeh teen lines add karo
  spaService: form.spaService || undefined,
  membershipId: form.membershipId || undefined,
  totalAmount: form.totalAmount ? Number(form.totalAmount) : undefined,
};
      await axios.post(API_URL, payload);
      setSuccess('✨ Appointment booked successfully!');
      setForm({
        customerName: '', phoneNumber: '', email: '', serviceType: 'Salon',
        hairService: '', nailService: '', spaService: '', serviceNotes: '',
        appointmentDate: '', appointmentTime: '', totalDuration: 60,
        staffName: '', staffSpecialization: '', isMember: false,
        membershipId: '', loyaltyPoints: 0, totalAmount: '', paymentStatus: 'Pending',
        paymentMethod: '', status: 'Scheduled', notes: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-rose-200 rounded-full px-5 py-2 shadow-sm mb-4">
          <span className="text-lg">🌸</span>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Salon & Spa</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Book Your Appointment
        </h1>
        <p className="text-rose-400 text-sm">Fill in the details below to schedule your visit</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

        {/* Customer Information */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">1</span>
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" name="customerName" value={form.customerName}
                onChange={handleChange} required placeholder="e.g. Sara Khan"
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input type="text" name="phoneNumber" value={form.phoneNumber}
                onChange={handleChange} required placeholder="e.g. 0300-1234567"
                className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="e.g. sara@email.com"
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">2</span>
            Service Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Service Type *</label>
              <select name="serviceType" value={form.serviceType}
                onChange={handleChange} required className={inputClass}>
                <option value="Salon">Salon</option>
                <option value="Spa">Spa</option>
                <option value="Both">Both</option>
              </select>
            </div>
            {(form.serviceType === 'Salon' || form.serviceType === 'Both') && (
              <div>
                <label className={labelClass}>Hair Service</label>
                <select name="hairService" value={form.hairService}
                  onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Haircut">Haircut</option>
                  <option value="Color">Color</option>
                  <option value="Styling">Styling</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Highlights">Highlights</option>
                </select>
              </div>
            )}
            {(form.serviceType === 'Salon' || form.serviceType === 'Both') && (
              <div>
                <label className={labelClass}>Nail Service</label>
                <select name="nailService" value={form.nailService}
                  onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Manicure">Manicure</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Gel">Gel</option>
                  <option value="Acrylic">Acrylic</option>
                </select>
              </div>
            )}
            {(form.serviceType === 'Spa' || form.serviceType === 'Both') && (
              <div>
                <label className={labelClass}>Spa Service</label>
                <select name="spaService" value={form.spaService}
                  onChange={handleChange} className={inputClass}>
                  <option value="">Select...</option>
                  <option value="Swedish Massage">Swedish Massage</option>
                  <option value="Deep Tissue">Deep Tissue</option>
                  <option value="Facial">Facial</option>
                  <option value="Body Scrub">Body Scrub</option>
                  <option value="Hot Stone">Hot Stone</option>
                </select>
              </div>
            )}
            <div className="md:col-span-2">
              <label className={labelClass}>Special Instructions</label>
              <textarea name="serviceNotes" value={form.serviceNotes}
                onChange={handleChange} rows={2} placeholder="Any special requests..."
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">3</span>
            Appointment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Date *</label>
              <input type="date" name="appointmentDate" value={form.appointmentDate}
                onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Time *</label>
              <input type="time" name="appointmentTime" value={form.appointmentTime}
                onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Duration (minutes)</label>
              <input type="number" name="totalDuration" value={form.totalDuration}
                onChange={handleChange} min={15} max={480} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Staff */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">4</span>
            Staff
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Staff Name *</label>
              <input type="text" name="staffName" value={form.staffName}
                onChange={handleChange} required placeholder="e.g. Ayesha"
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Specialization</label>
              <input type="text" name="staffSpecialization" value={form.staffSpecialization}
                onChange={handleChange} placeholder="e.g. Hair Stylist"
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Membership */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">5</span>
            Membership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-rose-50 rounded-xl p-3 border border-rose-100">
              <input type="checkbox" name="isMember" checked={form.isMember}
                onChange={handleChange}
                className="w-4 h-4 accent-rose-500" id="isMember" />
              <label htmlFor="isMember" className="text-sm font-medium text-gray-600 cursor-pointer">
                Is Member?
              </label>
            </div>
            {form.isMember && (
              <div>
                <label className={labelClass}>Membership ID</label>
                <input type="text" name="membershipId" value={form.membershipId}
                  onChange={handleChange} placeholder="MEM-001"
                  className={inputClass} />
              </div>
            )}
            <div>
              <label className={labelClass}>Loyalty Points</label>
              <input type="number" name="loyaltyPoints" value={form.loyaltyPoints}
                onChange={handleChange} min={0} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">6</span>
            Payment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Total Amount (PKR)</label>
              <input type="number" name="totalAmount" value={form.totalAmount}
                onChange={handleChange} placeholder="e.g. 2500"
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Payment Status</label>
              <select name="paymentStatus" value={form.paymentStatus}
                onChange={handleChange} className={inputClass}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod}
                onChange={handleChange} className={inputClass}>
                <option value="">Select...</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes & Status */}
        <div className={sectionClass}>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xs">7</span>
            Additional Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status}
                onChange={handleChange} className={inputClass}>
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No-show">No-show</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Notes</label>
              <textarea name="notes" value={form.notes}
                onChange={handleChange} rows={2} placeholder="Any additional notes..."
                className={inputClass} />
            </div>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-4 text-sm font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:from-rose-500 hover:to-fuchsia-600 transition-all duration-300 text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Booking...' : '🌸 Book Appointment'}
        </button>
      </form>
    </div>
  );
}
