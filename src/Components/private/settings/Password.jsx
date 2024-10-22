import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState(''); // State for new password
  const [otp, setOtp] = useState(''); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to check if OTP is sent
  const navigate = useNavigate();

  // Assuming userDetails contains the user's email
  const userDetails = {
    email: 'johndoe@gmail.com', // Replace with the actual stored email
  };

  const sendOtp = async () => {
    setLoading(true);
    const email = userDetails.email; // Get email from userDetails

    try {
      const response = await fetch('https://api.horizonvaut.com/auth/send-otp', { // Use the correct endpoint for sending OTP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email to request OTP
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP sent to your email successfully!');
        setIsOtpSent(true); // Set state indicating OTP has been sent
      } else {
        setMessage(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setMessage('An error occurred while sending OTP.');
    }

    setLoading(false);
  };

  const updatePassword = async () => {
    setLoading(true);
    const email = userDetails.email; // Get email from userDetails

    try {
      const response = await fetch('https://api.horizonvaut.com/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, otp }), // Send email, password, and OTP
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password updated successfully!');
        // Optionally navigate to a different page or show a success message
        navigate('/signin'); // Redirect to sign in after successful password update
      } else {
        setMessage(data.message || 'Failed to update password.');
      }
    } catch (error) {
      setMessage('An error occurred while updating the password.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Update Password</h2>

      {!isOtpSent ? (
        <div>
          <button onClick={sendOtp} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button onClick={updatePassword} disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
