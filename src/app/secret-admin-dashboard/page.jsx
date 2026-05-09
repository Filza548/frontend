'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabse.js';
import Link from 'next/link';

// Import all your components
import BridalComponent from '../bridalgettable/BridalComponent';
import BusinessConsultationComponent from '../businessconsultationtable/BusinessConsultationComponent';
import DentalTableComponent from '../dentalgettable/DentalTableComponent';
import DoctorCosultationComponent from '../doctorconsultinggettable/DoctorCosultationComponent';
import EmployeeTableComponent from '../employeegettable/EmployeeTableComponent';
import LegalTableComponent from '../legalconsultationtable/LegalTableComponent';
import SalonTableComponent from '../salongettable/SalonTableComponent';
import WebDevProjectTable from "../webdevtable/WebDevProjectTable.jsx";
import PersonalTrainingTable from '../personaltrainingtable/PersonalTrainingTable.jsx';
import YogaMeditationTableComponent from '../yogameditationtable/YogaMeditationTableComponent.jsx'
import Plumbingtablecomponent from '../plumbingtable/Plumbingtablecomponent.jsx';
import Homecleaningtable from '../homecleaningtable/Homecleaningtable.jsx'; 





export default function SecretAdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });

  // 🔴 Check if user is owner
  useEffect(() => {
    const checkOwner = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/');
        return;
      }
      
      // 🔴 APNI EMAIL YAHAN DAALO
      const ownerEmails = ['filzajameel12@gmail.com']; // 👈 Apni email daalo
      
      if (ownerEmails.includes(user.email)) {
        setAuthorized(true);
      } else {
        router.push('/');
      }
      
      setLoading(false);
    };
    
    checkOwner();
  }, [router]);

  // Dummy stats - aap later real API se fetch kar sakte ho
  useEffect(() => {
    if (authorized) {
      // Yahan aap real API calls kar sakte ho sab components se data fetch karne ke liye
      setStats({
        totalBookings: 1247,
        totalRevenue: 2458900,
        pendingBookings: 43,
        completedBookings: 892,
      });
    }
  }, [authorized]);

  const tabs = [
    { id: 'overview', name: '📊 Overview', icon: '📊' },
    { id: 'bridal', name: '💄 Bridal/Makeup', icon: '💄' },
    { id: 'business', name: '💼 Business', icon: '💼' },
    { id: 'dental', name: '🦷 Dental', icon: '🦷' },
    { id: 'doctor', name: '👨‍⚕️ Doctor', icon: '👨‍⚕️' },
    { id: 'employee', name: '👥 Employees', icon: '👥' },
    { id: 'legal', name: '⚖️ Legal', icon: '⚖️' },
    { id: 'salon', name: '💅 Salon/Spa', icon: '💅' },
    { id: 'webdev', name: '💻 Web Development', icon: '💻' },
    { id: 'personaltraining', name: '🏋️ Personal Training', icon: '🏋️' },
    { id: 'yoga', name: '🧘 Yoga/Meditation', icon: '🧘' },
    { id: 'plumbing', name: '🔧 Plumbing Services', icon: '🔧' },
      { id: 'homecleaning', name: '🧹 Home Cleaning', icon: '🧹' },

  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">👑</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">Manage all services & bookings</p>
              </div>
            </div>
            
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 bg-black/20 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                  {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.totalBookings.toLocaleString()}</span>
                </div>
                <p className="text-gray-300 text-sm">Total Bookings</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <span className="text-2xl font-bold text-white">PKR {stats.totalRevenue.toLocaleString()}</span>
                </div>
                <p className="text-gray-300 text-sm">Total Revenue</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.pendingBookings}</span>
                </div>
                <p className="text-gray-300 text-sm">Pending Bookings</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{stats.completedBookings}</span>
                </div>
                <p className="text-gray-300 text-sm">Completed</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">⚡ Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl text-blue-300 text-sm font-medium transition">
                  📅 View All Bookings
                </button>
                <button className="p-3 bg-green-600/20 hover:bg-green-600/30 rounded-xl text-green-300 text-sm font-medium transition">
                  💰 Revenue Report
                </button>
                <button className="p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-xl text-purple-300 text-sm font-medium transition">
                  👥 Manage Users
                </button>
                <button className="p-3 bg-orange-600/20 hover:bg-orange-600/30 rounded-xl text-orange-300 text-sm font-medium transition">
                  📊 Export Data
                </button>
              </div>
            </div>

            {/* Service Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Bridal/Makeup', icon: '💄', count: 156, color: 'pink' },
                { name: 'Business', icon: '💼', count: 89, color: 'blue' },
                { name: 'Dental', icon: '🦷', count: 234, color: 'cyan' },
                { name: 'Doctor', icon: '👨‍⚕️', count: 312, color: 'emerald' },
                { name: 'Employees', icon: '👥', count: 45, color: 'amber' },
                { name: 'Legal', icon: '⚖️', count: 78, color: 'purple' },
                { name: 'Salon/Spa', icon: '💅', count: 198, color: 'rose' },
              ].map((service) => (
                <div
                  key={service.name}
                  onClick={() => setActiveTab(service.name.toLowerCase().split('/')[0])}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 cursor-pointer transition"
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <p className="text-white font-medium text-sm">{service.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{service.count} bookings</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bridal/Makeup Tab */}
        {activeTab === 'bridal' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <BridalComponent />
          </div>
        )}

        {/* Business Tab */}
        {activeTab === 'business' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <BusinessConsultationComponent />
          </div>
        )}

        {/* Dental Tab */}
        {activeTab === 'dental' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <DentalTableComponent />
          </div>
        )}

        {/* Doctor Tab */}
        {activeTab === 'doctor' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <DoctorCosultationComponent />
          </div>
        )}

        {/* Employee Tab */}
        {activeTab === 'employee' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <EmployeeTableComponent />
          </div>
        )}

        {/* Legal Tab */}
        {activeTab === 'legal' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <LegalTableComponent />
          </div>
        )}


        {/* Web Dev Tab */}
        {activeTab === 'webdev' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <WebDevProjectTable />
          </div>
        )}


        {/* Perosnal Training Tab */}
        {activeTab === 'personaltraining' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <PersonalTrainingTable/>
          </div>
        )}


        {/* Yoga Meditation Tab */}
        {activeTab === 'yoga' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <YogaMeditationTableComponent/>
          </div>
        )}


        {/* Plumbing table Tab */}
        {activeTab === 'plumbing' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Plumbingtablecomponent/>
          </div>
        )}


        {/* Homecleaningtable Tab */}
        {activeTab === 'homecleaning' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Homecleaningtable/>
          </div>
        )}

        {/* Salon/Spa Tab */}
        {activeTab === 'salon' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <SalonTableComponent />
          </div>
        )}


        
      </div>
    </div>
  );
}