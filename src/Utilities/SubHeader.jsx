import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Deposit from "@/assets/images/deposit.svg";
import Withdraw from "@/assets/images/withdraw.svg";
import Transfer from "@/assets/images/transfer.svg";
import History from "@/assets/images/history.svg";
import classNames from 'classnames';

function SubHeader({ sub_header_icon, header, content, onClick }) {
    const location = useLocation();

    const StyleLinkHeader =
        "bg-bgColourOne px-[10px] py-[6px] rounded-md flex items-center justify-center hover:bg-colorTwo text-white flex-col smSm:flex-row lg:px-[26px] lg:py-3 lg:flex-row lg:gap-[10px] md:px-[26px] md:py- smLg:flex-row";

    const activeClass = "bg-[royalblue] text-white";
    const isActive = (path) => (location.pathname === path ? activeClass : "");

    return (
        <div className={classNames(
            'bg-colorOne flex items-center justify-between py-[30px] px-[12px]',
            'lg:py-[2.6rem] lg:px-[5.5rem]'
        )}>
            <div className='flex items-center justify-center gap-3 text-white'>
                {sub_header_icon}

                <span>
                    <h1 className='text-[24px] font-extrabold tracking-[1px]'>{header}</h1>
                    <p className="text-[12px] md:text-[14px] text-darkgray">{content}</p>
                </span>
            </div>

            <div className={classNames(
                'flex justify-center gap-[10px] fixed z-10 sm:z-10 w-full bottom-0 left-0 px-[10px] py-[10px] bg-[#272233]',
                'smLg:justify-center gap-[1.5rem]',
                'lg:flex lg:gap-4 lg:static lg:w-fit bottom-0 left-0 lg:px-[0px] lg:py-[0px] lg:bg-relative lg:z-auto'
            )}>
                <Link to="/profile/deposit" className={`${StyleLinkHeader} ${isActive("/profile/deposit")} smSm:gap-[3px]`}>
                    <img src={Deposit} alt='deposit' />
                    Deposit
                </Link>

                <Link to="/profile/withdraw" className={`${StyleLinkHeader} ${isActive("/profile/withdraw")}`}>
                    <img src={Withdraw} alt='withdraw' />
                    Withdraw
                </Link>

                <Link to="/profile/transfer" className={`${StyleLinkHeader} ${isActive("/profile/transfer")}`}>
                    <img src={Transfer} alt='transfer' />
                    Transfer
                </Link>

                <Link to="/profile/history" className={`${StyleLinkHeader} ${isActive("/profile/history")}`}>
                    <img src={History} alt='history' onClick={onClick} />
                    History
                </Link>
            </div>
        </div>
    );
}

export default SubHeader;
