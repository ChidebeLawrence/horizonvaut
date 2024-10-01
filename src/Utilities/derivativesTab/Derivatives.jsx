import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import Futures from "../../assets/images/futures.png"
import Options from "../../assets/images/options.png"
import DerivativesTab from './DerivativesTab';

function SubNavTabs({ header, onLinkClick, setIsModalOpen }) {
  const StyleLink = "rounded-md text-sm font-medium text-gray-300 hover:text-activeColor flex items-center"

  const [isOpen, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(true);

    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(false);

    }
  };
  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`${StyleLink} relative lg:py-[20px]`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="cursor-pointer flex flex-col lg:flex-row lg:items-center">
        <div className={`flex items-center`}>
          <span>{header}</span>
          <FaCaretDown className='text-[20px]' />
        </div>
        {isOpen && (
          <div className="flex-col w-full lg:flex-row lg:absolute left-0 lg:w-[325px] bg-customDark border-customDark rounded-md shadow-lg left-0 lg:mt-2 top-[45px] lg:pt-[7px] z-20">
            <DerivativesTab sub_header="Futures trading" description="Perpetual or Quarterly Contracts settled in Crypto" img={Futures} onLinkClick={onLinkClick} />
            <DerivativesTab sub_header="Options trading" description="Trade European-style Vanilla Options" img={Options} onLinkClick={onLinkClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SubNavTabs;
