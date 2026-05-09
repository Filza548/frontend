// frontend/app/services/page.jsx
'use client';

import { useState, useEffect } from 'react';  // 🔴 useEffect ADD KARO
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabse.js';  // 🔴 supabase IMPORT KARO
import Image from 'next/image';
import { Noto_Sans_Telugu } from 'next/font/google';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);  // 🔴 ADD USER STATE
  const [loading, setLoading] = useState(true);  // 🔴 ADD LOADING STATE
  const router = useRouter();

  // 🔴 CHECK IF USER IS LOGGED IN
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  // 🔴 HANDLE BOOK NOW CLICK
  const handleBookNow = async (slug) => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // User is logged in - go directly to booking form
      router.push(`/services/${slug}`);
    } else {
      // User not logged in - go to signup page with return URL
      router.push(`/auth/signup?returnUrl=/services/${slug}`);
    }
  };

  // Services data
  const services = [
    {
      id: 1,
      name: 'Doctor Consultation',
      category: 'medical',
      icon: '🏥',
      price: '$50 - $200',
      duration: '30-60 min',
      description: 'Consult with top medical professionals and specialists for your health concerns.',
      features: ['Experienced Doctors', 'Online/Offline', 'Prescription Included', 'Follow-up Available'],
      popular: true,
      color: 'blue',
      slug: 'doctor-consultation'
    },
    {
      id: 2,
      name: 'Dental Care',
      category: 'medical',
      icon: '🦷',
      price: '$30 - $150',
      duration: '45-90 min',
      description: 'Complete dental care services including cleaning, filling, and checkups.',
      features: ['Teeth Cleaning', 'Root Canal', 'Cosmetic Dentistry', 'Emergency Care'],
      popular: false,
      color: 'blue',
      slug: 'dental-care'
    },
    {
      id: 3,
      name: 'Salon & Spa',
      category: 'beauty',
      icon: '💇‍♀️',
      price: '$25 - $100',
      duration: '60-120 min',
      description: 'Pamper yourself with our premium salon and spa services.',
      features: ['Hair Styling', 'Facial', 'Massage', 'Manicure/Pedicure'],
      popular: true,
      color: 'pink',
      slug: 'salon-spa'
    },
    {
      id: 4,
      name: 'Makeup & Bridal',
      category: 'beauty',
      icon: '💄',
      price: '$80 - $300',
      duration: '2-4 hours',
      description: 'Professional makeup services for special occasions and bridal events.',
      features: ['Bridal Makeup', 'Party Makeup', 'Hair Styling', 'Trial Session'],
      popular: false,
      color: 'pink',
      slug: 'makeup-bridal'
    },
    {
      id: 5,
      name: 'Legal Consultation',
      category: 'professional',
      icon: '⚖️',
      price: '$100 - $400',
      duration: '60 min',
      description: 'Expert legal advice from experienced lawyers and consultants.',
      features: ['Corporate Law', 'Family Law', 'Criminal Law', 'Document Review'],
      popular: true,
      color: 'purple',
      slug: 'legal-consultation'
    },
    {
      id: 6,
      name: 'Business Consulting',
      category: 'professional',
      icon: '📊',
      price: '$150 - $500',
      duration: '90 min',
      description: 'Strategic business advice to help your company grow and succeed.',
      features: ['Business Planning', 'Marketing Strategy', 'Financial Advice', 'Growth Hacking'],
      popular: false,
      color: 'purple',
      slug: 'business-consulting'
    },
    {
      id: 7,
      name: 'Personal Training',
      category: 'fitness',
      icon: '💪',
      price: '$40 - $120',
      duration: '60 min',
      description: 'Achieve your fitness goals with professional personal trainers.',
      features: ['Custom Workout', 'Nutrition Advice', 'Progress Tracking', 'Online/Offline'],
      popular: false,
      color: 'green',
      slug: 'personal-training'
    },
    {
      id: 8,
      name: 'Yoga & Meditation',
      category: 'fitness',
      icon: '🧘',
      price: '$25 - $80',
      duration: '60 min',
      description: 'Find your inner peace with guided yoga and meditation sessions.',
      features: ['Beginner Friendly', 'Stress Relief', 'Flexibility', 'Breathing Exercises'],
      popular: true,
      color: 'green',
      slug: 'yoga-meditation'
    },
    // {
    //   id: 9,
    //   name: 'Photography',
    //   category: 'creative',
    //   icon: '📸',
    //   price: '$150 - $600',
    //   duration: '2-4 hours',
    //   description: 'Capture your precious moments with professional photography services.',
    //   features: ['Wedding Photography', 'Portrait Sessions', 'Event Coverage', 'Edited Photos'],
    //   popular: false,
    //   color: 'orange',
    //   slug: 'photography'
    // },
    {
      id: 10,
      name: 'Web Development',
      category: 'tech',
      icon: '💻',
      price: '$200 - $1000',
      duration: 'Project based',
      description: 'Custom website development for businesses and individuals.',
      features: ['Responsive Design', 'E-commerce', 'SEO Friendly', 'Maintenance'],
      popular: true,
      color: 'indigo',
      slug: 'web-development'
    },
    {
      id: 11,
      name: 'Home Cleaning',
      category: 'home',
      icon: '🧹',
      price: '$60 - $200',
      duration: '2-3 hours',
      description: 'Professional home cleaning services to keep your space spotless.',
      features: ['Deep Cleaning', 'Regular Maintenance', 'Eco-friendly Products', 'Insured'],
      popular: false,
      color: 'teal',
      slug: 'home-cleaning'
    },
    {
      id: 12,
      name: 'Plumbing Services',
      category: 'home',
      icon: '🔧',
      price: '$50 - $250',
      duration: '1-2 hours',
      description: 'Expert plumbing services for repairs and installations.',
      features: ['Emergency Service', 'Leak Repair', 'Installation', 'Maintenance'],
      popular: false,
      color: 'teal',
      slug: 'plumbing-services'
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Services', icon: '🔍' },
    { id: 'medical', name: 'Medical', icon: '🏥' },
    { id: 'beauty', name: 'Beauty & Salon', icon: '💇‍♀️' },
    { id: 'professional', name: 'Professional', icon: '👔' },
    { id: 'fitness', name: 'Fitness & Wellness', icon: '💪' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'home', name: 'Home Services', icon: '🏠' }
  ];

  // Filter services based on category and search
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Color mapping
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-600',
        light: 'bg-blue-100',
        gradient: 'from-blue-500 to-blue-600'
      },
      pink: {
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        text: 'text-pink-600',
        hover: 'hover:bg-pink-600',
        light: 'bg-pink-100',
        gradient: 'from-pink-500 to-pink-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-600',
        light: 'bg-purple-100',
        gradient: 'from-purple-500 to-purple-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        hover: 'hover:bg-green-600',
        light: 'bg-green-100',
        gradient: 'from-green-500 to-green-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-600',
        light: 'bg-orange-100',
        gradient: 'from-orange-500 to-orange-600'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-600',
        hover: 'hover:bg-indigo-600',
        light: 'bg-indigo-100',
        gradient: 'from-indigo-500 to-indigo-600'
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        text: 'text-teal-600',
        hover: 'hover:bg-teal-600',
        light: 'bg-teal-100',
        gradient: 'from-teal-500 to-teal-600'
      }
    };
    return colors[color] || colors.blue;
  };

  // 🔴 SHOW LOADING (optional)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Premium Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Choose from a wide range of professional services tailored to meet your needs
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-white-900 placeholder-white-500 outline-white ring-1 :ring-white-300"
                />
                <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-600">
          Showing <span className="font-bold text-blue-600">{filteredServices.length}</span> services
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const colors = getColorClasses(service.color);
            
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${colors.border} relative`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    ⭐ Popular
                  </div>
                )}

                {/* Service Icon */}
                <div className={`h-32 ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10`}></div>
                  <span className="text-6xl transform hover:scale-110 transition-transform">
                    {service.icon}
                  </span>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
                  
                  {/* Price & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-2xl font-bold ${colors.text}`}>{service.price}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                      ⏱️ {service.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <svg className={`w-4 h-4 ${colors.text} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* 🔴 ACTION BUTTONS - UPDATED WITH AUTH CHECK 🔴 */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleBookNow(service.slug)}
                      className={`flex-1 bg-gradient-to-r ${colors.gradient} text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105`}
                    >
                      Book Now
                    </button>
                   
                    <button
                      onClick={() => {
                        alert(`More details about ${service.name}`);
                      }}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Services Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Featured Categories */}
      <div className="bg-white py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(1).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group text-center p-6 rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {services.filter(s => s.category === category.id).length} services
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Verified Professionals</h3>
            <p className="text-gray-600 text-sm">All our service providers are thoroughly vetted</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">24/7 Availability</h3>
            <p className="text-gray-600 text-sm">Book appointments anytime, anywhere</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">100% secure and hassle-free payments</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Satisfaction Guaranteed</h3>
            <p className="text-gray-600 text-sm">Love our service or get your money back</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Book your appointment now and experience the best service</p>
          <Link
            href="/"
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition inline-block shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Appointment Now
          </Link>
        </div>
      </div>
    </div>
  );
}