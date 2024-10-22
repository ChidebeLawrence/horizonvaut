import React, { useState } from 'react';

const AccountSetup = ({ onSetupComplete }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSetup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const setupPayload = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      country: userDetails.country,
    };

    try {
      const response = await fetch("https://api.horizonvaut.com/auth/account-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setupPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account setup completed successfully.");
        onSetupComplete(); // Optionally redirect to dashboard or next page
      } else {
        setError(data.message || "Setup failed. Please try again.");
      }
    } catch (error) {
      setError("Setup failed. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Account Setup</h2>
      <form onSubmit={handleSetup}>
        <input
          type="text"
          placeholder="First Name"
          value={userDetails.firstName}
          onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={userDetails.lastName}
          onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={userDetails.country}
          onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Setting Up...' : 'Complete Setup'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AccountSetup;
