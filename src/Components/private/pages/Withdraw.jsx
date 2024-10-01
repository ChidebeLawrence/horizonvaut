import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SubHeader from '@/Utilities/SubHeader'
import Info from '@/assets/images/info.svg'
import Img from '@/assets/images/btc.png'
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function Withdraw() {
    const coins = useSelector((state) => state.coins)
    const depositCoin = coins.filter((coin) => coin.Deposit)
    const networkCoin = depositCoin.slice(0, 1)

    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageColor, setMessageColor] = useState('');
    const [withdrawalMessage, setWithdrawalMessage] = useState('');
    const [openNetwork, setOpenNetwork] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [selectOption, setSelectOption] = useState(false)
    const [selectedCoin, setSelectedCoin] = useState({
        Coin: "Bitcoin",
        Abbr: "BTC",
        Image: Img,
        Alt: "btc"
    });

    const popularCoins = ["USDT", "BTC", "TRX", "ETH", "USDC", "XRP", "LTC"]
    const handleSelectedCoin = (coin) => {
        setSelectedCoin(coin)
        setSelectOption(false)
        setSelectedNetwork({
            Coin: coin.Coin,
            Abbr: coin.Abbr
        });

    }
    const [selectedNetwork, setSelectedNetwork] = useState({
        Coin: "Bitcoin",
        Abbr: "BTC",
    });

    const handleSelectOption = () => {
        setSelectOption(!selectOption)
    }
    const handleSelectNetwork = () => {
        setOpenNetwork(!openNetwork)
    }
    const handleSelectedNetwork = (coin) => {
        setSelectedNetwork(coin)
        setOpenNetwork(false)
    }

    const handleWithdrawal = async (e) => {
        e.preventDefault();
        setLoading(true);
        setWithdrawalMessage('');

        const withdrawalData = {
            destination_address: destinationAddress,
            amount: parseFloat(amount),
            network: selectedNetwork.Abbr,
            source: selectedCoin.Coin,
        };

        const token = localStorage.getItem('authToken');

        if (!token) {
            setWithdrawalMessage('You must be logged in to withdraw.');
            setLoading(false);
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setWithdrawalMessage('Withdrawal amount must be greater than 0.');
            setMessageColor('orangered'); // Set message color to red for error
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://api.horizonvaut.com/wallet/withdraw", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(withdrawalData),
            });

            if (response.ok) {                
                setWithdrawalMessage('Withdrawal successful!');
                setMessageColor('limegreen');
            } else {
                const error = await response.json();
                setWithdrawalMessage(error.message || 'Withdrawal failed. Please try again.');
                setMessageColor('orangered');
            }
        } catch (error) {
            setMessageColor('orangered');
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#FFB547" strokeWidth="12" strokeLinecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
    </svg>

    return (
        <div>
            <SubHeader sub_header_icon={wallet_overview} header="Withdraw coins" content="Withdraw your digital funds in few minutes" />

            <div className='flex gap-[2.5rem] py-[45px] px-[1.5rem] flex-col md:px-[3.5rem] lg:flex-row '>
                <div className='bg-white text-[#667085] rounded-md h-fit w-full lg:w-[70%]'>
                    <form onSubmit={handleWithdrawal}>
                        <div className='px-[20px] pt-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>1</p>
                            <div className='w-full'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Select coin to withdraw</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Select the cryptocurrency you want to withdraw from your account</p>

                                <div onClick={handleSelectOption} className='w-full rounded-md cursor-pointer border border-[#dadada] flex items-center justify-between px-[1.5rem] py-[17px]'>
                                    <div className='flex items-center text-[#51535C]'>
                                        <img src={selectedCoin.Image} alt={selectedCoin.Alt} className="h-6 w-6 mr-2" ></img>
                                        <span className='mr-[3px]'>{selectedCoin.Coin}</span>
                                        <span className='font-semibold'>{selectedCoin.Abbr}</span>
                                    </div>
                                    <IoIosArrowDown />
                                </div>
                                <div className='relative z-10 shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'>
                                    {selectOption && (
                                        <div className='absolute w-full bg-white rounded-md h-[318px] overflow-auto border border-[#d0d5dd] shadow-[0_0_10px_rgba(0,_0,_0,_0.25)]'>
                                            {coins.map((coin, index) => (
                                                <div onClick={() => handleSelectedCoin(coin)} key={index} className='border border-b-[#dadada] cursor-pointer border border-[#dadada] flex items-center px-[1.5rem] py-[15px] text-[#51535C] hover:bg-[#f8fafc]'>
                                                    <img src={coin.Image} alt={coin.Alt} className="h-6 w-6 mr-2" />
                                                    <p className='text-[#51535C] mr-[3px]'>{coin.Coin}</p>
                                                    <p className='font-semibold'>{coin.Abbr}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <p className='text-[12px] py-[10px]'>Popular coins:</p>
                                <div className='flex flex-col gap-[15px]'>
                                    <div className='flex flex-wrap gap-[7px]'>
                                        {popularCoins.map((item, index) => (
                                            <p
                                                key={index}
                                                onClick={() => handleSelectedCoin(coins.find(coin => coin.Abbr === item || coin.Coin === item))}
                                                className={`bg-[#F8FAFC] border border-[#D0D5DD] rounded-[5px] px-[8px] py-[5px] text-[12px] text-[#404053] w-fit cursor-pointer text-center ${selectedCoin.Abbr === item || selectedCoin.Coin === item ? 'border-[royalblue]' : ''}`}>
                                                {item}
                                            </p>
                                        ))}
                                        <Link to="/profile/withdraw-usdt" className='bg-[#F8FAFC] border border-[#D0D5DD] rounded-[5px] px-[8px] py-[5px] text-[12px] text-[#404053] w-fit cursor-pointer text-center'>Bank Card</Link>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='px-[20px] py-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>2</p>
                            <div>
                                <div>
                                    <p className='text-[#101828] text-[18px] font-semibold'>Select network</p>
                                    <p className='text-[12px] pt pb-[7px] pb-[15px]'>Please ensure your receiving platform supports the token and network you are withdrawing. If you are unsure, kindly check with the receiving platform first.</p>
                                </div>

                                <div className='flex gap-[7px] relative'>
                                    <div onClick={handleSelectNetwork} className='w-full cursor-pointer border border-[#dadada] flex items-center justify-between px-[1.5rem] py-[12px]'>
                                        <div className='flex items-center text-[#51535C]'>
                                            <span className='mr-[3px]'>{selectedNetwork.Coin}</span>
                                            <span className='font-semibold'>({selectedNetwork.Abbr})</span>
                                        </div>
                                        <IoIosArrowDown />
                                    </div>
                                    {openNetwork && (
                                        <div className='absolute top-[47px] w-full shadow-[0_0_10px_rgba(0,_0,_0,_0.25)]'>
                                            {networkCoin.map((coin, index) => (
                                                <div key={index} onClickCapture={() => { handleSelectedNetwork(coin) }} className='bg-white cursor-pointer py-[12px] px-[24px] border border-[#dadada] hover:bg-[#f8fafc]'>{selectedNetwork.Coin} ({selectedNetwork.Abbr})</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='px-[20px] flex gap-[20px] w-full flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>3</p>
                            <div className='w-full'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Address</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Enter the recipient's crypto address</p>
                                <input
                                    type="text"
                                    placeholder="Enter destination address"
                                    className='rounded-md border w-full px-[30px] py-[15px] focus:outline-none mt-4'
                                    value={destinationAddress}
                                    onChange={(e) => setDestinationAddress(e.target.value)}
                                    required
                                />

                            </div>
                        </div>

                        <div className='px-[20px] py-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>4</p>
                            <div className='w-[100%]'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Amount</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Specify the amount of coins/tokens you want to withdraw from your account</p>

                                <div className='flex gap-[7px] relative z-auto'>
                                    <input
                                        type="text"
                                        placeholder="Enter amount"
                                        className='rounded-md border w-full px-[30px] py-[15px] focus:outline-none mt-4'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                    <div className='absolute right-[20px] py-[16px] flex gap-[20px] top-[15px]'>
                                        <p className='px-[1rem] cursor-pointer text-[#7044ee]'>All</p>
                                        <p className='mt-[-10px] mb-[-10px] border border-r-[#dadada]'></p>
                                        <p className='px-[1rem]'>{selectedNetwork.Abbr}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between text-[12px] mt-[3px]'>
                                    <p>Available: 0 BTC</p>
                                    <p>Fee: 0.000018 {selectedNetwork.Abbr}</p>
                                </div>
                                {withdrawalMessage && <p style={{ color: messageColor }}>{withdrawalMessage}</p>}
                                <div>
                                    <button type='submit' className={`bg-[#7044ee] text-white w-full py-[16px] rounded-md mt-[32px] hover:bg-[#825fe9] ${loading ? 'opacity-50 cursor-default' : ''}`} disabled={loading}>
                                        {loading ?
                                            <div className='flex items-center justify-center gap-2'>
                                                Processing... <ClipLoader color={"#ffffff"} loading={loading} size={20} />
                                            </div>
                                            :
                                            'Withdraw'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className='flex flex-wrap lg:flex-nowrap items-center lg:justify-center gap-[12px] bg-[#F8FAFC] py-[20px] px-[30px] border border-t-[#dadada] rounded-b-md'>
                            <img src={Info} alt='info' />
                            The withdrawal normally completes within 30 min. If your transaction is still not completed within the indicated timeframe, please contact our customer support team for further assistance.
                        </p>
                    </form>
                </div>

                <div className='relative z-[-1] text-[#667085] flex flex-col gap-[2rem] w-full lg:w-[30%] flex-shrink-[1.2]'>
                    <div className="absolute top-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-transparent border-r-green-500 rounded-md"></div>
                    <div className='bg-white rounded-md py-[45px] px-[30px]'>
                        <p className='border-gradient-bottom text-[#101828] text-[18px] font-semibold pb-[3px] w-fit'>Important information</p>
                        <ul className='list-disc list-outside p-4'>
                            <li>Do not transfer your assets to any non BTC addresses as you may not be able to retrieve the BTC asset after.</li>
                            <li>Please check your withdrawal address carefully; once a withdrawal request is issued, it cannot be recalled.</li>
                        </ul>
                    </div>

                    <div className='bg-white rounded-md flex flex-col gap-[45px] py-[1.5rem] px-[45px] text-[13px]'>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px] text-[#101820]'>When does bomib.com process withdrawal requests?</p>
                            <p>Instant withdrawal may take 5 to 30 min to process. However, please note that in the event of high network congestion, withdrawals may take longer time.</p>
                        </div>
                        <div>
                            <p className='text-[14px] font-semibold -[10px] text-[#101820]'>Is withdrawal fee already included in the withdrawal amount I have indicated?</p>
                            <p>No, the withdrawal fee will charged beyond the indicated withdrawal amount. If traders want to withdraw all the withdrawable amount, traders can click on the "All" button and system will automatically input the amount after fees.</p>
                        </div>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px] text-[#101820]'>Does bomib.com support withdrawals to a Smart Contract ETH wallet address?</p>
                            <p>No, bomib.com does not support ETH withdrawals via Smart Contracts method. Instead, bomib.com only supports ETH withdrawals via Direct Transfer method.</p>
                        </div>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px] text-[#101820]'>Does bomib.com support withdrawals to a segwit BTC wallet address?</p>
                            <p>Yes, bomib.com supports withdrawals to segwit BTC wallet addresses starting with "bc1", also known as bech32 addresses.</p>
                        </div>
                        <div>
                            <p className='text-[14px] font-semibold pb-[10px] text-[#101820]'>Can traders fix their own withdrawal fees on bomib.com?</p>
                            <p>At the moment, no. However, bomib.com is considering enabling this option for traders to determine their own withdrawal fees in the future.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdraw