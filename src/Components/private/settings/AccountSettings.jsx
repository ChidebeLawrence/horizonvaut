import React, { useEffect, useState } from 'react'
import Index from "./Index"
import SubHeaderTwo from "@/Utilities/SubHeaderTwo"

function AccountSettings() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#EE44A0" strokeWidth="12" strokeMiterlimit="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeMiterlimit="round"></line>
    </svg>

    const emailIcon = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.8334 23.9168H8.16671C4.66671 23.9168 2.33337 22.1668 2.33337 18.0835V9.91683C2.33337 5.8335 4.66671 4.0835 8.16671 4.0835H19.8334C23.3334 4.0835 25.6667 5.8335 25.6667 9.91683V18.0835C25.6667 22.1668 23.3334 23.9168 19.8334 23.9168Z" stroke="#2A353D" strokeWidth="1.75" strokeMiterlimit="10" strokeMiterlimit="round" strokeLinejoin="round"></path>
        <path d="M19.8333 10.5L16.1816 13.4167C14.98 14.3733 13.0083 14.3733 11.8066 13.4167L8.16663 10.5" stroke="#2A353D" strokeWidth="1.75" strokeMiterlimit="10" strokeMiterlimit="round" strokeLinejoin="round"></path>
    </svg>

    const [userEmail, setUserEmail] = useState(null);


    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        setUserEmail(storedUserDetails.email);
    })

    return (
        <div className='mb-[15rem]'>

            <SubHeaderTwo icon={icon} header="Account settings" content="Manage your account settings" />

            <Index />

            <div className='bg-white text-[#78778B] py-6 px-[40px] flex flex-col gap-[10px] items-center justify-between rounded-md m-[20px] lg:flex-row lg:gap-0 lg:mx-[55px] lg:mb-[50px]'>
                <div className='flex items-center gap-[20px]'>
                    <p>{emailIcon}</p>
                    <div>
                        <p className='text-[20px] text-black font-semibold'>Email</p>
                        <p className="text-[12px]">Your current active email address</p>
                    </div>
                </div>
                <p className='bg-[#EAECEF] w-fit h-fit px-[50px] py-[15px] rounded-md'>{userEmail}</p>
            </div>
        </div>
    )
}

export default AccountSettings