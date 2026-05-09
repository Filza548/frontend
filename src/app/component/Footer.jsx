// import React from 'react'
"use client"
import { useRouter } from 'next/navigation';

const Footer = () => {
   const router = useRouter();


  const handleNavigation = (routerName) => {
    router.push(routerName);
  }
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">AppointBook</h3>
              <p className="text-sm">Your trusted partner for hassle-free appointment booking.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('/')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => handleNavigation('/services')} className="hover:text-white">Services</button></li>
                <li><button onClick={() => handleNavigation('/about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => handleNavigation('/howitworks')} className="hover:text-white">How It Works</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>Doctor, Dental Care Consultation.</li>
                <li>Salon & Spa, Makeup & Bridal.</li>
                <li>Legal, Business Consulting.</li>
                <li>Personal Training, Yoga & Meditation.</li>
                <li>Web Development, Home Cleaning.</li>
                <li>Plumbing Services.</li>
               
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                  <span className="text-white">f</span>
                </a>
                <a href="https://twitter.com/login" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                  <span className="text-white">t</span>
                </a>
                <a href="https://www.linkedin.com/login" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                  <span className="text-white">in</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 AppointBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
