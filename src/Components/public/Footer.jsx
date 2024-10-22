import React from 'react';
import Horiznlogo from "@/assets/images/Horiznlogo.fw.png"
import { Link } from 'react-router-dom';
import classNames from 'classnames';

function Footer() {
    return (
        <div className='bg-black text-colorSeven px-[2rem] md:px-[60px] py-[80px]'>
            <div className={classNames(
                'flex flex-col gap-[5rem] border-b border-colorSeven pb-[2rem]',
                'lg:flex-row lg:gap-[0]',
            )}>
                <div className='flex flex-col w-full gap-[30px] lg:w-[240px]'>
                    <div>
                        <div className='flex items-center gap-[20px] mb-[10px]'>
                            <img src={Horiznlogo} alt='Horiznlogo' className='object-cover h-[39px] w-[39px]' />
                            <h1 className='font-bold text-[26px] text-white'>Horizon Vault</h1>
                        </div>

                        <svg width="169" height="18" viewBox="0 0 169 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2248 4.81993C23.8867 4.70895 26.0204 5.76327 27.2835 7.99677C28.2398 9.70312 29.3174 9.99445 31.1015 9.37018C35.683 7.76788 40.2859 6.22108 44.9173 4.77831C47.7861 3.88352 50.3552 4.36212 52.4604 6.74129C52.967 7.31008 54.2016 7.68465 54.9795 7.53205C58.9758 6.7413 62.9364 5.74245 66.9113 4.82685C71.3787 3.80027 75.8317 2.68354 80.3347 1.80955C83.1107 1.26852 85.7369 2.32977 87.4425 4.31357C89.9259 7.19216 92.9659 7.05342 96.0345 6.38753C101.822 5.13899 107.51 3.48815 113.283 2.17718C116.237 1.51129 119.277 1.01879 122.303 0.859255C123.688 0.782956 125.3 1.44885 126.506 2.22572C129.061 3.8627 131.887 3.74478 134.578 3.46039C142.035 2.66964 149.492 1.77487 156.864 0.463899C160.911 -0.257482 164.2 1.24769 167.619 2.59334C168.297 2.86386 169.181 4.32745 168.967 4.72975C168.461 5.68004 167.462 6.60257 166.434 7.00488C165.563 7.3517 164.279 7.1991 163.351 6.85228C158.534 5.04189 153.867 6.73436 149.157 7.26846C143.362 7.92048 137.596 8.80832 131.794 9.31468C130.046 9.46728 127.855 9.19676 126.499 8.25342C122.788 5.67309 119.042 6.52626 115.224 7.40718C109.122 8.81526 103.049 10.3205 96.9622 11.7771C91.9454 12.9771 87.5424 12.11 83.7459 8.43377C82.9323 7.64302 81.1197 7.19216 79.9779 7.45574C74.4758 8.69735 69.038 10.2234 63.5787 11.6661C59.9035 12.6303 56.2997 14.2118 52.3747 12.769C51.8895 12.5886 51.2971 12.5054 50.9403 12.1863C47.1153 8.74591 43.383 10.6187 39.5865 12.2557C36.9603 13.3863 34.3199 14.5169 31.5867 15.3424C28.1542 16.3828 25.5423 15.0927 23.0232 11.5759C22.1383 10.3343 21.3604 9.82798 19.8333 10.1262C15.3588 10.9863 11.4838 13.0326 7.99416 15.7724C4.83279 18.2626 2.41358 18.7551 0.401143 16.7921C-0.0555794 16.3481 -0.148338 14.7528 0.25843 14.3921C5.06115 10.0846 14.1385 5.18061 21.2391 4.82685L21.2248 4.81993Z" fill="#6544C6"></path>
                        </svg>
                    </div>

                    <p className='text-xs leading-[15px] tracking-[0.02em] w-inherit'>
                        Innovative cryptocurrency exchange with advanced financial services. We rely on blockchain technology to provide everything you need for wise trading and investment.
                    </p>

                    <p className='text-colorSeven font-roboto font-normal text-xs leading-[15px] tracking-[0.02em]'>
                        Listing Request: <span className='text-colorEight'>listing@horizonvault.com</span><br />
                        Partnership: <span className='text-colorEight'>partnership@horizonault.com</span>
                    </p>

                    <div>
                        <p className='font-normal text-sm leading-[15px] mb-[17px] mt-[2rem] text-colorEight'>Subscribe to our newsletter</p>
                        <input type='email' placeholder='Enter email' className="text-xs leading-[14px] text-[#A8A8A8] bg-[#232323] border border-[#373737] rounded-[5px] outline-none py-2 pr-[10px] pl-[11px] max-w-[139px]" />
                        <button className='font-normal text-xs leading-4 text-white py-[7px] pr-[18px] pl-[19px] bg-[#6544C6] rounded-[5px] ml-[10px]'>Subcribe</button>
                    </div>

                </div>

                <div className={classNames(
                    "flex justify-between w-full",
                    "md:flex md:justify-between md:w-full md:ml-[2rem] lg:ml-[206px]",
                    "lg:ml-[206px]",
                )}>
                    <div className="">
                        <p className='text-base leading-[16px] tracking-[0.02em] text-white mb-[24px]'>Products</p>
                        <div className="flex flex-col gap-[9px] text-[14px]">
                            <Link path="#" className="hover:text-white">Spot trading</Link>
                            <Link path="#" className="hover:text-white">Futures trading</Link>
                            <Link path="#" className="hover:text-white">Options trading</Link>
                            <Link path="#" className="hover:text-white">Wallet</Link>
                            <Link path="#" className="hover:text-white">Instant swap</Link>
                            <Link path="#" className="hover:text-white">P2P trading</Link>
                            <Link path="#" className="hover:text-white">DeFi Staking</Link>
                            <Link path="#" className="hover:text-white">Horizon Vault Visa Card</Link>
                        </div>
                    </div>

                    <div className="">
                        <p className='text-base leading-[16px] tracking-[0.02em] text-white mb-[24px]'>Services</p>
                        <div className="flex flex-col gap-[9px] text-[14px]">
                            <Link path="#" className="hover:text-white">24/7 Support chat</Link>
                            <Link path="#" className="hover:text-white">Copy trading</Link>
                            <Link path="#" className="hover:text-white">Trading bots</Link>
                            <Link path="#" className="hover:text-white">ETH 2.0 staking</Link>
                            <Link path="#" className="hover:text-white">Launchpad</Link>
                            <Link path="#" className="hover:text-white">Savings</Link>
                            <Link path="#" className="hover:text-white">Horizon Vault ventures</Link>
                            <Link path="#" className="hover:text-white">Buy crypto</Link>
                        </div>
                    </div>

                    <div className="">
                        <p className='text-base leading-[16px] tracking-[0.02em] text-white mb-[24px]'>Information</p>
                        <div className="flex flex-col gap-[9px] text-[14px]">
                            <Link path="#" className="hover:text-white">Fees</Link>
                            <Link path="#" className="hover:text-white">Platform status</Link>
                            <Link path="#" className="hover:text-white">Wallet security</Link>
                            <Link path="#" className="hover:text-white">Indices</Link>
                            <Link path="#" className="hover:text-white">Trading API</Link>
                            <Link path="#" className="hover:text-white">Token listing</Link>
                            <Link path="#" className="hover:text-white">Referral system</Link>
                            <Link path="#" className="hover:text-white">Bug Bounty</Link>
                        </div>
                    </div>

                    <div className="">
                        <p className='text-base leading-[16px] tracking-[0.02em] text-white mb-[24px]'>Legal</p>
                        <div className="flex flex-col gap-[9px] text-[14px]">
                            <Link path="#" className="hover:text-white">Terms of service</Link>
                            <Link path="#" className="hover:text-white">Privacy notice</Link>
                            <Link path="#" className="hover:text-white">Cookies policy</Link>
                            <Link path="#" className="hover:text-white">AML & KYC policy</Link>
                            <Link path="#" className="hover:text-white">Risk Disclosure Statement</Link>
                            <Link path="#" className="hover:text-white">Regulatory License</Link>
                            <Link path="#" className="hover:text-white">Special Treatment</Link>
                            <Link path="#" className="hover:text-white">Law Enforcement Requests</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-[9px] leading-[15px] max-w-[1200px] mx-auto text-center mt-[2rem]">
                In acceding to or using the Platform and the Site, you represent and warrant that you are fully aware of the risks associated with the transactions involving Digital Assets or the use of Platform. You agree and understand that you are solely responsible for determining the nature, potential value, suitability, and appropriateness of these risks for yourself, and that the Company does not give advice or recommendations regarding any Digital Asset, including the suitability and appropriateness of, and investment strategies for, any Digital Asset. You agree and understand that you access and use the Platform and the Site at your own risk. <br />
                <span>Horizon Vault 2024 © All right reserved</span>
            </div>
        </div>
    );
}

export default Footer;
