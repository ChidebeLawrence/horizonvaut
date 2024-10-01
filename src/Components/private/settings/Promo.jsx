import React from 'react'
import Index from './Index'
import Info from '@/assets/images/info.svg'
import SubHeaderTwo from '../../../Utilities/SubHeaderTwo'

function Promo() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#F9FD41" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const promo = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.7497 14.5827C22.7497 12.9727 24.0563 11.666 25.6663 11.666V10.4993C25.6663 5.83268 24.4997 4.66602 19.833 4.66602H8.16634C3.49967 4.66602 2.33301 5.83268 2.33301 10.4993V11.0827C3.94301 11.0827 5.24967 12.3893 5.24967 13.9993C5.24967 15.6093 3.94301 16.916 2.33301 16.916V17.4993C2.33301 22.166 3.49967 23.3327 8.16634 23.3327H19.833C24.4997 23.3327 25.6663 22.166 25.6663 17.4993C24.0563 17.4993 22.7497 16.1927 22.7497 14.5827Z" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.5 17.209L17.5 10.209" stroke="#191D31" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17.4939 17.2083H17.5044" stroke="#191D31" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.4939 10.7923H10.5044" stroke="#191D31" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    return (
        <div>
            <SubHeaderTwo icon={icon} header="Gift codes" content="Gift Cards allows you to receive cryptocurrency in a fast, simple and customizable way" />

            <Index />

            <div className='m-[20px] lg:mx-[55px] lg:mb-[50px] text-[#78778B] flex flex-col gap-[2rem]'>
                <div className='bg-white p-[20px] lg:py-[40px] lg:px-[40px] rounded-md flex flex-wrap items-center justify-center gap-[30px] lg:justify-between lg:gap-[20px]'>
                    <div className='flex items-center gap-[25px] lg:flex-row'>
                        {promo}
                        <div>
                            <p className='text-[20px] text-black font-semibold'>Activate your gift code</p>
                            <p className='text-[12px]'>Enter code of your gift card (promo)</p>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <input type="text" placeholder='Enter gift code number' className='rounded-tl-md rounded-bl-md w-full lg:w-[307px] py-[10px] px-[20px] focus:outline-[#825fe9] border border-[#e5e8eb]' />
                        <p className='bg-[#7044ee] flex gap-[5px] border border-[#7044ee] px-[30px] px-[20px] py-[10px] text-white cursor-pointer rounded-tr-md rounded-br-md'>
                            Redeem
                        </p>
                    </div>
                </div>

                <div className='flex flex-wrap md:flex-nowrap gap-[10px] py-[10px] items-center lg:gap-[30px] bg-[#FFFDEC] text-[#6D6D6D] text-[13px] px-[20px] lg:px-[30px] border border-[#FFDBA6] rounded-b-md'>
                    <img src={Info} alt='info' />
                    <ul className='list-disc list-inside px-[20px] lg:p-4 list-outside'>
                        <li>Project Gift codes can be purchased and traded via distributors and exchange brokers and can be used for payment with merchants. Once you receive a gift code, it only takes a few steps to redeem.</li>
                        <li>Use cases include: Gift Card reselling, loyalty and game rewards, e-commerce purchases and more.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Promo