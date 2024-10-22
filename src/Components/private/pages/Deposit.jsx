import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QRCode } from 'antd';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import SubHeader from '@/Utilities/SubHeader'
import Info from '@/assets/images/info.svg'
import Card from '@/assets/images/card (1).png'
import Coin from '@/assets/images/coin.svg'
import { Link } from 'react-router-dom';
import { fetchWalletBalances } from '@/redux/actions';

function Deposite() {
    const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#68BC4A" strokeWidth="12" strokeLinecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
    </svg>

    const coins = useSelector((state) => state.coins)
    const depositCoin = coins.filter((coin) => coin.Deposit)

    const [loading, setLoading] = useState(true);
    const [selectOption, setSelectOption] = useState(false)
    const [selectedCoin, setSelectedCoin] = useState({});
    const popularCoins = ["Tether", "Bitcoin", "Tron", "Ethereum", "USD Coin", "Dogecoin", "Litecoin"]
    const handleSelectedCoin = (coin) => {
        setInputValue(coin.Address);
        setSelectedCoin(coin)
        setSelectOption(false)
        setSelectedNetwork({
            Coin: coin.Coin,
            Abbr: coin.Abbr
        });
    }

    const handleSelectOption = () => {
        setSelectOption(!selectOption)
    }

    const [openNetwork, setOpenNetwork] = useState(false)
    const [selectedNetwork, setSelectedNetwork] = useState({
        Coin: "Bitcoin",
        Abbr: "BTC",
    });
    const networkCoin = depositCoin.filter(
        (coin) => coin.Coin === selectedNetwork.Coin && coin.Abbr === selectedNetwork.Abbr
    );
    const handleSelectNetwork = () => {
        setOpenNetwork(!openNetwork)
    }
    const handleSelectedNetwork = (coin) => {
        setSelectedNetwork(coin)
        setOpenNetwork(false)
    }

    const [size, setSize] = useState(197);
    const [showAddress, setShowAddress] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleShowAddress = () => {
        setIsLoading(true);
        setIsLoading(false);
        setShowAddress(true);
    };

    const [showCode, setShowCode] = useState(false);
    const handleCode = () => {
        setShowCode(!showCode)
    }

    const [inputValue, setInputValue] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const inputRef = useRef(null);

    const handleCopy = () => {
        const textToCopy = inputRef.current.value;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        }
    };


    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const dispatch = useDispatch();
    const listCoin = useSelector((state) => state.coins);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchWalletBalances());
            setLoading(false);
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (coins.length > 0) {
            setSelectedCoin({
                Coin: coins[0].Coin,
                Image: coins[0].Image || '',
            })
            setInputValue(coins[0].Address)
        }
    }, [coins]);

    const copy = <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 11.9058C7.5 9.53335 7.5 8.34712 8.23223 7.61008C8.96447 6.87305 10.143 6.87305 12.5 6.87305L13.3333 6.87305C15.6904 6.87305 16.8689 6.87305 17.6011 7.61008C18.3333 8.34712 18.3333 9.53336 18.3333 11.9058V12.7446C18.3333 15.1171 18.3333 16.3033 17.6011 17.0404C16.8689 17.7774 15.6904 17.7774 13.3333 17.7774H12.5C10.143 17.7774 8.96447 17.7774 8.23223 17.0404C7.5 16.3033 7.5 15.1171 7.5 12.7446L7.5 11.9058Z" stroke="#656E8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M14.1669 6.87158C14.1649 4.39118 14.1276 3.1064 13.4104 2.22668C13.2718 2.05679 13.1171 1.90102 12.9483 1.76159C12.0263 1 10.6566 1 7.91699 1C5.17742 1 3.80764 1 2.88568 1.76159C2.7169 1.90102 2.56214 2.05679 2.42362 2.22668C1.66699 3.15468 1.66699 4.53345 1.66699 7.29098C1.66699 10.0485 1.66699 11.4273 2.42362 12.3553C2.56214 12.5252 2.7169 12.6809 2.88568 12.8204C3.75967 13.5423 5.03608 13.5799 7.50033 13.5819" stroke="#656E8B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    return (
        <>
            <SubHeader sub_header_icon={wallet_overview} header="Deposit coins" content="Top up your account balance with crypto" />

            <div className='flex gap-[2.5rem] py-[45px] px-[1.5rem] flex-col md:px-[3.5rem] lg:flex-row'>
                <div className='bg-white text-[#667085] rounded-md h-fit w-full lg:w-[70%]'>
                    <div>
                        <div className='px-[20px] pt-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>1</p>
                            <div className='w-full'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Select coin to deposit</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Select the cryptocurrency you want to deposit into your account</p>

                                <div onClick={handleSelectOption} className='w-full rounded-md cursor-pointer border border-[#dadada] flex items-center justify-between px-[1.5rem] py-[17px]'>
                                    <div className='flex items-center text-[#51535C]'>
                                        {/* <img src={selectedCoin.Image} alt={selectedCoin.Alt} className="h-6 w-6 mr-2" ></img> */}
                                        <span className='mr-[3px]'>{selectedCoin.Coin}</span>
                                        {/* <span className='font-semibold'>{selectedCoin.Abbr}</span> */}
                                    </div>
                                    <IoIosArrowDown />
                                </div>
                                <div className='relative z-10 shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'>
                                    {loading ?
                                        (<ClipLoader size="20px" />)
                                        :
                                        selectOption && (
                                            <div className='absolute w-full bg-white rounded-md h-[318px] overflow-auto border border-[#d0d5dd] shadow-[0_0_10px_rgba(0,_0,_0,_0.25)]'>
                                                {listCoin.map((coin, index) => (
                                                    <div onClick={() => handleSelectedCoin(coin)} key={index} className='border border-b-[#dadada] cursor-pointer border border-[#dadada] flex items-center px-[1.5rem] py-[15px] text-[#51535C] hover:bg-[#f8fafc]'>
                                                        {/* <img src={coin.Image} alt={coin.Alt} className="h-6 w-6 mr-2" /> */}
                                                        <p className='text-[#51535C] mr-[3px]'>{coin.Coin}</p>
                                                        {/* <p className='font-semibold'>{coin.Abbr}</p> */}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </div>

                                <p className='text-[12px] py-[10px]'>Popular coins:</p>
                                <div className='flex flex-col gap-[15px]'>
                                    <div className='flex flex-wrap gap-[7px]'>
                                        {popularCoins.map((coinName, index) => {
                                            const selectedCoinData = coins.find(coin => coin.Coin === coinName);

                                            return (
                                                <p
                                                    key={index}
                                                    onClick={() => handleSelectedCoin(selectedCoinData)}
                                                    className={`bg-[#F8FAFC] border border-[#D0D5DD] rounded-[5px] px-[8px] py-[5px] text-[12px] text-[#404053] w-fit cursor-pointer text-center ${selectedCoin && selectedCoin.Coin === selectedCoinData?.Coin ? 'border border-[royalblue]' : ''}`}>
                                                    {coinName}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>

                                <Link to="https://www.moonpay.com/buy" className='flex gap-[7px] items-center bg-[#F8FAFC] border border-[#D0D5DD] rounded-[5px] px-[10px] py-[5px] text-[12px] mt-[12px] text-[#404053] w-fit cursor-pointer text-center'>
                                    <img src={Card} alt="card" />
                                    Buy crypto with card
                                </Link>
                            </div>
                        </div>

                        <div className='px-[20px] py-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>2</p>
                            <div className='w-full'>
                                <div>
                                    <p className='text-[#101828] text-[18px] font-semibold'>Select network</p>
                                    <p className='text-[12px] pt pb-[7px] pb-[15px]'>Make sure you selected the same network on the platform where you are withdrawing funds for this deposit</p>
                                </div>

                                <div className='flex gap-[7px] relative'>
                                    <div onClick={handleSelectNetwork} className='w-full cursor-pointer border border-[#dadada] flex items-center justify-between px-[1.5rem] py-[12px]'>
                                        <div className='flex items-center text-[#51535C]'>
                                            <span className='mr-[3px]'>{selectedNetwork.Coin}</span>
                                            {/* <span className='font-semibold'>({selectedNetwork.Abbr})</span> */}
                                        </div>
                                        <IoIosArrowDown />
                                    </div>
                                    {openNetwork && (
                                        <div className='absolute top-[47px] w-full shadow-[0_0_10px_rgba(0,_0,_0,_0.25)]'>
                                            {networkCoin.map((coin, index) => (
                                                <div
                                                    key={index}
                                                    onClickCapture={() => { handleSelectedNetwork(coin) }}
                                                    className='bg-white cursor-pointer py-[12px] px-[24px] border border-[#dadada] hover:bg-[#f8fafc]'>
                                                    {coin.Coin}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-[20px] px-[20px] pb-[25px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>3</p>
                            <div className='w-full'>
                                {!showAddress && (
                                    <p
                                        className={`w-fit py-[9px] px-[41px] bg-[#7044ee] text-white rounded-md text-[16px] cursor-pointer hover:bg-[#7757d6] ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                                        onClick={handleShowAddress}
                                    >
                                        {isLoading ? (
                                            <div className='flex justify-center items-center gap-[7px]'>Show address<ClipLoader color={"#ffffff"} loading={isLoading} size={20} /></div>
                                        ) : (
                                            "Show address"
                                        )}
                                    </p>
                                )}

                                {showAddress && (
                                    <div>
                                        <p className='text-[#101828] text-[18px] font-semibold'>Copy address/Scan QR code</p>
                                        <p className='text-[12px] pt pb-[7px] pb-[15px]'>Go to your other wallet and paste the address that you copied or you can scan QR code from your mobile device</p>
                                        <div className='flex items-center'>
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={inputValue}
                                                onChange={handleChange}
                                                className='rounded-tl-md rounded-bl-md border border-[#dadada] w-full px-[14px] py-[15px] text-center focus:outline-none'
                                                disabled={true}
                                            />

                                            <div className='relative'>
                                                <p onClick={handleCopy} className='bg-[#F8FAFC] flex gap-[5px] border border-[#dadada] px-[14px] px-[20px] py-[15px] text-[#444444] font-semibold cursor-pointer rounded-tr-md rounded-br-md'>
                                                    {copy}
                                                    Copy
                                                </p>

                                                {isCopied && (
                                                    <div className='absolute bottom-[120%] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-sm rounded'>
                                                        Copied!
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <p className='flex items-center gap-[5px] text-[#7044EE] font-semibold tracking-[0.5px] pt-[14px] cursor-pointer w-fit' onClick={handleCode}>
                                            Show QR
                                            {showCode ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </p>

                                        {showCode && (inputValue && (
                                            <QRCode value={inputValue} size={size} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className='flex flex-wrap lg:flex-nowrap items-center lg:justify-center gap-[12px] bg-[#F8FAFC] py-[20px] px-[30px] border border-t-[#dadada] rounded-b-md'>
                            <img src={Info} alt='info' />
                            Transaction confirmation times vary across blockchain networks, usually taking less than 5 minutes, depending on network load.
                        </p>
                    </div>
                </div>

                <div className='relative z-[-1] text-[#667085] flex flex-col gap-[2rem] w-full lg:w-[30%] flex-shrink-[1.2]'>
                    <div className="absolute top-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-transparent border-r-green-500 rounded-md"></div>
                    <div className='bg-white rounded-md py-[45px] px-[30px]'>
                        <p className='border-gradient-bottom text-[#101828] text-[18px] font-semibold pb-[3px] w-fit'>Important information</p>
                        <ul className='list-disc list-inside p-4'>
                            <li>Send only <span className='text-[#7044ee] font-semibold tracking-[0.5px]'>BTC</span> to this deposit address</li>
                            <li>Ensure the network is <span className='text-[#7044ee] font-semibold tracking-[0.5px]'>Bitcoin (BTC)</span></li>
                            <li>Deposits via smart contracts are not supported</li>
                            <li>Do not send NFTs to this address</li>
                        </ul>

                        <div className='flex items-center gap-[20px] border border-[#dadada] bg-[#F8FAFC] px-[14px] py-[16px] rounded-md'>
                            <img src={Coin} alt='coin' />
                            <p>Minimum deposit:0.000543 BTC</p>
                        </div>

                    </div>

                    <div className='bg-white rounded-md flex flex-col py-[1.5rem] gap-[30px] px-[45px] text-[13px]'>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px]'>Is it safe to deposit and store my cryptocurrencies with Horizon Vault?</p>
                            <p>Yes, it is safe to do so! To maintain a high level of asset security and flexibility, Horizon Vault uses an industry-standard cold wallet to keep your deposited assets safe, and a hot wallet that allows for all-day withdrawals. All withdrawals undergo a strict confirmation procedure and every withdrawal request is manually reviewed by our team daily at 0:00AM, 8:00AM, and 4:00PM UTC. In addition, 100% of our traders' deposit assets are segregated from Horizon Vault's own operating budget for increased financial accountability. If you wish to learn more, please refer to our Terms of Service.</p>
                        </div>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px]'>What type of coin deposits does Horizon Vault support?</p>
                            <p>We're constantly working on expanding the types of coin deposits we accept to better suit your needs. Here are the types of coin deposits we currently support: BTC ETH XRP EOS USDT DOGE DOT LTC XLM Note: Each coin must be based and have their transaction hash (TXID) validated on their respective standard blockchains. Depositing a coin type via a blockchain not listed above may result in the permanent loss of your coin.</p>
                        </div>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px]'>I don't see my deposit in my account. Why?</p>
                            <p>There might be a few reasons for the delay. Here are the major reasons for the respective coins: BTC — Unconfirmed transactions on the blockchain (at least 3 confirmation is needed). ETH — Unconfirmed transactions on the blockchain (at least 30 confirmations are needed), or it could be a Smart Contract transaction that Horizon Vault does not currently support. XRP or EOS — Invalid or missing tag/memo when the deposit was made. USDT — Unconfirmed transaction on the blockchain (1 or 30 or 100 confirmations are needed depending if the deposit was an Omni, ERC-20, or TRC-20 transfer).</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Deposite