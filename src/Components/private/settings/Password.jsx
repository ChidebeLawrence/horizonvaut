import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Index from "./Index";
import SubHeaderTwo from "@/Utilities/SubHeaderTwo";
import { ClipLoader } from 'react-spinners';

function AccountSettings() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#52C050" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const security = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2385 2.60182L6.41685 4.79515C5.07518 5.29682 3.97852 6.88348 3.97852 8.30682V16.9752C3.97852 18.3518 4.88852 20.1602 5.99685 20.9885L11.0135 24.7335C12.6585 25.9702 15.3652 25.9702 17.0102 24.7335L22.0268 20.9885C23.1352 20.1602 24.0452 18.3518 24.0452 16.9752V8.30682C24.0452 6.87182 22.9485 5.28515 21.6069 4.78348L15.7852 2.60182C14.7935 2.24015 13.2068 2.24015 12.2385 2.60182Z" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M14.0001 14.5832C15.2887 14.5832 16.3334 13.5385 16.3334 12.2498C16.3334 10.9612 15.2887 9.9165 14.0001 9.9165C12.7114 9.9165 11.6667 10.9612 11.6667 12.2498C11.6667 13.5385 12.7114 14.5832 14.0001 14.5832Z" stroke="#191D31" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M14 14.5835V18.0835" stroke="#191D31" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const key = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4915 12.4421C14.7748 14.1504 12.3165 14.6754 10.1581 14.0004L6.23313 17.9171C5.9498 18.2088 5.39146 18.3838 4.99146 18.3254L3.1748 18.0754C2.5748 17.9921 2.01646 17.4254 1.9248 16.8254L1.6748 15.0088C1.61646 14.6088 1.80813 14.0504 2.08313 13.7671L5.9998 9.85042C5.33313 7.68376 5.8498 5.22542 7.56646 3.51709C10.0248 1.05876 14.0165 1.05876 16.4831 3.51709C18.9498 5.97542 18.9498 9.98376 16.4915 12.4421Z" stroke="white" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M5.74146 14.5752L7.65812 16.4919" stroke="white" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12.0833 9.1665C12.7736 9.1665 13.3333 8.60686 13.3333 7.9165C13.3333 7.22615 12.7736 6.6665 12.0833 6.6665C11.3929 6.6665 10.8333 7.22615 10.8333 7.9165C10.8333 8.60686 11.3929 9.1665 12.0833 9.1665Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const lock = <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 8.33317V6.6665C5.5 3.90817 6.33333 1.6665 10.5 1.6665C14.6667 1.6665 15.5 3.90817 15.5 6.6665V8.33317" stroke="#667085" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.5 15.4167C11.6506 15.4167 12.5833 14.4839 12.5833 13.3333C12.5833 12.1827 11.6506 11.25 10.5 11.25C9.34937 11.25 8.41663 12.1827 8.41663 13.3333C8.41663 14.4839 9.34937 15.4167 10.5 15.4167Z" stroke="#667085" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M14.6666 18.3335H6.33329C2.99996 18.3335 2.16663 17.5002 2.16663 14.1668V12.5002C2.16663 9.16683 2.99996 8.3335 6.33329 8.3335H14.6666C18 8.3335 18.8333 9.16683 18.8333 12.5002V14.1668C18.8333 17.5002 18 18.3335 14.6666 18.3335Z" stroke="#667085" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!validatePassword(newPassword)) {
            setMessage("Password must be at least 8 characters long.");
            setMessageColor('orange');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            setMessageColor('orange');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://api.horizonvaut.com/auth/update-password', {
                new_password: newPassword
            });

            if (response.data.success) {
                setMessageColor('limegreen');
                setMessage("Password changed successfully!");
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessageColor('orangered');
                setMessage("An error occurred. Please try again.");
            }

            console.log(response.data);

        } catch (error) {
            setMessageColor('orangered');
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mb-[15rem]'>
            <SubHeaderTwo icon={icon} header="Account password" content="Login password is used to log in to your account" />
            <Index />
            <div className={classNames(
                'bg-white text-[#78778B] m-[20px] py-4 px-[40px] flex flex-col gap-[20px] rounded-md',
                "smLg:flex-row",
                'text-[#78778B] lg:mx-[55px] lg:mb-[50px] lg:py-6 lg:px-[40px] lg:flex-row lg:items-start lg:justify-between',
            )}>
                <div className='flex items-center gap-[20px] smLg:w-[50%] lg:w-full lg:w-[50%]'>
                    <p>{security}</p>
                    <div>
                        <p className='text-[20px] text-black font-semibold'>Change password</p>
                        <p className='text-[12px]'>Contains at least 8 characters, one number and one symbol</p>
                    </div>
                </div>

                <div className='smLg:w-[50%] flex-col lg:w-[65%] flex justify-between gap-[16px]'>
                    <form onSubmit={handleChangePassword} className='flex justify-between gap-[16px]'>
                        <p className='relative w-full lg:w-1/3'>
                            <input
                                type='password'
                                placeholder='Enter new password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='w-full py-[13px] pl-[35px] pr-[20px] focus:outline-[#825fe9] border border-[#e5e8eb] rounded-md text-black'
                                required
                            />
                            <p className='absolute top-[10px] left-[8px]'>{lock}</p>
                        </p>
                        
                        <p className='relative w-full lg:w-1/3'>
                            <input
                                type='password'
                                placeholder='Repeat new password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full py-[13px] pl-[35px] pr-[20px] focus:outline-[#825fe9] border border-[#e5e8eb] rounded-md text-black'
                                required
                            />
                        </p>

                        <button
                            className={`w-full py-[14px] lg:w-1/3 bg-[#825fe9] text-white text-[14px] rounded-md flex items-center justify-center gap-[5px] ${loading ? 'opacity-50 cursor-default' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex justify-center items-center gap-[7px]'>
                                    Change password
                                    <ClipLoader color={"#ffffff"} loading={loading} size={20} />
                                </div>
                            ) : (
                                "Change password"
                            )}
                        </button>
                    </form>
                    {message && <p style={{ color: messageColor }}>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
