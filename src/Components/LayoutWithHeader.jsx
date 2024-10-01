// src/Components/LayoutWithHeader.jsx
import React from 'react';
import Header from '@/Components/private/Header';
import Footer from '@/Components/public/Footer';
import { Outlet } from 'react-router-dom';

const LayoutWithHeader = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-42px">
        <Outlet /> {/* This will render the matching child route */}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutWithHeader;
