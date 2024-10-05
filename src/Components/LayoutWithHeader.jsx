import React from 'react';
import Header from '@/Components/private/Header';
import Footer from '@/Components/public/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const LayoutWithHeader = () => {
  const location = useLocation();

  const hideHeaderPaths = ['/', '/home'];

  return (
    <div>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <div className="flex flex-col gap-42px">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutWithHeader;
