// frontend/app/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function HomePage() {
  // const router = useRouter();


  // const handleNavigation = (routerName) => {
  //   router.push(routerName);
  // }
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
    {/*The navigation bar that we here , i have ceated it in a compoenent, and then i called it in the layout.js file */}

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold g mb-6 animate-fade-in">
              Book Your Appointment <br />
              <span className="text-yellow-300">In Seconds</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional, Fast, and Reliable Appointment Booking System for All Your Needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services" 
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
              >
                Book Appointment Now
              </Link>
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-lg">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1000+</div>
                <div className="text-lg">Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-lg">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Choose from a wide range of professional services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:scale-110 transition duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Doctor Consultation</h3>
                <p className="text-gray-600 mb-4">Book appointments with top medical professionals and specialists.</p>
                <Link href="/services" className="text-blue-600 font-semibold hover:text-blue-800">Book Now →</Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 bg-green-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 group-hover:scale-110 transition duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Salon & Spa</h3>
                <p className="text-gray-600 mb-4">Pamper yourself with our premium salon and spa services.</p>
                <Link href="/services" className="text-green-600 font-semibold hover:text-green-800">Book Now →</Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 bg-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 group-hover:scale-110 transition duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Legal Consultation</h3>
                <p className="text-gray-600 mb-4">Expert legal advice from experienced lawyers and consultants.</p>
                <Link href="/services" className="text-purple-600 font-semibold hover:text-purple-800">Book Now →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Book your appointment in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Service</h3>
              <p className="text-gray-600">Select the service you need from our wide range of options</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pick Date & Time</h3>
              <p className="text-gray-600">Select your preferred date and time slot that works for you</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Booking</h3>
              <p className="text-gray-600">Fill in your details and confirm your appointment instantly</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link 
              href="/book" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are dedicated to providing the best appointment booking experience for our clients. 
                Our platform makes it easy to schedule appointments with top professionals in various fields.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With our user-friendly interface and 24/7 availability, you can book appointments anytime, 
                anywhere. We ensure that your time is valued and your needs are met with professionalism.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <p className="text-gray-600"><span className="font-bold text-blue-600">500+</span> Happy Clients</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 rounded-lg p-6 text-white">
                <div className="text-3xl font-bold mb-2">5+</div>
                <div>Years Experience</div>
              </div>
              <div className="bg-green-600 rounded-lg p-6 text-white">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div>Expert Staff</div>
              </div>
              <div className="bg-purple-600 rounded-lg p-6 text-white">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div>Satisfaction</div>
              </div>
              <div className="bg-yellow-500 rounded-lg p-6 text-white">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div>Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Hear from our satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Sarah Khan</h4>
                  <p className="text-gray-600 text-sm">Regular Client</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Excellent service! The booking process was smooth and hassle-free. Highly recommended!"</p>
              <div className="flex text-yellow-400">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Ahmed Raza</h4>
                  <p className="text-gray-600 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Very professional platform. Saved me so much time. Will definitely use again!"</p>
              <div className="flex text-yellow-400">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-gray-800">Fatima Ali</h4>
                  <p className="text-gray-600 text-sm">First Time User</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Amazing experience! The interface is so user-friendly. Highly recommended!"</p>
              <div className="flex text-yellow-400">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-300 mb-6">
                Have questions? We're here to help 24/7. Contact us anytime!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <p className="font-semibold">+92 300 1234567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <p className="font-semibold">info@appointbook.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Address</p>
                    <p className="font-semibold">123 Main Street, Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Booking Form */}
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">How to Book Your Appointment?</h3>




              <h3 className="text-2xl font-bold mb-6">🎯 Available Services:**</h3>
              <p className="text-gray-300 mb-6 ">  
Medical • Beauty • Legal • Business • Fitness • Home Services</p>

<br/>

              <h3 className="text-2xl font-bold mb-6">**✨ Quick Steps:**</h3>
 <p className="text-gray-300 mb-6 ">  
→ Browse our Services section
→ Choose your preferred service  
→ Click "Book Now" button
→ Create your free account
→ Complete the simple form
→ Get instant confirmation!
</p>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        {/* The footer is also created in a component and then i called it in the layout.js file */}
    </div>
  );
}