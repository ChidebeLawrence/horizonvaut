import React, { useState, useRef, useEffect } from 'react'
import { FaCaretDown } from 'react-icons/fa';
import Avatar from "@/assets/images/avatar.png"
import WalletInfoUsername from "@/assets/images/walletInfoUsername.svg"
import WalletInfoMail from "@/assets/images/walletInfoMail.svg"
import WalletInfoId from "@/assets/images/wallet_info_id.svg"
import Unverified from "@/assets/images/unverified.svg"
import Search from "@/assets/images/search.svg"
import { useSelector } from 'react-redux';
import Chart from '@/Utilities/Chart';
import SubHeader from '@/Utilities/SubHeader';
import classNames from 'classnames';

function Section() {
  const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#FF5B5B" strokeWidth="12" strokeLinecap="round"></line>
    <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
  </svg>

  const styleInfoTab = "bg-white text-black w-full flex items-center rounded-sm md:w-[563px]"
  const styleSubInfoTab = "flex flex-col w-full items-center h-full gap-[0] lg:flex-row lg:gap-[0] lg:justify-between md:flex-row"
  const styleBothTabs = "flex gap-1 cursor-pointer w-fit"
  const styleMiniTab = "flex bg-bgColourThree text-colorThree rounded-md px-[14px] py-[5px] gap-[5px] w-fit uppercase text-[13px] md:text-[10px] md:items-center lg:text-[13px]"

  const coins = useSelector((state) => state.coins).slice(1);

  const dropdownRef = useRef(null);
  const [balanceOption, setBalanceOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Total balance');
  const [searchTerm, setSearchTerm] = useState('');
  const [hideZeroEquivalent, setHideZeroEquivalent] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBalanceOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setBalanceOption(false);
  };

  const handleBalanceOption = () => {
    setBalanceOption(!balanceOption)
  }

  const filteredCoins = coins.filter(coin => {
    const matchesSearch = coin.Coin.toLowerCase().includes(searchTerm.toLowerCase());
    const equivalent = parseFloat(coin.Equivalent);

    const matchesEquivalent = !hideZeroEquivalent || equivalent !== 0;
    return matchesSearch && matchesEquivalent;
  });

  const toggleHideZeroEquivalent = () => {
    setHideZeroEquivalent(prev => !prev);
  };

  return (
    <>
      <SubHeader sub_header_icon={wallet_overview} header="Wallet overview" content="Manage your digital assets" />

      <div className={classNames(
        'mx-[15px] flex flex-col gap-[25px] my-[20px]',
        'lg:mr-[3.5rem] lg:ml-[3.5rem] lg:my-[30px]',
      )}>
        <div className={
          classNames(
            'flex flex-col justify-between gap-[25px] ',
            'lg:flex-row lg:justify-between lg:gap-[43px] lg: lg:w-full',
            'md:flex-col md:justify-between md:w-full md:gap-[43px] md: md:items-center'
          )
        }>
          <div className={`${styleInfoTab}`}>
            <div className={`${styleSubInfoTab}`}>
              <div className={classNames(
                'bg-bgColourTwo w-full flex flex-col items-center justify-center h-fit py-[10px] rounded-md relative',
                'lg:w-[12rem] lg:h-full lg:block lg:px-[35px] lg:py-[20px]',
                'md:w-[12rem] md:h-full md:block md:px-[35px] md:py-[30px]',
              )}>
                <div className={`${styleBothTabs} relative`} onClick={handleBalanceOption}>
                  <span className='text-[14px]'>{selectedOption}</span>
                  <FaCaretDown className='text-[20px]' />

                  {balanceOption && (
                    <div ref={dropdownRef} className='absolute top-[33px] text-center bg-white border border-[#DADADA] shadow-[0_0_4px_rgba(0,0,0,0.25)] rounded-[5px] min-w-[152px] z-10'>
                      <span className='block py-2 border-b border-[#DADADA] cursor-pointer' onClick={() => handleOptionClick('Total balance')}>Total balnce</span>
                      <span className='block py-2 border-b border-[#DADADA] cursor-pointer' onClick={() => handleOptionClick('Spot balance')}>Spot balance</span>
                      <span className='block py-2 cursor-pointer' onClick={() => handleOptionClick('Futures balance')}>Futures balance</span>
                    </div>
                  )}
                </div>
                <div className='text-[38px] font-semibold'>0$</div>
                <div className='text-[12px]'>~ 0.00000000 BTC</div>
              </div>

              <div className='w-fill-available h-full md:ml-[30px]'>
                <div className="flex justify-center md:justify-start">
                  <Chart />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styleInfoTab} md:py-[0]`}>
            <div className={`${styleSubInfoTab} lg:gap-[30px] md:gap-[0px]`}>
              <div className={classNames(
                'bg-bgColourTwo w-[100%] h-full flex items-center justify-center py-[20px]',
                'lg:w-[30%] lg:h-[175px] lg:flex lg:items-center lg:justify-center lg:py-[30px]',
                'md:w-[12rem] md:h-[175px] md:flex',
              )}>
                <img src={Avatar} alt='avater' className='w-[90px] h-[86px]' />
              </div>

              <div className={classNames(
                'flex flex-col items-center justify-center gap-[10px] h-fit py-[10px]',
                'lg:flex-row lg:py-[0x] md:gap-0',
                'md:flex-row md:py-[0x]',
              )}>
                <div className='w-[50%] mr-[0] w-full lg:w-[141px] flex flex-col items-center md:block lg:mr-[49px]'>
                  <div className='flex gap-2 overflow-wrap-anywhere leading-none mb-2'>
                    <div>
                      <img src={WalletInfoUsername} alt='wallet_info_username' />
                    </div>
                    <div className=''>lawrencechidebe@gmail.com</div>
                  </div>

                  <div className='flex items-center gap-2 none my-1'>
                    <span>
                      <img src={WalletInfoMail} alt='wallet_Info_Mail' />
                    </span>

                    <span className='truncate none mb-2'>lawrencechidebe</span>
                  </div>

                  <div className='flex items-center gap-2 none mb-2'>
                    <span>
                      <img src={WalletInfoId} alt='walle_info_id' />
                    </span>
                    <span>ID: 528968178</span>
                  </div>

                  <div className='text-colorFour text-[14px]'>
                    <div>Last activity time:</div>
                    <div>2024/09/03 08:36:27</div>
                  </div>
                </div>


                <div className='w-[141px] flex flex-col gap-[15px]'>
                  <span className={`${styleMiniTab}`}>
                    <img src={Unverified} alt='unverifed' />
                    Unverified
                  </span>

                  <span className={`${styleMiniTab}`}>
                    <img src={Unverified} alt='unverifed' />
                    Premuim
                  </span>

                  <span className={`${styleMiniTab}`}>
                    <img src={Unverified} alt='unverifed' />
                    V.I.P
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex text-black'>
          <div className='relative w-[236px] mr-[60px]'>
            <input
              type="text"
              className="w-full text-colorFive border border-gray-300 py-2 px-4 rounded text-black box-border focus:border-blue-500 focus:outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={Search} alt='search' className='absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-400' />
          </div>

          <div
            className="flex items-center gap-2"
            onClick={toggleHideZeroEquivalent}
          >
            <input
              type="checkbox"
              className="border-blue-500 border-2 rounded w-[20px] h-[20px]"
              checked={hideZeroEquivalent}
              readOnly
            />
            <label className="text-gray-700">Hide coins with zero equivalent</label>
          </div>
        </div>

        <div className='text-black bg-white text-[14px]'>
          <div className="overflow-x-auto">
            <table className='min-w-[900px] w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-bgColourTwo text-left'>
                  <th className='py-[2rem] pl-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[30%] min-w-[180px]'>
                    Coin
                  </th>
                  <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                    Total
                  </th>
                  <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                    In orders
                  </th>
                  <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                    Equivalent, USD
                  </th>
                  <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCoins.map((coin, index) => (
                  <tr className='border-b border-gray-300' key={index}>
                    <td className='flex items-center pl-[2rem] w-[30%] h-[4rem]'>
                      <img src={coin.Image} alt={coin.Alt} className='w-[30px] h-[30px]' />
                      <span className='font-semibold ml-[30px] text-[#404053]'>{coin.Coin}</span>
                      <span className='text-colorSix ml-[4px]'>{coin.Abbr}</span>
                    </td>
                    <td className='w-[17.5%]'>
                      {coin.Total}
                      <span className='text-colorSix ml-[4px]'>{coin.Abbr}</span>
                    </td>
                    <td className='w-[17.5%]'>
                      {coin.InOrders}
                      <span className='text-colorSix ml-[4px]'>{coin.Abbr}</span>
                    </td>
                    <td className='w-[17.5%]'>
                      {coin.Equivalent}
                      <span className='text-colorSix ml-[4px]'>USD</span>
                    </td>
                    <td className='w-[17.5%]'>
                      <div className='flex justify-end pr-[5rem]'>
                        <a href="#" className="pr-6">{coin.Deposit}</a>
                        <a href="#">{coin.Withdraw}</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </>
  )
}

export default Section