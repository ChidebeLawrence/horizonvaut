import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import "@/App.css";
import LayoutWithHeader from '@/Components/LayoutWithHeader';
import Section from '@/Components/private/Section';
import Deposit from '@/Components/private/pages/Deposit';
import Withdraw from '@/Components/private/pages/Withdraw';
import Transfer from '@/Components/private/pages/Transfer';
import History from '@/Components/private/pages/History';
import SpotTrading from '@/Components/private/pages/SpotTrading';
import Support from '@/Components/private/pages/Support';
import AccountSettings from '@/Components/private/settings/AccountSettings';
import Password from '@/Components/private/settings/Password';
import Auth from '@/Components/private/settings/Auth';
import Verification from '@/Components/private/settings/Verification';
import Affiliate from '@/Components/private/settings/Affiliate';
import Api from '@/Components/private/settings/Api';
import Promo from '@/Components/private/settings/Promo';
import UpgardeVerification from '@/Components/private/settings/UpgardeVerification';
import CardWithdrawal from '@/Components/private/pages/CardWithdrawal';
import Index from "@/Components/public/index"
import Signin from './Components/public/Signin';
import Signup from './Components/public/Signup';
import ForgotPassword from './Components/public/ForgotPassword';
import AuthRoute from './Components/private/AuthRoute';
import ProtectedRoute from './Components/private/ProtectedRoute';

function App() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/profile/wallet': 'Wallet overview',
      '/profile/support': 'Customer support chat',
      '/profile/deposit': 'Deposit coins',
      '/profile/withdraw': 'Withdraw',
      '/profile/withdraw-usdt': 'Withdraw USDT',
      '/profile/transfer': 'Transfer',
      '/profile/history': 'Transaction history',
      '/trading': 'Trading platform',
      '/profile/settings': 'Account Settings',
      '/profile/change-password': 'Change Password',
      '/profile/2fa-security': '2FA Setup',
      '/profile/verification': 'KYC Verification',
      '/profile/verification-2lvl': 'KYC Verification - LVL2',
      '/profile/affiliate': 'Affiliate Program',
      '/profile/api': 'API Management',
      '/profile/promo-codes': 'Activate Gift codes',
    };

    document.title = titles[location.pathname] || 'Bomib.com';
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><LayoutWithHeader /></ProtectedRoute>}>
        <Route path="/profile">
        <Route path="support" element={<Support />} />
          <Route path="wallet" element={<Section />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="withdraw-usdt" element={<CardWithdrawal />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="change-password" element={<Password />} />
          <Route path="2fa-security" element={<Auth />} />
          <Route path="verification" element={<Verification />} />
          <Route path="verification-2lvl" element={<UpgardeVerification />} />
          <Route path="affiliate" element={<Affiliate />} />
          <Route path="api" element={<Api />} />
          <Route path="promo-codes" element={<Promo />} />
        </Route>
        <Route path="/trading" element={<SpotTrading />} />
      </Route>
      <Route path='/' element={<Index />}>
        <Route path="signin" element={<AuthRoute><Signin /></AuthRoute>} />
        <Route path="signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
