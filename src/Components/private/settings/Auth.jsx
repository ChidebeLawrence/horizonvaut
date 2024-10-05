import React, { useState, useRef } from 'react'
import Index from './Index'
import { Link } from 'react-router-dom'
import Info from '@/assets/images/info.svg'
import SubHeaderTwo from '../../../Utilities/SubHeaderTwo'
import { QRCode } from 'antd'

function Auth() {
    const inputRefs = useRef([]);

    const qrCodeValue = "KZZJE4OFFREGNMVE";

    const handleInputChange = (e, index) => {
        const { value } = e.target;

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !e.target.value) {
            inputRefs.current[index - 1].focus();
        }
    };

    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#3ED7D7" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const warning = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5099 5.85L13.5699 2.42C12.5999 1.86 11.3999 1.86 10.4199 2.42L4.48992 5.85C3.51992 6.41 2.91992 7.45 2.91992 8.58V15.42C2.91992 16.54 3.51992 17.58 4.48992 18.15L10.4299 21.58C11.3999 22.14 12.5999 22.14 13.5799 21.58L19.5199 18.15C20.4899 17.59 21.0899 16.55 21.0899 15.42V8.58C21.0799 7.45 20.4799 6.42 19.5099 5.85ZM11.2499 7.75C11.2499 7.34 11.5899 7 11.9999 7C12.4099 7 12.7499 7.34 12.7499 7.75V13C12.7499 13.41 12.4099 13.75 11.9999 13.75C11.5899 13.75 11.2499 13.41 11.2499 13V7.75ZM12.9199 16.63C12.8699 16.75 12.7999 16.86 12.7099 16.96C12.5199 17.15 12.2699 17.25 11.9999 17.25C11.8699 17.25 11.7399 17.22 11.6199 17.17C11.4899 17.12 11.3899 17.05 11.2899 16.96C11.1999 16.86 11.1299 16.75 11.0699 16.63C11.0199 16.51 10.9999 16.38 10.9999 16.25C10.9999 15.99 11.0999 15.73 11.2899 15.54C11.3899 15.45 11.4899 15.38 11.6199 15.33C11.9899 15.17 12.4299 15.26 12.7099 15.54C12.7999 15.64 12.8699 15.74 12.9199 15.87C12.9699 15.99 12.9999 16.12 12.9999 16.25C12.9999 16.38 12.9699 16.51 12.9199 16.63Z" fill="#EB6A6A"></path>
    </svg>

    const download = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.1802 10.3823C23.3802 10.744 25.0952 12.9023 25.0952 17.6273V17.779C25.0952 22.994 23.0069 25.0823 17.7919 25.0823H10.1969C4.98189 25.0823 2.89355 22.994 2.89355 17.779V17.6273C2.89355 12.9373 4.58522 10.779 8.71522 10.394" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M14 2.33203V17.3587" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17.909 14.7573L14.0006 18.6657L10.0923 14.7573" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const scan = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.33301 10.5007V7.58398C2.33301 4.67898 4.67801 2.33398 7.58301 2.33398H10.4997" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17.5 2.33398H20.4167C23.3217 2.33398 25.6667 4.67898 25.6667 7.58398V10.5007" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M25.667 18.666V20.416C25.667 23.321 23.322 25.666 20.417 25.666H18.667" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.4997 25.6667H7.58301C4.67801 25.6667 2.33301 23.3217 2.33301 20.4167V17.5" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M19.8337 11.084V16.9173C19.8337 19.2507 18.667 20.4173 16.3337 20.4173H11.667C9.33366 20.4173 8.16699 19.2507 8.16699 16.9173V11.084C8.16699 8.75065 9.33366 7.58398 11.667 7.58398H16.3337C18.667 7.58398 19.8337 8.75065 19.8337 11.084Z" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M22.1663 14H5.83301" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const verify = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5414 2.86C13.3464 2.17167 14.6647 2.17167 15.4814 2.86L17.3247 4.44667C17.6747 4.75 18.328 4.995 18.7947 4.995H20.778C22.0147 4.995 23.0297 6.01 23.0297 7.24667V9.23C23.0297 9.685 23.2747 10.35 23.578 10.7L25.1647 12.5433C25.853 13.3483 25.853 14.6667 25.1647 15.4833L23.578 17.3267C23.2747 17.6767 23.0297 18.33 23.0297 18.7967V20.78C23.0297 22.0167 22.0147 23.0317 20.778 23.0317H18.7947C18.3397 23.0317 17.6747 23.2767 17.3247 23.58L15.4814 25.1667C14.6764 25.855 13.358 25.855 12.5414 25.1667L10.698 23.58C10.348 23.2767 9.6947 23.0317 9.22803 23.0317H7.2097C5.97303 23.0317 4.95803 22.0167 4.95803 20.78V18.785C4.95803 18.33 4.71303 17.6767 4.42137 17.3267L2.84637 15.4717C2.1697 14.6667 2.1697 13.36 2.84637 12.555L4.42137 10.7C4.71303 10.35 4.95803 9.69667 4.95803 9.24167V7.235C4.95803 5.99833 5.97303 4.98333 7.2097 4.98333H9.22803C9.68303 4.98333 10.348 4.73833 10.698 4.435L12.5414 2.86Z" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.77637 14.002L12.588 16.8254L18.223 11.1787" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    return (
        <div>
            <SubHeaderTwo icon={icon} header="Setup 2FA authentication" content="Protect your account and transactions" />

            <Index />

            <div className='bg-white m-[20px] p-[20px] lg:py-6 lg:mx-[55px] lg:px-[40px] text-[#78778b]'>
                <p className='bg-[#FFEDED] border border-[#FFB5B5] text-[#924B4B] flex gap-[10px] items-center py-[7px] px-[20px] rounded-md'>
                    {warning}
                    Two-factor authentication is currently disabled
                </p>

                <div className='flex flex-col lg:flex-row items-center justify-between'>
                    <div className='w-full'>
                        <div className='flex flex-wrap items-center gap-[20px] py-[30px]'>
                            {download}
                            <div>
                                <p className='text-[20px] text-black font-semibold'>Step 1: Download an authenticator app</p>
                                <p>Download and install any authenticator app, eg. <Link to='#' className='text-[#754FE1]'>Google Authenticator</Link></p>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center gap-[20px] py-[20px]'>
                            {scan}
                            <div>
                                <p className='text-[20px] text-black font-semibold'>Step 2: Scan the QR code</p>
                                <p>Open the authenticator app and scan the image using your phone’s camera</p>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center gap-[20px] py-[20px]'>
                            {verify}
                            <div>
                                <p className='text-[20px] text-black font-semibold'>Step 3: Verify your code</p>
                                <p>Enter the 6-digit verification code generated</p>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-start space-x-2 lg:ml-[50px]">
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-[40px] h-[40px] text-center border border-[#dadada] bg-[#f8fafc] rounded-md"
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <QRCode value={qrCodeValue} size="197" />
                        <p className='border border-[#DADADA] bg-[#F8FAFC] text-[11px] w-fit px-[30px] py-2'>{qrCodeValue}</p>
                    </div>
                </div>
            </div>

            <p className='flex flex-wrap items-center justify-between gap-[12px] m-[20px] lg:mx-[55px] bg-[#F8FAFC] text-[#78778b] mb-[50px] p-[20px] lg:py-[20px] lg:px-[70px] border border-t-[#dadada] rounded-b-md'>
                <p className='flex items-center gap-[12px]'>
                    <img src={Info} alt='info' />
                    If you enable two-factor authentication following instructions above, you will be asked to provide an extra verification code next time you login
                </p>
                <button className='bg-[#825fe9] text-white text-[14px] border border-none w-fit h-fit px-[25px] py-[8px] rounded-md flex items-center justify-center gap-[5px]'>Enable</button>
            </p>
        </div>
    )
}

export default Auth