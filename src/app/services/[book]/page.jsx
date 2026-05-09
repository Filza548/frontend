'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabse.js';  // 🔴 Import supabase

// Import your form components
import DoctorBookingComponent from "@/app/doctorbookingform/DoctorBookingComponent"
import SalonComponentForm from "@/app/salonspa/SalonComponentForm";
import BridalFormComponent from "@/app/bridalform/BridalFormComponent";
import BusinessConsultationComponent from "@/app/businessconsultationform/BusinessConsultationComponent";
import DentalFormComponent from "@/app/dentalform/DentalFormComponent";
import LegalFormComponent from "@/app/legalconsultationform/LegalFormComponent";
import WebDevProjectForm from "@/app/webdevform/WebDevProjectForm.jsx";
import PersonalTrainingForm from "@/app/personaltrainingform/PersonalTrainingForm.jsx";
import YogaMeditationFormComponent from "@/app/yogameditationform/YogaMeditationFormComponent.jsx";
import Plumbingformcomponent from "@/app/plumbingform/Plumbingformcomponent.jsx";
import Homecleaningform from "@/app/homecleaningform/Homecleaningform.jsx";



export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const { book } = params;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 🔴 CHECK IF USER IS LOGGED IN
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Not logged in - redirect to signup
        router.push(`/auth/signup?returnUrl=/services/${book}`);
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [book, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {book === "doctor-consultation" && <DoctorBookingComponent/>}
        {book === "salon-spa" && <SalonComponentForm/>}
        {book === "makeup-bridal" && <BridalFormComponent/>}
        {book === "dental-care" && <DentalFormComponent/>}
        {book === "legal-consultation" && <LegalFormComponent/>}
        {book === "personal-training" && <PersonalTrainingForm/>}
        {book === "business-consulting" && <BusinessConsultationComponent/>}
        {book === "web-development" && <WebDevProjectForm/>}
        {book === "personal-training" && <PersonalTrainingForm/>}
        {book === "yoga-meditation" && <YogaMeditationFormComponent/>}
        {book === "home-cleaning" && <Homecleaningform/>}
        {book === "plumbing-services" && <Plumbingformcomponent />}
      </div>
    </div>
  );
}