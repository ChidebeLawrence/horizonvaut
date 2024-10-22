import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import Nft from "../../assets/images/nft.png"
import P2p from "../../assets/images/p2p.png"
import CardOne from "../../assets/images/card.png"
import Tokenlist from "../../assets/images/tokenlist.png"
import Inst from "../../assets/images/inst.png"
import CardTwo from "../../assets/images/card.svg"
import Ventures from "../../assets/images/ventures.png"
import MoreTab from './MoreTab';

function More({ header, onLinkClick, setIsModalOpen }) {
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
    // if (window.innerWidth < 1024) {
    setIsOpen(!isOpen);
    // }
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
          <div className="">
          </div>
        </div>
        {isOpen && (
          <div className="flex-col w-full  lg:flex-row lg:absolute left-0 lg:w-[325px] bg-customDark border-customDark rounded-md shadow-lg left-0 lg:mt-2 top-[45px] lg:pt-[7px] z-20">
            <MoreTab sub_header="NFT marketplace" description="Explore NFTs from creators worldwide" img={Nft} onLinkClick={onLinkClick} />
            <MoreTab sub_header="P2P trading" description="Buy crypto from verified merchants" img={P2p} onLinkClick={onLinkClick} />
            <MoreTab sub_header="Buy crypto with card" description="Buy crypto via Card, Apple Pay, Google Pay" img={CardOne} onLinkClick={onLinkClick} />
            <MoreTab sub_header="Token listing" description="We can list your project on our exchange within 48 hours" img={Tokenlist} onLinkClick={onLinkClick} />
            <MoreTab sub_header="Institutional home" description="Horizon Vault offers the world's most powerful suite of institutional crypto trading solutions" img={Inst} onLinkClick={onLinkClick} />
            <MoreTab sub_header="Horizon Vault Card" description="Order and ise your card anywhere Visa® debit cards are accepted, at 40M+ merchants worldwide." img={CardTwo} onLinkClick={onLinkClick} />
            <MoreTab sub_header="Horizon Vault Ventures" description="Horizon Vault Ventures is a fund focused on exploring high-quality projects with great potential" img={Ventures} onLinkClick={onLinkClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default More;
