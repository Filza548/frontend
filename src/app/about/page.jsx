// frontend/app/about/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');
  const [counts, setCounts] = useState({
    clients: 0,
    appointments: 0,
    providers: 0,
    years: 0
  });

  // Animation for stats counting
  useEffect(() => {
    const targetCounts = {
      clients: 50000,
      appointments: 100000,
      providers: 500,
      years: 5
    };

    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = {
      clients: Math.ceil(targetCounts.clients / steps),
      appointments: Math.ceil(targetCounts.appointments / steps),
      providers: Math.ceil(targetCounts.providers / steps),
      years: Math.ceil(targetCounts.years / steps)
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCounts(prev => ({
          clients: Math.min(prev.clients + increment.clients, targetCounts.clients),
          appointments: Math.min(prev.appointments + increment.appointments, targetCounts.appointments),
          providers: Math.min(prev.providers + increment.providers, targetCounts.providers),
          years: Math.min(prev.years + increment.years, targetCounts.years)
        }));
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Khan",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in healthcare management, Dr. Sarah founded AppointBook to revolutionize appointment booking.",
      image: "👩‍⚕️",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@appointbook.com"
      },
      color: "blue"
    },
    {
      id: 2,
      name: "Ahmed Raza",
      position: "CTO",
      bio: "Tech visionary with expertise in building scalable platforms. Previously led engineering teams at top tech companies.",
      image: "👨‍💻",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ahmed@appointbook.com"
      },
      color: "green"
    },
    {
      id: 3,
      name: "Fatima Ali",
      position: "Head of Operations",
      bio: "Ensures smooth operations and customer satisfaction. 10+ years in service industry management.",
      image: "👩‍💼",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "fatima@appointbook.com"
      },
      color: "purple"
    },
    {
      id: 4,
      name: "Usman Malik",
      position: "Customer Success Lead",
      bio: "Dedicated to providing exceptional customer experience. Leads our 24/7 support team.",
      image: "👨‍💼",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "usman@appointbook.com"
      },
      color: "orange"
    }
  ];

  // Milestones data
  const milestones = [
    {
      year: "2019",
      title: "The Beginning",
      description: "AppointBook was founded with a vision to simplify appointment booking",
      icon: "🚀"
    },
    {
      year: "2020",
      title: "First 1000 Users",
      description: "Reached 1000 happy customers within first year",
      icon: "🎯"
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Expanded services to 10+ cities across Pakistan",
      icon: "📈"
    },
    {
      year: "2022",
      title: "New Features",
      description: "Launched mobile app and SMS notifications",
      icon: "📱"
    },
    {
      year: "2023",
      title: "50K+ Customers",
      description: "Served over 50,000 satisfied customers",
      icon: "🌟"
    },
    {
      year: "2024",
      title: "Global Reach",
      description: "Expanding internationally with new partnerships",
      icon: "🌍"
    }
  ];

  // Values data
  const values = [
    {
      id: 1,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above everything else.",
      icon: "❤️",
      color: "red"
    },
    {
      id: 2,
      title: "Innovation",
      description: "Constantly improving our platform with cutting-edge technology.",
      icon: "💡",
      color: "blue"
    },
    {
      id: 3,
      title: "Integrity",
      description: "Honest, transparent, and ethical in all our dealings.",
      icon: "🤝",
      color: "green"
    },
    {
      id: 4,
      title: "Excellence",
      description: "Striving for the highest quality in everything we do.",
      icon: "⭐",
      color: "yellow"
    },
    {
      id: 5,
      title: "Accessibility",
      description: "Making appointment booking easy and accessible for everyone.",
      icon: "🌐",
      color: "purple"
    },
    {
      id: 6,
      title: "Community",
      description: "Building a strong community of users and service providers.",
      icon: "👥",
      color: "orange"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Dr. Ayesha Malik",
      position: "Dental Surgeon",
      content: "AppointBook has transformed how I manage my clinic. My patients love the easy booking system!",
      rating: 5,
      image: "👩‍⚕️"
    },
    {
      id: 2,
      name: "Imran Hassan",
      position: "Salon Owner",
      content: "Increased my appointments by 40% since joining AppointBook. Best decision for my business.",
      rating: 5,
      image: "👨"
    },
    {
      id: 3,
      name: "Zara Ahmed",
      position: "Regular Customer",
      content: "So convenient! I book all my appointments through AppointBook. Never going back to old ways.",
      rating: 5,
      image: "👩"
    }
  ];

  // Partners
  const partners = [
    { id: 1, name: "City Hospital", logo: "🏥" },
    { id: 2, name: "Glow Salon", logo: "💇" },
    { id: 3, name: "LegalAid", logo: "⚖️" },
    { id: 4, name: "FitLife Gym", logo: "💪" },
    { id: 5, name: "Smile Dental", logo: "🦷" },
    { id: 6, name: "TechSolutions", logo: "💻" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              About <span className="text-yellow-300">AppointBook</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
              We're on a mission to make appointment booking simple, fast, and hassle-free for everyone
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-lg">
                <div className="text-3xl font-bold text-neutral-950 ">{counts.clients.toLocaleString()}+</div>
                <div className="text-sm opacity-80 text-neutral-950">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-lg">
                <div className="text-3xl font-bold text-neutral-950">{counts.appointments.toLocaleString()}+</div>
                <div className="text-sm opacity-80 text-neutral-950">Appointments</div>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-lg">
                <div className="text-3xl font-bold text-neutral-950 text-neutral-950">{counts.providers}+</div>
                <div className="text-sm opacity-80 text-neutral-950">Service Providers</div>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-lg">
                <div className="text-3xl font-bold text-neutral-950">{counts.years}+</div>
                <div className="text-sm text-neutral-950 opacity-80">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Story</span>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
           AppointBook was born in 2026 from a simple idea by Filza Jameel: booking appointments shouldn't be complicated. What began as her personal vision quickly became a mission to make connecting with trusted service providers effortless for everyone.
            </p>

            
            <p className="text-lg text-gray-600 mb-4">
              Today, AppointBook helps thousands of users book appointments across healthcare, beauty, legal, fitness, and more. We combine smart technology with a clean, friendly design — because every booking should feel smooth, not stressful.
            </p>


            <p className="text-lg text-gray-600 mb-6">
             This is Filza Jameel’s idea. Her heart. And we're just getting started.
            </p>
           
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <span className="text-green-500 text-xl mr-2">✓</span>
                <span className="text-gray-600">ISO Certified</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-xl mr-2">✓</span>
                <span className="text-gray-600">Secure Platform</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-xl mr-2">✓</span>
                <span className="text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-8xl mb-4 text-center">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
              <p className="text-center mb-6">
                "To simplify appointment booking and connect people with the services they need, 
                when they need them."
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Mission/Vision Tabs */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-8 py-3 rounded-full font-semibold transition ${
                  activeTab === 'mission'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-8 py-3 rounded-full font-semibold transition ${
                  activeTab === 'vision'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Our Vision
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            {activeTab === 'mission' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    To provide a seamless, efficient, and user-friendly platform that connects 
                    customers with trusted service providers, making appointment booking as 
                    simple as a few clicks.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Simplify appointment booking for everyone</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Empower service providers with digital tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Ensure reliability and trust in every booking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Provide 24/7 accessibility to appointments</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-9xl mb-4">🎯</div>
                  <p className="text-gray-600 italic">
                    "Making every booking a success story"
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 text-center">
                  <div className="text-9xl mb-4">🌟</div>
                  <p className="text-gray-600 italic">
                    "The future of appointment booking"
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600 mb-4">
                    To become the world's most trusted and widely used appointment booking 
                    platform, serving millions of customers across the globe and transforming 
                    how people access services.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Global presence in 50+ countries</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Serve 1 million+ customers annually</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Partner with 10,000+ service providers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 text-xl mr-3">✓</span>
                      <span>Revolutionize service accessibility worldwide</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Core <span className="text-blue-600">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition group border border-gray-100"
            >
              <div className={`w-20 h-20 bg-${value.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition text-4xl`}>
                {value.icon}
              </div>
              <h3 className={`text-2xl font-bold text-${value.color}-600 mb-3`}>
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate people dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
              >
                <div className={`h-48 bg-gradient-to-br from-${member.color}-500 to-${member.color}-600 flex items-center justify-center relative`}>
                  <span className="text-8xl transform group-hover:scale-110 transition">
                    {member.image}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className={`text-${member.color}-600 font-semibold mb-3`}>{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.565-3.657 13.94 13.94 0 001.543-6.049c0-.209-.005-.418-.015-.627A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-green-600 transition">
                      <span className="sr-only">Email</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Key milestones that shaped our story
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-600 hidden md:block"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl">{milestone.icon}</span>
                      <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                {/* Empty space for alignment */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Trusted <span className="text-blue-600">Partners</span>
            </h2>
            <p className="text-xl text-gray-600">
              Collaborating with the best in the industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition">
                  {partner.logo}
                </div>
                <p className="font-semibold text-gray-700">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What People <span className="text-blue-600">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-6xl text-gray-200 opacity-50">"</div>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 italic">{testimonial.content}</p>
              
              <div className="flex text-yellow-400">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience the easiest way to book appointments. Join thousands of happy customers today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Book Appointment Now
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Explore Services
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🔒</span>
              <span className="text-sm">SSL Secure</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">💰</span>
              <span className="text-sm">Money-back Guarantee</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">⭐</span>
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌍</span>
              <span className="text-sm">Global Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}