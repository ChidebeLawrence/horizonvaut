import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import Info from "@/assets/images/info.svg";

function Swap() {
  const dropdownRef = useRef(null);
  const coins = useSelector((state) => state.coins);
  const [amount, setAmount] = useState(0);
  const [send, setSend] = useState(false);
  const [receive, setReceive] = useState(false);
  const listCoin = useSelector((state) => state.coins);

  const [balance, setBalance] = useState({
    balance: 100,
    wallet_name: "BTC",
  });
  const [selectedSend, setSelectedSend] = useState({});
  const [selectedReceive, setSelectedReceive] = useState({});

  const handleSendOption = () => {
    setSend((prev) => !prev);
    setReceive(false)
  };
  const handleReceiveOption = () => {
    setReceive((prev) => !prev);
    setSend(false)
  };
  const handleSelectedSend = (coin) => {
    setSelectedSend(coin);
    setSend(false);
  };
  const handleSelectedReveice = (coin) => {
    setSelectedReceive(coin);
    setReceive(false);
  };
  const handleAll = () => {
    setAmount(selectedSend.Total);
  };

  useEffect(() => {
    if (coins.length > 0) {
      setSelectedSend({
        Coin: coins[0].Coin,
        img: coins[0].img,
        Total: coins[0].Total,
      });
    }

    if (coins.length > 0) {
      setSelectedReceive({
        Coin: coins[1].Coin,
        img: coins[1].img,
        Total: coins[1].Total,
      });
    }
  }, [coins]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSend(false);
      setReceive(false);
    }
  };

  useEffect(() => {
    // Set up the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arrow = (
    <svg
      width="34"
      height="49"
      viewBox="0 0 34 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.1675 32.4595C26.5412 33.5672 26.0829 34.3124 25.6913 35.0862C23.8022 38.8174 21.7157 42.3469 18.6888 45.3658C16.3628 47.6868 15.0205 46.7461 13.4628 44.8902C11.6155 42.6875 10.652 40.0024 9.77725 37.2773C9.23213 35.583 8.43582 33.9666 7.68692 32.3452C7.27201 31.4474 7.7269 30.0671 8.66204 29.6977C9.51778 29.3601 9.79724 29.9699 10.0247 30.5623C10.8738 32.7881 11.6043 35.06 12.5463 37.2434C13.2542 38.8857 14.1206 40.4783 15.0932 41.979C16.1589 43.6215 17.2496 43.6764 18.4315 42.1082C19.802 40.2859 21.0234 38.3456 22.206 36.3914C23.1035 34.9065 23.7716 33.2857 24.6772 31.81C24.9546 31.3564 25.9094 30.808 26.1601 30.9566C26.6663 31.2623 26.9002 32.0159 27.1708 32.4604L27.1675 32.4595Z"
        fill="#34394A"
      ></path>
      <path
        d="M15.7577 33.9431C17.9979 29.3246 17.2512 24.9048 16.6917 20.5139C15.9115 14.4342 13.7729 8.76984 11.2998 3.20367C11.1142 2.78548 11.4398 1.88777 11.826 1.53066C12.3488 1.04719 13.0579 1.13798 13.4048 1.98557C14.4007 4.4172 15.6469 6.77417 16.3635 9.28328C17.4618 13.1312 18.461 17.0447 19.0138 20.9979C19.4918 24.4104 19.3348 27.9184 19.352 31.3845C19.3569 32.2786 19.0113 33.1852 18.755 34.0625C18.6529 34.4036 18.4084 34.827 18.1148 34.9574C17.5444 35.2084 16.7473 35.5653 16.3177 35.3439C15.9152 35.1403 15.8689 34.2422 15.7652 33.9416L15.7577 33.9431Z"
        fill="#34394A"
      ></path>
    </svg>
  );

  return (
    <div
      className="flex text-black gap-8 px-2 lg:px-8 py-8 w-full lg:flex-row flex-col">
      <div className="w-full lg:w-1/2 bg-white pt-8" ref={dropdownRef}>
        <div ref={dropdownRef} className="px-[20px] pb-[45px] flex gap-[20px] flex-col md:flex-row">
          <p className="bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]">
            1
          </p>
          <div className="w-[100%] relative">
            <p className="text-[#101828] text-[18px] font-semibold">You send</p>
            <p className="text-[12px] text-gray-400 pt pb-[7px] pb-[15px]">
              Select the crypto asset you want to exchange
            </p>

            <div className="flex gap-[7px] relative">
              <input
                type="text"
                placeholder="Enter amount"
                className="text-black pr-[10rem] rounded-md border border-[#dadada] w-[100%] pl-[20px] py-[18px] focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <div className="relative"></div>

              <div className="absolute right-0 top-0 bottom-0 flex">
                <p
                  className="flex items-center h-fit mt-[20px] px-[1rem] cursor-pointer text-[#7044ee] cursor-pointer"
                  onClick={handleAll}
                >
                  All
                </p>
                <div
                  className="bg-[#f8fafc] border font-semibold text-black flex items-center gap-2 px-6 rounded-tr-md rounded-br-md cursor-pointer"
                  onClick={handleSendOption}
                >
                  {/* <img src={selectedSend.img} className="h-[25px] w-[25px]" /> */}
                  <p>{selectedSend.Coin}</p>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <div>
              {send && (
                <div className="h-[318px] z-10 overflow-y-auto absolute right-0 shadow-md rounded-lg py-[6px] bg-white">
                  {listCoin.map((coin, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectedSend(coin)}
                      className="bg-white font-semibold text-black flex items-center gap-3 px-8 py-2 hover:bg-gray-100 last:border-b-0 border-b border-b-gray-300"
                    >
                      {/* <img
                        src={coin.img}
                        className="h-[25px] w-[25px]"
                        alt={`${coin.name} logo`}
                      /> */}
                      {coin.Coin}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-gray-400 items-center text-[12px] mt-[3px]">
              <p className="flex items-center gap-2">
                <p>Available:</p>
                {/* <p><ClipLoader size="15px" /></p> */}
                {balance.wallet_name && selectedSend.Coin ? (
                  <div>
                    {selectedSend.Total.toFixed(6)} {selectedSend.Coin}
                  </div>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="table mx-auto">{arrow}</div>

        <div className="px-[20px] pb-4 flex gap-[20px] flex-col md:flex-row">
          <p className="bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]">
            2
          </p>
          <div className="w-[100%] relative">
            <p className="text-[#101828] text-[18px] font-semibold">
              You receive
            </p>
            <p className="text-[12px] text-gray-400 pt pb-[7px] pb-[15px]">
              Select the crypto asset you want to exchange
            </p>

            <div className="flex gap-[7px] relative">
              <input
                type="text"
                placeholder="You will receive"
                className="bg-[#eaecef] text-black pr-[10rem] rounded-md border border-[#dadada] w-[100%] pl-[20px] py-[18px] focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled
              />

              <div className="relative"></div>

              <div className="absolute right-0 top-0 bottom-0 flex">
                <div
                  className="bg-[#f8fafc] border font-semibold text-black flex items-center gap-2 px-6 rounded-tr-md rounded-br-md cursor-pointer"
                  onClick={handleReceiveOption}
                >
                  {/* <img
                    src={selectedReceive.img}
                    className="h-[25px] w-[25px]"
                  /> */}
                  <p>{selectedReceive.Coin}</p>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <div>
              {receive && (
                <div className="h-[318px] z-10 overflow-y-auto absolute right-0 shadow-md rounded-lg py-[6px] bg-white">
                  {listCoin.map((coin, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectedReveice(coin)}
                      className="bg-white font-semibold text-black flex items-center gap-2 px-8 py-3 hover:bg-gray-100 last:border-b-0 border-b border-b-gray-300"
                    >
                      {/* <img
                        src={coin.img}
                        className="h-[25px] w-[25px]"
                        alt={`${coin.name} logo`}
                      /> */}
                      {coin.Coin}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-black space-y-2 lg:space-y-0 flex justify-between lg:items-center px-6 flex-col md:flex-row lg:pl-16 lg:pr-6">
          <div className="flex gap-2">
            <p>Reference exchange rate: </p>
            <p>1 BTC</p>
          </div>

          <div className="flex gap-2">
            <p>~</p>
            <p>62691.45000000 USDT</p>
          </div>
        </div>

        <div className="mt-6 mx-auto my-6 p-6 lg:pl-16 lg:pr-6 text-gray-500">
          <button className="w-full bg-[#7044ee] text-white text-center py-4 rounded-md hover:bg-[#825fe9]">
            Submit Swap
          </button>
        </div>

        <p className="text-gray-400 flex flex-wrap lg:flex-nowrap items-center lg:justify-center gap-[12px] bg-[#F8FAFC] py-[20px] px-[30px] border border-t-[#dadada] rounded-b-md">
          <img src={Info} alt="info" />
          Once the conversion is complete, funds will be transferred directly to
          your spot account
        </p>
      </div>

      <div className="w-full lg:w-1/2 h-fit flex flex-col gap-12 bg-white rounded-md py-[45px] px-[30px]">
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            What coins are available in the swap tool?
          </p>
          <p className="text-gray-400 text-[13px] leading-normal">
            The Horizon Vault swap tool currently supports all conversions
            between BTC, ETH, USDT, and USD. These represent the three most
            popular cryptocurrencies used for trading (BTC, ETH, USDT) as well
            as the most popular fiat currency (USD). More coins will also be
            added, so stay tuned!
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">How quick is the conversion?</p>
          <p className="text-gray-400 text-[13px] leading-normal">
            Once you have set the conversion parameters and clicked the Swap
            button, you will receive a quote based on the current conversion
            rate, which will be valid for 7 seconds. If this time expires,
            you’ll have to click the Swap button again. If you are satisfied
            with the quote and click Confirm while the quote is still valid, the
            actual conversion should occur within seconds.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Are there any trading fees?</p>
          <p className="text-gray-400 text-[13px] leading-normal">
            There are no fees for using Swap tool.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            What are the minimum and maximum trade amounts?
          </p>
          <p className="text-gray-400 text-[13px] leading-normal">
            Minimum and maximum trade amounts will be dependent on the coin /
            pair and can be previewed before entering in a trade amount.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Swap;
