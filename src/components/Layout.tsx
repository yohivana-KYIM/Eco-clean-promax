import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-eco-green-50 via-white to-eco-green-50/30 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-eco-green-50/20 to-transparent -z-10" />
      
      {/* Content */}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 