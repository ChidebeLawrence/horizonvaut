import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import Futures from "../../assets/images/futures.png"
import Options from "../../assets/images/options.png"
import MyNFTsTab from './MyNFTsTab';

function MyNFTs({ header, description, sub_header, img }) {
  const StyleLink = "rounded-md text-sm font-medium text-gray-300 hover:text-activeColor flex items-center h-[]"

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  return (
    <div
      className={`${StyleLink} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header__link header__link-trade cursor-pointer flex items-center">
        <div className={`header__link-wrapper flex items-center`}>
          <span>{header}</span>
          <FaCaretDown className='text-[20px]' />
          <div className="header__link-arrow ml-2">
          </div>
        </div>
        {isOpen && (
          <div className="header__more absolute p-4 left-0 mt-2 w-[21rem] bg-customDark border-customDark rounded-md shadow-lg left-0 mt-2 top-[65px] pt-[7px]">
            <MyNFTsTab sub_header="Copy trading" description="Most of the available cypto assets and sorts them base on market capitalisation" img={Futures} />
            <MyNFTsTab sub_header="Market screener" description="Intelligent pre-built trading bots help you auto-trade and earn all-day-long" img={Options} />            
          </div>
        )}
      </div>
    </div>
  );
}

export default MyNFTs;
