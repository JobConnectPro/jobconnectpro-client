import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Hero from '@/components/homepage/Hero';
import ForJobseeker from '@/components/homepage/ForJobSeeker';
import TopCompanies from '@/components/homepage/TopCompanies';
import ForEmployer from '@/components/homepage/ForEmployer';
import Footer from '@/components/homepage/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <ForJobseeker />
      <TopCompanies />
      <ForEmployer />
      <Footer />
    </div>
  );
}
