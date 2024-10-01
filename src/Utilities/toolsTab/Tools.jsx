import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import Cap from "../../assets/images/cap.png";
import Screener from "../../assets/images/screener.png";
import Tech from "../../assets/images/tech.png";
import Rates from "../../assets/images/rates.png";
import Heat from "../../assets/images/heat.png";
import ToolsTab from './ToolsTab';

function Tools({ header, onLinkClick, setIsModalOpen }) {
  const StyleLink = "rounded-md text-sm font-medium text-gray-300 hover:text-activeColor flex items-center h-[]";

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
      <div className={`header__link-wrapper flex items-center`}>
          <span className={``}>{header}</span>
          <FaCaretDown className='text-[20px]' />
        </div>
        {isOpen && (
          <div className="flex-col w-full  lg:flex-row lg:absolute left-0 lg:w-[325px] bg-customDark border-customDark rounded-md shadow-lg left-0 lg:mt-2 top-[45px] lg:pt-[7px] z-20">
            <ToolsTab sub_header="Market cap" description="Most of the available crypto assets and sorts them based on market capitalization" img={Cap} onLinkClick={onLinkClick} />
            <ToolsTab sub_header="Market screener" description="Powerful tool that allows filtering instruments based on fundamental data and technical indicators" img={Screener} onLinkClick={onLinkClick} />
            <ToolsTab sub_header="Technical analysis" description="Advanced tool that displays ratings based on technical indicators" img={Tech} onLinkClick={onLinkClick} />
            <ToolsTab sub_header="Cross rates" description="Real-time quotes of selected currencies compared to other major currencies at a glance" img={Rates} onLinkClick={onLinkClick} />
            <ToolsTab sub_header="Currency heat map" description="Quick overview of action in currency markets. Spot strong and weak currencies in real-time and how strong they are in relation to one another" img={Heat} onLinkClick={onLinkClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tools;
