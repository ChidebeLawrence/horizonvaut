import React from 'react'
import Index from './Index'
import SubHeaderTwo from '../../../Utilities/SubHeaderTwo'
import { Link } from 'react-router-dom'

function Verification() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#3ED7D7" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const completed = <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.50263 29.5621L9.39626 29.3682L9.18119 29.3164L4.03171 28.0777L4.53557 22.3117L4.55313 22.1108L4.42632 21.9539L0.890965 17.5802L4.42632 13.2064L4.55313 13.0496L4.53557 12.8486L4.03171 7.08263L9.18119 5.8439L9.39626 5.79216L9.50263 5.59822L12.217 0.649511L17.0522 2.8817L17.2618 2.97845L17.4713 2.8817L22.3065 0.649511L25.0209 5.59822L25.1273 5.79216L25.3423 5.8439L30.4918 7.08263L29.988 12.8486L29.9704 13.0496L30.0972 13.2064L33.6326 17.5802L30.0972 21.9539L29.9704 22.1108L29.988 22.3117L30.4918 28.0777L25.3423 29.3164L25.1273 29.3682L25.0209 29.5621L22.3065 34.5108L17.4713 32.2786L17.2618 32.1819L17.0522 32.2786L12.217 34.5108L9.50263 29.5621ZM15.2705 23.8632L15.6377 24.2608L16.005 23.8632L24.7439 14.4034L25.0518 14.07L24.7497 13.7313L22.5844 11.3036L22.2177 10.8925L21.8439 11.2971L15.6334 18.02L12.6756 14.8926L12.308 14.5039L11.9451 14.8969L9.77967 17.2409L9.46624 17.5802L9.77967 17.9194L15.2705 23.8632Z" fill="#7ED17D" stroke="#101828"></path>
    </svg>

    const incomplete = <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.84541 29.5621L9.73903 29.3682L9.52396 29.3164L4.37448 28.0777L4.87834 22.3117L4.8959 22.1108L4.76909 21.9539L1.23374 17.5802L4.76909 13.2064L4.8959 13.0496L4.87834 12.8486L4.37448 7.08263L9.52396 5.8439L9.73903 5.79216L9.84541 5.59822L12.5598 0.649511L17.395 2.8817L17.6045 2.97845L17.8141 2.8817L22.6493 0.649511L25.3637 5.59822L25.4701 5.79216L25.6851 5.8439L30.8346 7.08263L30.3307 12.8486L30.3132 13.0496L30.44 13.2064L33.9753 17.5802L30.44 21.9539L30.3132 22.1108L30.3307 22.3117L30.8346 28.0777L25.6851 29.3164L25.4701 29.3682L25.3637 29.5621L22.6493 34.5108L17.8141 32.2786L17.6045 32.1819L17.395 32.2786L12.5598 34.5108L9.84541 29.5621Z" fill="#FF6C6C" stroke="#101828"></path>
        <path d="M22.6079 13.4438L13.6006 22.751" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.6006 13.4438L22.6079 22.751" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const good = <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.73543 14.5089L4.64127 11.4255L5.81722 10.2422L7.73543 12.1589L14.6493 5.24219L15.8253 6.42552L7.73543 14.5089Z" fill="#7ED17D"></path>
        <path d="M10.2376 20C8.25815 20 6.32319 19.4135 4.67738 18.3147C3.03156 17.2159 1.7488 15.6541 0.991311 13.8268C0.233824 11.9996 0.0356369 9.98891 0.421801 8.0491C0.807964 6.10929 1.76112 4.32746 3.16078 2.92894C4.56043 1.53041 6.3437 0.578004 8.28507 0.192152C10.2264 -0.1937 12.2387 0.0043329 14.0675 0.761209C15.8962 1.51809 17.4593 2.79981 18.559 4.4443C19.6587 6.08879 20.2456 8.02219 20.2456 10C20.2456 12.6522 19.1912 15.1957 17.3143 17.0711C15.4375 18.9464 12.8919 20 10.2376 20ZM10.2376 1.66667C8.58805 1.66667 6.97559 2.15541 5.60408 3.07109C4.23256 3.98677 3.16358 5.28826 2.53234 6.81098C1.9011 8.33369 1.73594 10.0092 2.05774 11.6258C2.37955 13.2423 3.17386 14.7271 4.34024 15.8926C5.50662 17.058 6.99269 17.8517 8.6105 18.1732C10.2283 18.4948 11.9052 18.3297 13.4292 17.699C14.9531 17.0683 16.2557 16.0002 17.1721 14.6298C18.0885 13.2593 18.5776 11.6482 18.5776 10C18.5776 7.78987 17.6989 5.67025 16.1349 4.10745C14.5708 2.54465 12.4495 1.66667 10.2376 1.66667Z" fill="#7ED17D"></path>
    </svg>

    const bad = <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.29673 5.89395L6.11707 7.07226L13.1926 14.1446L14.3723 12.9663L7.29673 5.89395Z" fill="#F83939"></path>
        <path d="M13.1782 5.86838L6.10141 12.9394L7.28087 14.118L14.3576 7.04689L13.1782 5.86838Z" fill="#F83939"></path>
        <path d="M10.2376 20C8.25817 20 6.32319 19.4135 4.67737 18.3147C3.03155 17.2159 1.7488 15.6541 0.99131 13.8268C0.233824 11.9996 0.0356372 9.98891 0.4218 8.0491C0.807964 6.10929 1.76114 4.32746 3.1608 2.92894C4.56045 1.53041 6.34371 0.578004 8.28509 0.192152C10.2265 -0.1937 12.2388 0.0043329 14.0675 0.761209C15.8962 1.51809 17.4593 2.79981 18.559 4.4443C19.6587 6.08879 20.2456 8.02219 20.2456 10C20.2456 12.6522 19.1912 15.1957 17.3143 17.0711C15.4374 18.9464 12.8919 20 10.2376 20ZM10.2376 1.66667C8.58807 1.66667 6.97558 2.15541 5.60407 3.07109C4.23256 3.98677 3.16361 5.28826 2.53237 6.81098C1.90113 8.33369 1.73596 10.0092 2.05777 11.6258C2.37957 13.2423 3.17388 14.7271 4.34026 15.8926C5.50664 17.058 6.99268 17.8517 8.61049 18.1732C10.2283 18.4948 11.9052 18.3297 13.4292 17.699C14.9531 17.0683 16.2557 16.0002 17.1721 14.6298C18.0885 13.2593 18.5776 11.6482 18.5776 10C18.5776 7.78987 17.6989 5.67025 16.1349 4.10745C14.5708 2.54465 12.4495 1.66667 10.2376 1.66667Z" fill="#F83939"></path>
    </svg>

    const task = <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.2053 1V2.72355M8.03526 1V2.72355M3.86523 1V2.72355" stroke="#2A353D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M0.946289 7.89472C0.946289 5.05101 0.946289 3.62916 1.80125 2.74573C2.65621 1.8623 4.03225 1.8623 6.78433 1.8623H9.28635C12.0384 1.8623 13.4145 1.8623 14.2694 2.74573C15.1244 3.62916 15.1244 5.05101 15.1244 7.89472V12.2036C15.1244 15.0473 15.1244 16.4691 14.2694 17.3526C13.4145 18.236 12.0384 18.236 9.28635 18.236H6.78433C4.03225 18.236 2.65621 18.236 1.80125 17.3526C0.946289 16.4691 0.946289 15.0473 0.946289 12.2036V7.89472Z" stroke="#2A353D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M4.69922 12.2024H8.03524M4.69922 7.89355H11.3713" stroke="#2A353D" stroke-width="1.5" stroke-linecap="round"></path>
    </svg>

    const upgrade = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8735 7.58286L13.8602 4.59619L16.8469 7.58286" stroke="white" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.8599 16.5432V4.67822" stroke="white" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M4.6665 14C4.6665 19.1567 8.1665 23.3333 13.9998 23.3333C19.8332 23.3333 23.3332 19.1567 23.3332 14" stroke="white" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    return (
        <div>
            <SubHeaderTwo icon={icon} header="KYC Verification" content="Select a suitable benefit according to your needs and complete the verification" />

            <Index />

            <div className='text-black m-[20px] lg:mx-[55px] lg:mb-[50px] flex flex-col gap-[30px] lg:gap-[16px] lg:flex-row'>
                <div className='w-full lg:w-1/3'>
                    <div className='bg-[#F8FAFC] py-[16px] border-b border-[#DADADA] flex items-center justify-between px-[30px] rounded-t-md'>
                        <p className='text-[20px]'>1st level <span className='text-[#44AB42]'>Completed</span></p>
                        {completed}
                    </div>

                    <div className='bg-white pt-[20px] border-l border-l-[#DADADA] border-r border-r-[#DADADA] rounded-md'>
                        <div className='px-[30px]'>
                            <p className='border-b border-b-[#6544C6] border-b-[4px] w-fit text-[18px] pt-[10px]'>Features</p>

                            <div className='flex items-center justify-between py-4 pt-[30px] border-b border-b[#dadada] border-dashed'>
                                <p>Deposit crypto</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Withdraw crypto</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Spot trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Copy trading</p>
                                {bad}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Futures trading</p>
                                {bad}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>P2P trading</p>
                                {bad}
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <p>Deposit fiat</p>
                                {bad}
                            </div>
                        </div>

                        <div className='border border-[#dadada] bg-[#F8FAFC] px-[30px] py-[20px] rounded-b-md'>
                            <p className='text-[18px] font-semibold'>Requirement:</p>
                            <p className='flex items-center gap-[15px] py-[14px]'>
                                {task}
                                Successful registration
                            </p>
                        </div>
                    </div>
                </div>

                <div className='w-full lg:w-1/3'>
                    <div className='bg-[#F8FAFC] py-[16px] border-b border-[#DADADA] flex items-center justify-between px-[30px] rounded-t-md'>
                        <p className='text-[20px]'>2nd level</p>
                        {incomplete}
                    </div>

                    <div className='bg-white pt-[20px] border-l border-l-[#DADADA] border-r border-r-[#DADADA] rounded-b-md'>
                        <div className='px-[30px]'>
                            <p className='border-b border-b-[#FF993A] border-b-[4px] w-fit text-[18px] pt-[10px]'>Features</p>

                            <div className='flex items-center justify-between py-4 pt-[30px] border-b border-b[#dadada] border-dashed'>
                                <p>Deposit crypto</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Withdraw crypto</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Spot trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Copy trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Futures trading</p>
                                {bad}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>P2P trading</p>
                                {bad}
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <p>Deposit fiat</p>
                                {bad}
                            </div>
                        </div>

                        <div className='border border-[#dadada] bg-[#F8FAFC] px-[30px] py-[20px] rounded-b-md'>
                            <p className='text-[18px] font-semibold'>Requirement:</p>
                            <p className='flex items-center gap-[15px] py-[14px]'>
                                {task}
                                Government-issued ID
                            </p>
                            <p className='flex items-center gap-[15px] py-[14px]'>
                                {task}
                                Facial recognition (selfie)
                            </p>
                        </div>
                    </div>
                    <Link to="/profile/verification-2lvl" className='flex items-center justify-center gap-[15px] text-white bg-[#6544C6] w-full py-[15px] rounded-md mt-[10px]'>{upgrade} Upgrade</Link>
                </div>

                <div className='w-full lg:w-1/3'>
                    <div className='bg-[#F8FAFC] py-[16px] border-b border-[#DADADA] flex items-center justify-between px-[30px] rounded-t-md'>
                        <p className='text-[20px]'>3st level</p>
                        {incomplete}
                    </div>

                    <div className='bg-white pt-[20px] border-l border-l-[#DADADA] border-r border-r-[#DADADA] rounded-b-md'>
                        <div className='px-[30px]'>
                            <p className='border-b border-b-[#3AB8FF] border-b-[4px] w-fit text-[18px] pt-[10px]'>Features</p>

                            <div className='flex items-center justify-between py-4 pt-[30px] border-b border-b[#dadada] border-dashed'>
                                <p>Deposit crypto</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Withdraw crypto</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Spot trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Copy trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>Futures trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4 border-b border-b[#dadada] border-dashed'>
                                <p>P2P trading</p>
                                {good}
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <p>Deposit fiat</p>
                                {good}
                            </div>
                        </div>

                        <div className='border border-[#dadada] bg-[#F8FAFC] px-[30px] py-[20px] rounded-b-md'>
                            <p className='text-[18px] font-semibold'>Requirement:</p>
                            <p className='flex items-center gap-[15px] py-[14px]'>
                                {task}
                                Proof of address
                            </p>
                            <p className='flex items-center gap-[15px] py-[14px]'>
                                {task}
                                Total balance amount of 10,000 USD
                            </p>
                        </div>
                    </div>

                    <button className='flex items-center justify-center gap-[15px] text-white bg-[#a898da] w-full py-[15px] rounded-md mt-[10px]'>{upgrade} Upgrade</button>
                </div>
            </div>
        </div>
    )
}

export default Verification