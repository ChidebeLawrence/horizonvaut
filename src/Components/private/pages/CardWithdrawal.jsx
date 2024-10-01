import React, { useState } from 'react';
import Info from '@/assets/images/info.svg'
import SubHeader from '@/Utilities/SubHeader'

function CardWithdrawal() {
    const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#FFB547" strokeWidth="12" strokeLinecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
    </svg>

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear + i);

    return (
        <div>
            <SubHeader sub_header_icon={wallet_overview} header="Withdraw USDT to card" content="Withdraw your USDT to your card in few minutes" />

            <div className='flex gap-[2.5rem] py-[45px] px-[1.5rem] flex-col md:px-[3.5rem] lg:flex-row'>
                <div className='bg-white text-[#667085] rounded-md h-fit w-full lg:w-[60%] flex flex-col gap-[45px]'>
                    <div className='px-[20px] flex gap-[20px] w-full flex-col md:flex-row mt-8'>
                        <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>1</p>
                        <div className='w-full'>
                            <p className='text-[#101828] text-[18px] font-semibold'>Card number (Visa/Mastercard)</p>
                            <p className='text-[12px] pt pb-[7px] pb-[15px]'>This is the 16-digit number that appears on the front of your debit or credit card. Please ensure that you enter the correct number without any spaces or dashes.</p>
                            <input type="text" placeholder="Enter your card number" className='rounded-tl-md rounded-bl-md border border-[#dadada] w-[100%] px-[30px] py-[15px] focus:outline-none' />
                        </div>
                    </div>

                    <div className='px-[20px] flex gap-[20px] w-full flex-col md:flex-row'>
                        <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>2</p>
                        <div className='w-full'>
                            <p className='text-[#101828] text-[18px] font-semibold'>Full name</p>
                            <p className='text-[12px] pt pb-[7px] pb-[15px]'>Please enter your full legal name as it appears on your card. This will help us verify that the card belongs to you.
                            </p>
                            <input type="text" placeholder="John Doe" className='rounded-tl-md rounded-bl-md border border-[#dadada] w-[100%] px-[30px] py-[15px] focus:outline-none' />
                        </div>
                    </div>

                    <div className='px-[20px] flex gap-[20px] w-full flex-col md:flex-row'>
                        <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>3</p>
                        <div className='w-full'>
                            <p className='text-[#101828] text-[18px] font-semibold'>Expiration date</p>
                            <p className='text-[12px] pt pb-[7px] pb-[15px]'>This is the month and year that your card will expire. You can find this information on the front of your card.</p>

                            <div className='flex gap-6'>
                                <select value={month} onChange={(e) => setMonth(e.target.value)} className='w-[167px] h-[47px] border border-[#dadada] outline-none rounded-md'>
                                    {months.map((m, index) => (
                                        <option key={index} value={index + 1}>{m}</option>
                                    ))}
                                </select>

                                <select value={year} onChange={(e) => setYear(e.target.value)} className='w-[167px] h-[47px] border border-[#dadada] outline-none rounded-md'>
                                    {years.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='px-[20px] py-[] flex gap-[20px] flex-col md:flex-row'>
                        <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>4</p>
                        <div className='w-[100%]'>
                            <p className='text-[#101828] text-[18px] font-semibold'>Amount USDT</p>
                            <p className='text-[12px] pt pb-[7px] pb-[15px]'>Please enter the amount of USDT that you wish to withdraw to your bank card.</p>

                            <div className='flex gap-[7px] relative'>
                                <input type="text" placeholder="Enter amount" className='pr-[10rem] rounded-tl-md rounded-bl-md border border-[#dadada] w-[100%] px-[30px] py-[15px] focus:outline-none' />
                                <div className='absolute right-[20px] py-[16px] flex gap-[20px]'>
                                    <p className='px-[1rem] cursor-pointer text-[#7044ee]'>All</p>
                                    <p className='mt-[-10px] mb-[-10px] border border-r-[#dadada]'></p>
                                    <p className='px-[1rem]'>BTC</p>
                                </div>
                            </div>
                            <div className='flex justify-between text-[12px] mt-[3px]'>
                                <p>Available: 0.00 USDT</p>
                            </div>
                            <div>
                                <button className='bg-[#7044ee] text-white w-full py-[16px] rounded-md mt-[32px] hover:bg-[#825fe9]'>Send Request</button>
                            </div>
                        </div>
                    </div>

                    <p className='flex items-center justify-center gap-[12px] bg-[#F8FAFC] py-[20px] px-[30px] border border-t-[#dadada] rounded-b-md'>
                        <img src={Info} alt='info' />
                        Please note that Bomib only accepts 1st party transfers with accounts in your name (3rd party transfers are not allowed) and will not be held responsible for any potential loses/rejection of funds associated with 3rd party transfers.                    </p>
                </div>

                <div className='text-[#667085] flex flex-col gap-[2rem] w-full lg:w-[40%] flex-shrink-[1.2]'>
                    <div className='bg-white rounded-md flex flex-col gap-[45px] py-[1.5rem] px-[45px] text-[13px]'>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px] text-[#101820]'>How long do instant card withdrawals take?</p>
                            <p>In most cases, your withdrawal request will be processed within 5 minutes. However, processing can take up to 24 hours in some rare cases.</p>
                        </div>

                        <div>
                            <p className='text-[14px] font-semibold -[10px] text-[#101820]'>Are there fees or minimums?</p>
                            <p>Instant card withdrawal transactions charge a fee of 1%. The minimum withdrawal amount is 100 USDT.</p>
                        </div>

                        <div>
                            <p className='text-[14px] font-semibold pb-[10px] text-[#101820]'>Do instant card withdrawals work for all cards?</p>
                            <p>No, not all card providers support instant card withdrawals. If you don't see your card listed as an option, this means your card does not support this function. Card eligibility requirements are created by your bank or card provider — please contact them for more information about enabling Visa Fast Funds (Visa Direct).</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CardWithdrawal;
