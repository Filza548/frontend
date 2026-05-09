// frontend/app/how-it-works/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Auto-play video simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Steps data
  const steps = [
    {
      id: 1,
      title: "Choose Your Service",
      description: "Browse through our wide range of professional services and select the one that best fits your needs.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "blue",
      details: [
        "Browse categories (Medical, Beauty, Professional, etc.)",
        "Read service descriptions and pricing",
        "Check availability and reviews",
        "Compare different providers"
      ],
      image: "🔍",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Pick Date & Time",
      description: "Select your preferred date and time slot that works best for your schedule.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "green",
      details: [
        "View real-time availability",
        "Choose from multiple time slots",
        "Select date from interactive calendar",
        "Get instant confirmation"
      ],
      image: "📅",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      id: 3,
      title: "Confirm & Book",
      description: "Fill in your details and confirm your appointment instantly.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "purple",
      details: [
        "Fill in your contact information",
        "Add special requests or notes",
        "Review booking summary",
        "Receive instant confirmation via SMS/Email"
      ],
      image: "✅",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200"
    }
  ];

  // Benefits data
  const benefits = [
    {
      id: 1,
      title: "Save Time",
      description: "Book appointments in minutes, not hours",
      icon: "⏱️",
      color: "blue"
    },
    {
      id: 2,
      title: "24/7 Availability",
      description: "Book anytime, anywhere",
      icon: "🌙",
      color: "green"
    },
    {
      id: 3,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation",
      icon: "✓",
      color: "purple"
    },
    {
      id: 4,
      title: "Easy Management",
      description: "Modify or cancel bookings easily",
      icon: "⚙️",
      color: "orange"
    },
    {
      id: 5,
      title: "Secure Platform",
      description: "Your data is safe with us",
      icon: "🔒",
      color: "red"
    },
    {
      id: 6,
      title: "Best Prices",
      description: "Competitive rates guaranteed",
      icon: "💰",
      color: "yellow"
    }
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I book an appointment?",
      answer: "Simply choose your service, select a convenient date and time, fill in your details, and confirm. You'll receive an instant confirmation via SMS and email.",
      category: "booking"
    },
    {
      id: 2,
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule your appointment up to 24 hours before the scheduled time through your account dashboard or by contacting our support team.",
      category: "modification"
    },
    {
      id: 3,
      question: "Is there a cancellation fee?",
      answer: "Cancellations made 24 hours before the appointment are free. Late cancellations may incur a small fee depending on the service provider's policy.",
      category: "cancellation"
    },
    {
      id: 4,
      question: "How will I receive confirmation?",
      answer: "You'll receive confirmation via both SMS and email immediately after booking. You'll also get reminders before your appointment.",
      category: "communication"
    },
    {
      id: 5,
      question: "What if I'm late for my appointment?",
      answer: "Please try to arrive on time. If you're running late, contact the service provider directly. Late arrivals may result in shortened appointment time.",
      category: "attendance"
    },
    {
      id: 6,
      question: "Can I book for someone else?",
      answer: "Yes, you can book appointments for family members or friends. Just provide their details in the booking form.",
      category: "general"
    }
  ];

  // Stats data
  const stats = [
    { id: 1, value: "50K+", label: "Happy Customers", icon: "😊" },
    { id: 2, value: "100K+", label: "Appointments", icon: "📅" },
    { id: 3, value: "500+", label: "Service Providers", icon: "👥" },
    { id: 4, value: "24/7", label: "Support Available", icon: "🕐" }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Regular Client",
      content: "The booking process is so smooth! I booked my doctor's appointment in just 2 minutes. Highly recommended!",
      rating: 5,
      image: "👩"
    },
    {
      id: 2,
      name: "Usman Khan",
      role: "First Time User",
      content: "I was skeptical at first, but the step-by-step guide made it super easy. Great experience!",
      rating: 5,
      image: "👨"
    },
    {
      id: 3,
      name: "Fatima Raza",
      role: "Business Owner",
      content: "Perfect for my busy schedule. I can book appointments anytime, anywhere. Life saver!",
      rating: 5,
      image: "👩‍💼"
    }
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              How It <span className="text-yellow-300">Works</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
              Book your appointment in three simple steps. It's easy, fast, and hassle-free!
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center p-4 bg-blue-900 bg-opacity-10 rounded-lg backdrop-blur-lg">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
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

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Simple <span className="text-blue-600">3-Step</span> Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your appointment booked in minutes with our streamlined process
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 hidden md:block">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(activeStep / 3) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative group cursor-pointer`}
                onMouseEnter={() => setActiveStep(step.id)}
              >
                {/* Step Number */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-xl font-bold z-10 border-4 ${
                  activeStep === step.id ? step.borderColor : 'border-gray-200'
                }`}>
                  {step.id}
                </div>

                {/* Step Card */}
                <div className={`mt-8 p-8 rounded-2xl transition-all duration-300 ${
                  activeStep === step.id 
                    ? `${step.bgColor} shadow-xl scale-105 border-2 ${step.borderColor}` 
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}>
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${
                    activeStep === step.id ? step.bgColor : 'bg-gray-100'
                  }`}>
                    {step.image}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold text-center mb-4 ${
                    activeStep === step.id ? step.textColor : 'text-gray-800'
                  }`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-3">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <svg className={`w-5 h-5 ${step.textColor} mr-2 flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video/Demo Section */}
        <div ref={ref} className={`mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Video Preview */}
            <div className="relative h-64 md:h-auto bg-black flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">🎥</div>
                <p className="text-white text-xl">Watch How It Works</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition flex items-center mx-auto">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play Demo
                </button>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>

            {/* Steps Summary */}
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Overview</h3>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl`}>
                      {step.id}
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-300">{step.description.substring(0, 60)}...</p>
                    </div>
                    <div className="text-3xl ml-auto">{step.image}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="/services"
                className="mt-8 inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Start Booking Now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-blue-600">Our Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the benefits of smart appointment booking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group"
              >
                <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition text-3xl`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-bold text-${benefit.color}-600 mb-2`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <summary className="flex justify-between items-center cursor-pointer p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-blue-600 group-open:rotate-180 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-yellow-300">Users Say</span>
            </h2>
            <p className="text-xl opacity-90">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-20 transition"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm opacity-80">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mb-4 italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-300">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of happy customers who book their appointments with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Book Appointment Now
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Browse Services
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🔒</span>
              <span className="text-sm">Secure Booking</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              <span className="text-sm">Instant Confirmation</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🔄</span>
              <span className="text-sm">Free Cancellation</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">💬</span>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Quick Booking */}
      <Link
        href="/book"
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110 z-50 group"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Quick Book
        </span>
      </Link>
    </div>
  );
}