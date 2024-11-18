import { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import Avatar from "@/assets/images/avatar.png";
import WalletInfoUsername from "@/assets/images/walletInfoUsername.svg";
import WalletInfoMail from "@/assets/images/walletInfoMail.svg";
import WalletInfoId from "@/assets/images/wallet_info_id.svg";
import Unverified from "@/assets/images/unverified.svg";
import Search from "@/assets/images/search.svg";
import { useDispatch, useSelector } from "react-redux";
import Chart from "@/Utilities/Chart";
import SubHeader from "@/Utilities/SubHeader";
import classNames from "classnames";
import { fetchWalletBalances } from "@/redux/actions";
import ClipLoader from "react-spinners/ClipLoader";

function Section() {
  const wallet_overview = (
    <svg
      width="59"
      height="45"
      viewBox="0 0 59 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="52.4746"
        y1="8.35617"
        x2="31.3562"
        y2="38.5254"
        stroke="#FF5B5B"
        strokeWidth="12"
        strokeLinecap="round"
      ></line>
      <line
        x1="29.4746"
        y1="8.35617"
        x2="8.35616"
        y2="38.5254"
        stroke="#7044EE"
        strokeWidth="12"
        strokeLinecap="round"
      ></line>
    </svg>
  );

  const styleInfoTab =
    "bg-white text-black w-full flex items-center rounded-sm md:w-[563px]";
  const styleSubInfoTab =
    "flex flex-col w-full border border-[#dadada] items-center md:h-[175px] gap-4 lg:flex-row lg:gap-4 lg:justify-start md:flex-row";
  const styleBothTabs = "flex gap-1 cursor-pointer w-fit";
  const styleMiniTab =
    "flex bg-bgColourThree text-colorThree rounded-md px-[14px] py-[5px] gap-[5px] w-fit uppercase text-[13px] md:text-[10px] md:items-center lg:text-[13px]";

  const coins = useSelector((state) => state.coins);
  const dispatch = useDispatch();
  const totalSum = coins.reduce((sum, coin) => sum + parseFloat(coin.usdAmount), 0);

  const formattedTotal = totalSum;
  const approximatedTotal = Math.round(totalSum).toFixed(4);

  const dropdownRef = useRef(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userLast, setUserLast] = useState(null);
  const [balanceOption, setBalanceOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Total balance");
  const [searchTerm, setSearchTerm] = useState("");
  const [hideZeroEquivalent, setHideZeroEquivalent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setBalanceOption(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchWalletBalances());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setBalanceOption(false);
  };

  const handleBalanceOption = () => {
    setBalanceOption(!balanceOption);
  };

  const filteredCoins = coins.filter((coin) => {
    const matchesSearch = coin?.Coin?.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const total = parseFloat(coin?.Total || "0");
    const matchesTotal = !hideZeroEquivalent || total !== 0;

    return matchesSearch && matchesTotal;
  });

  const toggleHideZeroEquivalent = () => {
    setHideZeroEquivalent((prev) => !prev);
  };

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserEmail(storedUserDetails.email);
    setUserName(storedUserDetails.username);
    setUserId(storedUserDetails.referral_id);
    setUserLast(storedUserDetails.last_updated);
  }, []);

  return (
    <>
      <SubHeader
        sub_header_icon={wallet_overview}
        header="Wallet overview"
        content="Manage your digital assets"
      />

      <div
        className={classNames(
          "mx-[15px] flex flex-col gap-[25px] my-[20px]",
          "lg:mr-[3.5rem] lg:ml-[3.5rem] lg:my-[30px]"
        )}
      >
        <div
          className={classNames(
            "flex flex-col justify-between gap-[25px] ",
            "lg:flex-row lg:justify-between lg:gap-[43px] lg: lg:w-full",
            "md:flex-col md:justify-between md:w-full md:gap-[43px] md: md:items-center"
          )}
        >
          <div className={`${styleInfoTab}`}>
            <div className={`${styleSubInfoTab}`}>
              <div
                className={classNames(
                  "bg-bgColourTwo w-full flex flex-col items-center justify-center h-fit py-[10px] rounded-md relative",
                  "lg:w-[40%] lg:flex lg:h-full lg:block lg:px-[35px] lg:py-[20px]",
                  "md:w-[45%] md:flex md:h-full md:block md:px-[35px] md:py-[30px]"
                )}
              >
                <div
                  className={`${styleBothTabs} relative`}
                  onClick={handleBalanceOption}
                >
                  <span className="text-[14px]">{selectedOption}</span>
                  <FaCaretDown className="text-[20px]" />

                  {balanceOption && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-[33px] text-center bg-white border border-[#DADADA] shadow-[0_0_4px_rgba(0,0,0,0.25)] rounded-[5px] min-w-[152px] z-10"
                    >
                      <span
                        className="block py-2 border-b border-[#DADADA] cursor-pointer"
                        onClick={() => handleOptionClick("Total balance")}
                      >
                        Total balance
                      </span>
                      <span
                        className="block py-2 border-b border-[#DADADA] cursor-pointer"
                        onClick={() => handleOptionClick("Spot balance")}
                      >
                        Spot balance
                      </span>
                      <span
                        className="block py-2 cursor-pointer"
                        onClick={() => handleOptionClick("Futures balance")}
                      >
                        Futures balance
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-[38px] font-semibold w-fit">
                  ${formattedTotal?.toLocaleString('en-US')}
                </div>
                <div className="text-[12px]">~ {approximatedTotal}</div>
              </div>

              <div className="w-[60%] flex items-center h-full md:ml-[0px]">
                <div className="flex justify-center">
                  <Chart />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styleInfoTab} md:py-[0]`}>
            <div className={`${styleSubInfoTab}`}>
              <div
                className={classNames(
                  "bg-bgColourTwo w-full flex flex-col items-center justify-center h-fit py-[10px] rounded-md relative",
                  "lg:w-[35%] lg:flex lg:h-full lg:block",
                  "md:w-[45%] md:flex md:h-full md:block"
                )}
              >
                <img src={Avatar} alt="avater" className="w-[90px] h-[86px]" />
              </div>

              <div
                className={classNames(
                  "flex flex-col items-center justify-between gap-[10px] h-fit lg:p-[0]",
                  "lg:flex-row lg:w-[65%] md:gap-0",
                  "md:flex-row md:pr-[10px]"
                )}
              >
                <div className="w-[50%] w-full lg:w-[141px] flex flex-col items-center md:block">
                  <div className="flex gap-2 overflow-wrap-anywhere leading-none mb-2">
                    <div>
                      <img
                        src={WalletInfoUsername}
                        alt="wallet_info_username"
                      />
                    </div>
                    <div className="">{userEmail}</div>
                  </div>

                  <div className="flex items-center gap-2 none my-1">
                    <span>
                      <img src={WalletInfoMail} alt="wallet_Info_Mail" />
                    </span>

                    <span className="truncate none mb-2">{userName}</span>
                  </div>

                  <div className="flex items-center gap-2 none mb-2">
                    <span>
                      <img src={WalletInfoId} alt="walle_info_id" />
                    </span>
                    <span>ID: {userId}</span>
                  </div>

                  <div className="text-colorFour text-[14px]">
                    <div>Last activity time:</div>
                    <div>{userLast}</div>
                  </div>
                </div>

                <div className="w-[141px] flex flex-col gap-[15px]">
                  <span className={`${styleMiniTab}`}>
                    <img src={Unverified} alt="unverifed" />
                    Unverified
                  </span>

                  <span className={`${styleMiniTab}`}>
                    <img src={Unverified} alt="unverifed" />
                    Premuim
                  </span>

                  <span className={`${styleMiniTab}`}>
                    <img src={Unverified} alt="unverifed" />
                    V.I.P
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex text-black">
          <div className="relative w-[236px] mr-[60px]">
            <input
              type="text"
              className="w-full text-colorFive border border-gray-300 py-2 px-4 rounded text-black box-border focus:border-blue-500 focus:outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={Search}
              alt="search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-400"
            />
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
            <label className="text-gray-700">
              Hide coins with zero equivalent
            </label>
          </div>
        </div>

        <div className="text-black bg-white text-[14px]">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-bgColourTwo text-left">
                  <th className="py-[2rem] pl-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[30%] min-w-[180px]">
                    Coin
                  </th>
                  <th className="py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]">
                    Total
                  </th>
                  <th className="py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]">
                    In orders
                  </th>
                  <th className="py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]">
                    Equivalent, USD
                  </th>
                  <th className="py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <div className="m-4">
                    <ClipLoader size="30px" padding="2rem" />
                  </div>
                ) : (
                  filteredCoins.map((coin, index) => (
                    <tr className="border-b border-gray-300" key={index}>
                      <td className="flex items-center pl-[0rem] w-[30%] h-[4rem]">
                        {/* <img src={coin.Image} alt={coin.Alt} className='w-[30px] h-[30px]' /> */}
                        <span className="font-semibold ml-[30px] text-[#404053]">
                          {coin.Coin}
                        </span>
                        {/* <span className='text-colorSix ml-[4px]'>{coin.Abbr}</span> */}
                      </td>
                      <td className="w-[17.5%]">
                        {String(coin.Total).slice(0, 10)}
                        <span className="text-colorSix ml-[4px]">
                          {coin.Abbr}
                        </span>
                      </td>
                      <td className="w-[17.5%]">
                        {coin.InOrders}
                        <span className="text-colorSix ml-[4px]">
                          {coin.Abbr}
                        </span>
                      </td>
                      <td className="w-[17.5%]">
                        $ {coin.usdAmount}
                        <span className="text-colorSix ml-[4px]">USD</span>
                      </td>
                      <td className="w-[17.5%]">
                        <div className="flex justify-end pr-[5rem]">
                          <a href="/profile/deposit" className="pr-6">
                            {coin.Deposit}
                          </a>
                          <a href="/profile/withdraw">{coin.Withdraw}</a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section;
