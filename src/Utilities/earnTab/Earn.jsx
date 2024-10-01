import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import Copy from "../../assets/images/copy.png"
import Bots from "../../assets/images/bots.png"
import Launchpad from "../../assets/images/launchpad.png"
import Space from "../../assets/images/space.png"
import Savings from "../../assets/images/savings.png"
import Eth20 from "../../assets/images/eth20.png"
import EarnTab from './EarnTab';

function Earn({ header, onLinkClick, setIsModalOpen }) {
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
          <div className="flex-col w-full  lg:flex-row lg:absolute left-0 lg:w-[325px] bg-customDark border-customDark rounded-md shadow-lg left-0 lg:mt-2 top-[45px] lg:pt-[7px] z-20">
            <EarnTab sub_header="Copy trading" description="Most of the available cypto assets and sorts them base on market capitalisation" img={Copy} onLinkClick={onLinkClick} />
            <EarnTab sub_header="Trading bots" description="Intelligent" img={Bots} onLinkClick={onLinkClick} />
            <EarnTab sub_header="Launchpad" description="Early easy access to new, high-quality crypto projects" img={Launchpad} onLinkClick={onLinkClick} />
            <EarnTab sub_header="Space traveller" description="Value-added product for flexible returns" img={Space} onLinkClick={onLinkClick} />
            <EarnTab sub_header="Savings" description="Intelligent pre-built trading bots help you auto-trade and earn all-day-long" img={Savings} onLinkClick={onLinkClick} />
            <EarnTab sub_header="ETH 2.0 Staking" description="Don't just hold. Earn an additional 5%-20% locking return" img={Eth20} onLinkClick={onLinkClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Earn;
