'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabse.js';  // 🔴 Import supabase

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);  // 🔴 User state
  const [showDropdown, setShowDropdown] = useState(false);  // 🔴 Dropdown state

  // 🔴 Check if user is logged in
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      router.refresh();
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  // 🔴 Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
    alert('✅ Logged out successfully!');
    router.push('/');
  };

  const handleNavigation = (routerName) => {
    router.push(routerName);
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AB</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Appoint<span className="text-blue-600">Book</span></span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-blue-600 transition">Home</button>
              </Link>
             
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 transition">About</button>
              </Link>

              <Link href="/services" className="text-gray-600 hover:text-blue-600 transition">
                <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-blue-600 transition">Services</button>
              </Link>

              <Link href="/howitworks" className="text-gray-600 hover:text-blue-600 transition">
                <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-blue-600 transition">How It Works</button>
              </Link>

              <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 transition">Contact</button>
              </Link>

              {/* 🔴 BOOK NOW BUTTON - With auth check */}
              <button
                onClick={async () => {
                  const { data: { user } } = await supabase.auth.getUser();
                  if (user) {
                    router.push('/services');
                  } else {
                    router.push('/auth/signup?returnUrl=/services');
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>

              {/* 🔴 AUTH BUTTONS - Login/Signup or User Profile */}
              {user ? (
                // User is logged in - Show profile dropdown
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <span className="text-gray-700">👤 {user.email?.split('@')[0]}</span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-10">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm text-gray-500 border-b">
                          {user.email}
                        </div>
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            router.push('/my-bookings');
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        >
                          📅 My Bookings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // User not logged in - Show Login and Signup buttons
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600">Home</button>
              <button onClick={() => handleNavigation('/services')} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600">Services</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600">How It Works</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600">About</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600">Contact</button>
              
              {/* 🔴 MOBILE BOOK NOW BUTTON */}
              <button
                onClick={async () => {
                  const { data: { user } } = await supabase.auth.getUser();
                  if (user) {
                    router.push('/services');
                  } else {
                    router.push('/auth/signup?returnUrl=/services');
                  }
                  setMobileMenuOpen(false);
                }}
                className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Book Now
              </button>

              {/* 🔴 MOBILE AUTH BUTTONS */}
              {user ? (
                <>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-sm text-gray-500 px-2 py-1">{user.email}</p>
                    <button
                      onClick={() => {
                        handleNavigation('/my-bookings');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-gray-600 hover:text-blue-600"
                    >
                      📅 My Bookings
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar