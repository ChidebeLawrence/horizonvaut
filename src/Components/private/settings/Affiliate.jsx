import React, { useState, useRef } from 'react'
import Index from "./Index"
import CoinTwo from "@/assets/images/coinTwo.svg"
import Invite from "@/assets/images/Invite.webp"
import Deposit from "@/assets/images/deposit.webp"
import Earn from "@/assets/images/earn.webp"
import Empty from "@/assets/images/emptyOne.svg"
import Info from '@/assets/images/info.svg'
import SubHeaderTwo from '../../../Utilities/SubHeaderTwo'

function Affiliate() {
    const tableData = [
        // {
        //     Time: "14-09-2024", Type: "Bitcoin", Amount: "500", Asset: "BTC", Status: "Sucess"
        // },
    ]

    const [inputValue, setInputValue] = useState('https://horizonvault.com/signup?ref=528968178');
    const [isCopied, setIsCopied] = useState(false);
    const inputRef = useRef(null);

    const handleCopy = () => {
        const textToCopy = inputRef.current.value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        }
    };

    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#D73E47" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const copy = <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3337 10.7493V14.2493C13.3337 17.166 12.167 18.3327 9.25033 18.3327H5.75033C2.83366 18.3327 1.66699 17.166 1.66699 14.2493V10.7493C1.66699 7.83268 2.83366 6.66602 5.75033 6.66602H9.25033C12.167 6.66602 13.3337 7.83268 13.3337 10.7493Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M18.3337 5.74935V9.24935C18.3337 12.166 17.167 13.3327 14.2503 13.3327H13.3337V10.7493C13.3337 7.83268 12.167 6.66602 9.25033 6.66602H6.66699V5.74935C6.66699 2.83268 7.83366 1.66602 10.7503 1.66602H14.2503C17.167 1.66602 18.3337 2.83268 18.3337 5.74935Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const arrow = <svg width="77" height="18" viewBox="0 0 77 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69.3166 8.50899C70.0515 8.05318 71.0828 7.419 72.5689 6.50341C70.2626 5.76221 68.3624 5.04877 66.4012 4.55332C64.6349 4.10543 62.8118 3.85175 60.9968 3.60601C59.8071 3.4435 59.1819 2.76968 59.2184 1.71932C59.259 0.454932 60.3106 -0.2704 61.5694 0.0942528C66.3078 1.47359 71.0341 2.88463 75.7239 4.41062C76.3126 4.60087 76.9745 5.53629 76.9988 6.15065C77.0273 6.82447 76.5319 7.75195 75.9553 8.1721C73.5759 9.91212 71.026 11.4302 68.6547 13.1781C67.2458 14.2166 66.0439 15.5286 64.7527 16.7216C64.3182 17.1219 63.9569 17.7125 63.4493 17.8829C62.8727 18.0732 62.1094 18.0217 61.5369 17.7997C61.3014 17.7085 61.1633 16.8286 61.3217 16.4362C61.5978 15.7386 62.0728 15.0926 62.5723 14.5139C63.7579 13.1544 65.0126 11.8464 66.2469 10.5067C65.2156 10.4195 63.9569 10.1697 62.7144 10.2292C48.434 10.9109 34.1495 11.6006 19.8732 12.3775C14.6678 12.6629 9.47862 13.1821 4.28132 13.6221C3.70475 13.6696 3.13629 13.8757 2.57596 14.0462C1.27258 14.4425 0.415832 14.0462 0.0706991 12.8571C-0.23383 11.8146 0.468617 10.792 1.7314 10.6929C5.33702 10.4076 8.95077 10.2332 12.5605 9.96761C17.1122 9.63467 21.6557 9.22641 26.2074 8.90536C28.9644 8.71114 31.7296 8.61602 34.4906 8.4654C38.0475 8.27515 41.6004 8.04922 45.1573 7.87878C48.5558 7.71627 51.9544 7.60529 55.3529 7.47053C57.0867 7.40315 58.8245 7.2882 60.5583 7.28424C62.5357 7.28424 64.5172 7.29217 66.4824 7.4745C67.3392 7.55377 68.1512 8.06904 69.3206 8.51296L69.3166 8.50899Z" fill="black"></path>
    </svg>

    return (
        <div>
            <SubHeaderTwo icon={icon} header="Affiliate program" content="Refer Friends, Earn Crypto Together" />

            <Index />

            <div className='m-[20px] lg:mx-[55px] lg:mb-[50px]'>
                <div className='text-black flex flex-col gap-[2rem]'>
                    <div className='flex flex-col p-[20px] gap-[10px] lg:flex-row lg:py-[30px] lg:px-[40px] lg:gap-0 bg-white rounded-md'>
                        <div className='w-full lg:w-[60%] lg:pr-[100px]'>
                            <p className='text-[20px] text-black font-semibold border-b border-b-[#F9B955] border-b-[4px] w-fit'>How to start?</p>
                            <p className='flex items-center pt-[20px] gap-[10px]'>
                                <img src={CoinTwo} alt='coin' className='h-[28px] w-[27px]' />
                                Copy and paste this link to send to friends or use in your articles. When users sign up using this link, your account will be credited with referral bonuses.
                            </p>
                        </div>

                        <div className='flex items-center'>
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className='rounded-tl-md rounded-bl-md border border-[#dadada] w-full lg:w-[395px] px-[14px] py-[10px] text-center focus:outline-none'
                                disabled
                            />

                            <div className='relative'>
                                <p onClick={handleCopy} className='bg-[#6544C6] flex gap-[5px] border border-[#6544C6] px-[14px] px-[20px] py-[10px] text-white cursor-pointer rounded-tr-md rounded-br-md'>
                                    {copy}
                                    Copy
                                </p>

                                {isCopied && (
                                    <div className='absolute bottom-[120%] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-sm rounded'>
                                        Copied!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-between gap-[20px] bg-white rounded-md p-[20px] lg:flex-row lg:gap-0 lg:py-[40px] lg:px-[40px]'>
                        <div className='flex flex-col items-center justify-center w-[239px] h-[249px] text-center'>
                            <img src={Invite} alt='invite' className='h-[154px] w-[154px]' />
                            <p className='text-[18px] font-semibold py-2'>Invite Friends</p>
                            <p className='text-[#667085]'>Share referral code/link with your friends to sign up on Horizon Vault</p>
                        </div>

                        <div className='hidden lg:block'>{arrow}</div>

                        <div className='flex flex-col items-center justify-center w-[239px] h-[249px] text-center'>
                            <img src={Deposit} alt='deposit' className='h-[154px] w-[154px]' />
                            <p className='text-[18px] font-semibold py-2'>Referee Deposit & Trade</p>
                            <p className='text-[#667085]'>Get your referees to deposit and trade after registering for a Horizon Vault account</p>
                        </div>

                        <div className='hidden lg:block'>{arrow}</div>

                        <div className='flex flex-col items-center justify-center w-[239px] h-[249px] text-center'>
                            <img src={Earn} alt='earn' className='h-[154px] w-[154px]' />
                            <p className='text-[18px] font-semibold py-2'>Earn Commission</p>
                            <p className='text-[#667085]'>Earn up to 30% commission from each trade completed by your referees</p>
                        </div>
                    </div>

                    <div className='overflow-x-auto bg-white max-h-[502px] min-h-[355px] w-auto overflow-y-auto rounded-md border border-[#dadada]'>
                        <table className='min-w-[800px] w-full border-collapse table-fixed'>
                            <thead className='bg-bgColourTwo text-left'>
                                <th className='border-none py-[2rem] pl-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/5'>User ID</th>
                                <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/5'>Registration Time</th>
                                <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/5'>Deposit Amount(USDT)</th>
                                <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/5'>Trading Volume(USDT)</th>
                                <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/5'>Cash Back</th>
                            </thead>

                            <tbody className='text-colorSix text-[14px] relative'>
                                {tableData.length === 0 ?
                                    (<div className='absolute left-[0px] right-[0] top-[0] bottom-[0] h-[250px] flex flex-col justify-center items-center'>
                                        <img src={Empty} alt='empty' />
                                        <p>No Data Found</p>
                                    </div>)
                                    :
                                    (tableData.map((data, index) => (
                                        <tr key={index} className='border-b border-gray-300'>
                                            <td className='w-1/5 py-[1.2rem] pl-[2rem]'>{data.Type}</td>
                                            <td className='w-1/5 py-[1.2rem]'>{data.Time}</td>
                                            <td className='w-1/5 py-[1.2rem]'>{data.Amount}</td>
                                            <td className='w-1/5 py-[1.2rem]'>${data.Asset}</td>
                                            <td className='w-1/5 py-[1.2rem]'>{data.Status}</td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>


                    <div className='flex flex-wrap md:flex-nowrap gap-[10px] p-[15px] items-center md:justify-center lg:gap-[12px] bg-[#FFFDEC] text-[#6D6D6D] lg:p-[20px] lg:py-[20px] lg:px-[30px] border border-[#FFDBA6] rounded-b-md'>
                        <img src={Info} alt='info' />
                        Share your link with a friend who does not have a Horizon Vault account. Regular Task: Referees must accumulatively deposit more than $50 within 14 days of registration. Both referrer and referee will be rewarded with a 100 USDT trading fee rebate voucher each. Disclaimer: You can only claim one reward per referral.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Affiliate