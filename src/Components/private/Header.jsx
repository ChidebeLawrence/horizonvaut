import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames';
import Horiznlogo from "@/assets/images/Horiznlogo.fw.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaCaretDown } from 'react-icons/fa';
import Avatar from "@/assets/images/avatar.png"
import WalletOverview from "@/assets/images/wallet-overview.svg"
import WalletAdd from "@/assets/images/wallet-add.svg"
import WalletMenu from "@/assets/images/wallet-menu.svg"
import Settings from "@/assets/images/settings.svg"
import Codes from "@/assets/images/codes.svg"
import Verification from "@/assets/images/verification.svg"
import Support from "@/assets/images/support.svg"
import Exit from "@/assets/images/exit.svg"
import ProfileTab from '@/Utilities/ProfileTab';
import Modal from '@/Utilities/Modal';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Header() {
  const StyleLink = "rounded-md text-sm font-medium text-gray-300 hover:text-activeColor flex items-center h-[20px] gap-5"

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsModalOpen(false);
      setTimeout(() => {
        setOpenMenu(false);
      }, 500);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleIsOpen = () => {
    setIsOpen(false);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('tokenExpiration');
      navigate('/signin');
    }, 500);
  };

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserEmail(storedUserDetails.email);
    setUserName(storedUserDetails.username);
    setUserId(storedUserDetails.userId);
  }, []);


  const menu = <svg width="35" height="35" viewBox="0 0 100 100">
    <path class="header__nav-line header__nav-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"></path>
    <path class="header__nav-line header__nav-line2" d="M 20,50 H 80"></path>
    <path class="header__nav-line header__nav-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"></path>
  </svg>

  const close = <svg width="35" height="35" viewBox="0 0 100 100">
    <path class="header__nav-line header__nav-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"></path>
    <path class="header__nav-line header__nav-line2" d="M 20,50 H 80"></path>
    <path class="header__nav-line header__nav-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"></path>
  </svg>

  return (
    <div className='w-full lg:flex lg:items-center lg:justify-between px-[20px] bg-customDark text-white flex items-center justify-between'>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div>
        <Link to="/" className="flex items-center gap-10 py-[12px]">
          <img src={Horiznlogo} alt='Horiznlogo' className="object-cover h-[30px] w-[30px]" />
          <h1 className='font-bold text-xLarge block block'>Horizon Vault</h1>
        </Link>
      </div>

      <div
        className={classNames(
          'lg:flex lg:flex-row lg:items-center lg:gap-[25px] lg:relative lg:z-0 lg:top-0 lg:px-0 lg:py-0 lg:w-fit lg:overflow-none',
          {
            'block bg-customDark absolute z-10 right-0 top-[60px] h-[445] h-[20] w-[300px] py-[20px] px-[20px] flex flex-col gap-[35px] overflow-y-auto': openMenu,
            'hidden': !openMenu,
          }
        )}
        ref={dropdownRef}
      >
        {/* <Link to="/trading" className={`${StyleLink}`} onClick={handleCloseMenu}>Spot Trading</Link>
        <Link to="#" className={`${StyleLink} flex items-center gap-5 ${StyleLink}`} onClick={handleLinkClick} ref={dropdownRef}>
          Swap<span className="bg-greenTab text-white text-[10px] px-1 h-[20px] w-[24px] text-[8px] text-center rounded-sm flex items-center justify-center h-[16px] w-[25px]">0%</span>
        </Link>

        <Derivatives header="Derivatives" onLinkClick={handleLinkClick} setIsModalOpen={setIsModalOpen} />
        <Tools header="Tools" onLinkClick={handleLinkClick} setIsModalOpen={setIsModalOpen} />

        <Link to="#" className={`${StyleLink}`} onClick={handleLinkClick}>
          Staking
          <span className="bg-redTab text-white text-[10px] px-1 h-[20px] w-[24px] text-[8px] text-center rounded-sm flex items-center justify-center h-[16px] w-[25px]">HOT</span>
        </Link>

        <Earn header="Earn" onLinkClick={handleLinkClick} setIsModalOpen={setIsModalOpen} />
        <More header="More" onLinkClick={handleLinkClick} setIsModalOpen={setIsModalOpen} /> */}

        <Link to="/" className={`${StyleLink}`} onClick={handleCloseMenu}>
          Home
        </Link>

        <Link to="/trading" className={`${StyleLink}`} onClick={handleCloseMenu}>Price</Link>

        <Link to="/profile/swap" className={`${StyleLink} flex items-center gap-5 ${StyleLink}`} ref={dropdownRef}>
          Swap<span className="bg-greenTab text-white text-[10px] px-1 h-[20px] w-[24px] text-[8px] text-center rounded-sm flex items-center justify-center h-[16px] w-[25px]">0%</span>
        </Link>

        <Link to="/profile/investment" className={`${StyleLink} flex items-center gap-5 ${StyleLink}`} ref={dropdownRef}>
          Invexstment
        </Link>

        <Link to="/profile/support" className={`${StyleLink}`} onClick={handleCloseMenu}>
          Support
          <span className="bg-redTab text-white text-[10px] px-1 h-[20px] w-[24px] text-[8px] text-center rounded-sm animate-fade">1</span>
        </Link>

        {/* <Link to="#" className={`${StyleLink} lg:block hidden`} onClick={handleLinkClick}>My NFTs</Link>*/}
        <p className={`${StyleLink} hover:text-[#d1d5db] lg:block hidden`}>Wallet: 0 USD</p> 
      </div>

      <div className="relative flex items-center" ref={dropdownRef}>
        <div className='rounded-md py-2 text-sm font-medium text-gray-300 cursor-pointer flex items-center' onClick={handleDropdown}>
          <span className={classNames(
            ' bg-activeBg p-[10px] rounded-md pr-[17px]',
            'lg:flex lg:items-center lg:h-[38px] hidden',
            'md:flex md:items-center md:h-[38px] hidden',
          )}>
            {userEmail} <FaCaretDown className='text-[20px]' />
          </span>
          <div className='w-[40px]'>
            <img src={Avatar} alt='avater' className='h-[40px] w-[40px] ml-[-15px]' />
          </div>
        </div>

        {isOpen && (
          <div className={classNames(
            'absolute bg-[#18191C] top-[58px] right-[-20px] w-[280px] text-white shadow-lg rounded-bl-lg z-20',
            'lg'
          )}>
            <div className="mx-[25px] mb-[16px] mt-[32px] flex justify-center items-center bg-[#121212] border border-[#282828] rounded-[5px] w-[full] h-[74px] relative pl-[9px] menu__overview">
              <div className="flex mr-[18px] w-[33px]">
                <img src={WalletOverview} alt="Assets overview" className="w-[33px]" />
              </div>
              <div className="flex flex-col">
                <div className="text-[11px] leading-[16px] text-[#717171]">
                  Assets overview
                </div>
                <div className="text-[16px] leading-[22px]">
                  <span>0</span> USD
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-[10px] w-[full]">
              <Link to="/profile/deposit" onClick={handleIsOpen} className="hover:bg-[#2b2d33] flex items-baseline justify-center gap-[5px] inline-block text-sm leading-4 text-white bg-[#23262e] border border-gray-700 rounded-md min-w-[106px] py-3 text-center" href="@/profile/deposit">
                <img src={WalletAdd} alt="wallet-add" />
                Deposit
              </Link>
              <Link to="/profile/withdraw" onClick={handleIsOpen} className="hover:bg-[#2b2d33] flex baseline-center justify-center gap-[5px] inline-block text-sm leading-4 text-white bg-[#23262e] border border-gray-700 rounded-md min-w-[106px] py-3 text-center" href="@/profile/withdraw">
                <img src={WalletAdd} alt="wallet-add" />
                Withdraw
              </Link>
            </div>

            <div className='py-[1rem] border-t border-[#2b2d33] border-b border-[#2b2d33]'>
              <ProfileTab wallet_menu={WalletMenu} alt="wallet-menu" title="Wallet" to="profile/wallet" onclick={handleDropdown} />
              <ProfileTab wallet_menu={Settings} alt="settings" title="Account settings" to="profile/settings" onclick={handleDropdown} />
              <ProfileTab wallet_menu={Verification} alt="verification" title="Verification" to="profile/verification" onclick={handleDropdown} />
              <ProfileTab wallet_menu={Codes} alt="codes" title="Gift codes" to="profile/promo-codes" onclick={handleDropdown} />
              <ProfileTab wallet_menu={Support} alt="support" to="profile/support" title={<>Support <span className="bg-redTab text-white text-[10px] py-1 px-2 text-[8px] text-center rounded-[50%] animate-fade">1</span></>} onclick={handleDropdown} />
            </div>

            <div className='flex items-center justify-between pl-[25px] pr-[20px] pb-[16px]'>
              <Link to="/profile/2fa-security" className='flex items-center gap-2'>
                <img src={Avatar} alt='avatar' className='w-[42px] h-[40]' onClick={handleDropdown} />
                <div>
                  <p className='text-[12px]'>{userEmail}</p>
                  <p className='text-[10px]'>{userName}</p>
                </div>
              </Link>

              <img src={Exit} alt="exit" className='cursor-pointer' onClick={handleLogout} />
            </div>
          </div>
        )}

        {openMenu ? <IoClose className='h-[25px] w-[25px] cursor-pointer lg:hidden' onClick={handleOpenMenu} /> : <GiHamburgerMenu className='h-[25px] w-[25px] cursor-pointer lg:hidden' onClick={handleOpenMenu} />}
      </div>

    </div>
  )
}

export default Header
