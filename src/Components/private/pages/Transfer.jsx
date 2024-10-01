import React, { useEffect, useState } from 'react'
import SubHeader from '@/Utilities/SubHeader'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from 'react-redux'
import Info from '@/assets/images/info.svg'
import Img from '@/assets/images/btc.png'
import Empty from '@/assets/images/empty.svg'
import { ClipLoader } from 'react-spinners';

function Transfer() {
    const coins = useSelector((state) => state.coins)
    const depositCoin = coins.filter((coin) => coin.Deposit)


    const [balanceMessage, setBalanceMessage] = useState("");
    const [balance, setBalance] = useState({
        balance: 0,
        wallet_name: "BTC"
    });
    const [reciver, setReciver] = useState("");
    const [amount, setAmount] = useState("");
    const [transferMessage, setTransferMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [loading, setLoading] = useState(false);
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
    }
    const handleSelectOption = () => {
        setSelectOption(!selectOption)
    }

    const tableData = [
        // {
        //     Transfer_ID: "528968178", Date: "14-09-2024", User: "lawrencechidebe", User_email: "lawrencechidebe@gmail.com", Amount: 500, Status: "Success"
        // },
    ]

    const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#47DEFF" strokeWidth="12" strokeLinecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
    </svg>

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTransferMessage('');

        if (isNaN(amount) || amount <= 4) {
            setTransferMessage('Minimum transfer is 5 USD.');
            setMessageColor('orangered'); // Set message color to red for error
            setLoading(false);
            return;
        }

        const transferData = {
            "receiver": reciver,
            "amount": parseFloat(amount),
            "source": selectedCoin.Coin,
        }

        const token = localStorage.getItem('authToken');

        if (!token) {
            setTransferMessage('You must be logged in to transfer.');
            setMessageColor('orangered');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://api.horizonvaut.com/wallet/transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(transferData),
            });

            if (response.ok) {
                const result = await response.json();
                setTransferMessage('Transfer successful!');
                setMessageColor('limegreen');
                setReciver("");
                setAmount("");
            } else {
                const error = await response.json();
                if (error.message === "Expired token") {
                    // Handle expired token: Clear the token and redirect to login
                    localStorage.removeItem('authToken'); // Clear the token
                    setTransferMessage('Your session has expired. Please log in again.');
                    setMessageColor("orangered");
                    setTimeout(() => {
                        window.location.href = '/signin'; // Redirect to login page
                    }, 2000); // Wait for 2 seconds before redirect
                } else {
                    setTransferMessage(error.message || 'Transfer failed. Please try again.');
                    setMessageColor("orangered");
                }
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                setTransferMessage('Please check your internet connection.');
            } else {
                setTransferMessage("Error: " + error.message);
            }
            setMessageColor('orangered');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            handleBalance()
        };
    }, []);

    const handleBalance = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            setBalanceMessage('You must be logged in to view your balance.');
            setMessageColor('orangered');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://api.horizonvaut.com/wallet/balance", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Fetched Balance:', result.data); // Log the result to inspect it
                setBalance(result.data); // Ensure result.data is an array
                setBalanceMessage('Balance fetched successfully!');
                setMessageColor('limegreen');
            } else {
                const error = await response.json();
                setBalanceMessage(error.message || 'Failed to fetch balance. Please try again.');
                setMessageColor('orangered');
            }
        } catch (error) {
            setBalanceMessage('An error occurred. Please try again.');
            setMessageColor('orangered');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SubHeader sub_header_icon={wallet_overview} header="Internal transfer" content="Send crypto to Bomib users via email or account ID" />

            <div className='flex gap-[2.5rem] py-[45px] px-[1.5rem] flex-col md:px-[3.5rem] lg:flex-row'>
                <div className='bg-white text-[#667085] rounded-md h-fit w-full lg:w-[70%]'>
                    <form onSubmit={handleTransfer}>
                        <div className='px-[20px] pt-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>1</p>

                            <div className='w-[100%]'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Select coin to internal transfer</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Choose the coin to send</p>

                                <div onClick={handleSelectOption} className='rounded-md cursor-pointer border border-[#dadada] flex items-center justify-between px-[1.5rem] py-[17px]'>
                                    <div className='flex items-center text-[#51535C]'>
                                        <img src={selectedCoin.Image} alt={selectedCoin.Alt} className="h-6 w-6 mr-2" ></img>
                                        <span className='mr-[3px]'>{selectedCoin.Coin}</span>
                                        <span className='font-semibold'>{selectedCoin.Abbr}</span>
                                    </div>
                                    <IoIosArrowDown />
                                </div>

                                <div className='relative z-10 shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'>
                                    {selectOption && (
                                        <div className='absolute w-full bg-white rounded-md h-[318px] overflow-auto border border-[#d0d5dd] shadow-[0_0_10px_rgba(0,_0,_0,_0.25)]'>{depositCoin.map((coin, index) => (
                                            (
                                                depositCoin.map((coin, index) => (
                                                    <div onClick={() => handleSelectedCoin(coin)} key={index} className='border border-b-[#dadada] cursor-pointer border border-[#dadada] flex items-center px-[1.5rem] py-[15px] text-[#51535C] hover:bg-[#f8fafc]'>
                                                        <img src={coin.Image} alt={coin.Alt} className="h-6 w-6 mr-2" />
                                                        <p className='text-[#51535C] mr-[3px]'>{coin.Coin}</p>
                                                        <p className='font-semibold'>{coin.Abbr}</p>
                                                    </div>))
                                            )
                                        ))}
                                        </div>
                                    )}
                                </div>

                                <p className='text-[12px] py-[10px]'>Popular coins:</p>
                                <div className='flex flex-col gap-[15px]'>
                                    <div className='flex flex-wrap gap-[7px]'>
                                        {popularCoins.map((abbr, index) => (
                                            <p
                                                key={index}
                                                onClick={() => handleSelectedCoin(coins.find(coin => coin.Abbr === abbr))}
                                                className={`bg-[#F8FAFC] border border-[#D0D5DD] rounded-[5px] px-[8px] py-[5px] text-[12px] text-[#404053] w-fit cursor-pointer text-center ${selectedCoin.Abbr === abbr ? 'border-[#7044ee]' : ''}`}>
                                                {abbr}
                                            </p>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='px-[20px] py-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>2</p>
                            <div className='w-[100%]'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Recipient email / ID</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Enter the recipient email or account ID of the other user</p>
                                <input
                                    type="text"
                                    placeholder="Enter user email or account ID"
                                    className='rounded-tl-md rounded-bl-md border border-[#dadada] w-[100%] px-[30px] py-[15px] focus:outline-none'
                                    value={reciver}
                                    onChange={(e) => setReciver(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className='px-[20px] pb-[45px] flex gap-[20px] flex-col md:flex-row'>
                            <p className='bg-[#7044ee] h-[24px] w-[24px] px-[10px] py-[8px] flex items-center justify-center text-white rounded-[50%]'>3</p>
                            <div className='w-[100%]'>
                                <p className='text-[#101828] text-[18px] font-semibold'>Amount</p>
                                <p className='text-[12px] pt pb-[7px] pb-[15px]'>Enter the amount to transfer</p>

                                <div className='flex gap-[7px] relative'>
                                    <input
                                        type="text"
                                        placeholder="Enter amount"
                                        className='pr-[10rem] rounded-tl-md rounded-bl-md border border-[#dadada] w-[100%] px-[30px] py-[15px] focus:outline-none'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                    <div className='absolute right-[20px] py-[16px] flex gap-[20px]'>
                                        <p className='px-[1rem] cursor-pointer text-[#7044ee]'>All</p>
                                        <p className='mt-[-10px] mb-[-10px] border border-r-[#dadada]'></p>
                                        <p className='px-[1rem]'>{selectedCoin.Abbr}</p>
                                    </div>
                                </div>

                                {Array.isArray(balance) && balance
                                    .filter((coin) => coin.wallet_name === selectedCoin.Coin)
                                    .map((coin, index) => (
                                        <div key={index} className='flex justify-between text-[12px] mt-[3px]'>
                                            <p>Available: {coin.balance.toFixed(6)} {coin.wallet_name}</p>
                                            <p>Fee: 0 {coin.wallet_name}</p>
                                        </div>
                                    ))}

                                {transferMessage && <p style={{ color: messageColor }}>{transferMessage}</p>}
                                <div>
                                    <button type='submit' className={`bg-[#7044ee] text-white w-full py-[16px] rounded-md mt-[32px] hover:bg-[#825fe9]  ${loading ? 'opacity-50 cursor-default' : ''}`}>
                                        {loading ?
                                            <div className='flex items-center justify-center gap-2'>
                                                Processing... <ClipLoader color={"#ffffff"} loading={loading} size={20} />
                                            </div>
                                            :
                                            'Submit Transfer'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className='flex flex-wrap lg:flex-nowrap items-center lg:justify-center gap-[12px] bg-[#F8FAFC] py-[20px] px-[30px] border border-t-[#dadada] rounded-b-md'>
                            <img src={Info} alt='info' />
                            Please note the network fee will only be charged for withdrawals to non-Bomib addresses. If the recipient address is correct and belongs to a Bomib account, the network fee will not be deducted.
                        </p>
                    </form>
                </div>

                <div className='relative z-[-1] text-[#667085] flex flex-col gap-[2rem] w-full lg:w-[30%] flex-shrink-[1.2]'>
                    <div className="absolute top-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-transparent border-r-green-500 rounded-md"></div>
                    <div className='bg-white rounded-md py-[45px] px-[30px]'>
                        <p className='border-gradient-bottom text-[#101828] text-[18px] font-semibold pb-[3px] w-fit'>Important information</p>
                        <ul className='list-disc list-inside p-4 list-outside'>
                            <li>The recipient (another Bomib user) will instantly receive your transfer. They may find the record in [Transaction History]</li>
                            <li>Please note that for internal transfer within Bomib, no TxID in blockchain will be created</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='px-[1.5rem] mb-[45px] mr-[220px] mt-[34px] w-full md:px-[3.5rem]'>
                <div className='h-[502px] bg-white overflow-auto rounded-md border border-[#dadada]'>
                    <table className='w-full border-collapse border border-gray-300 table-fixed'>
                        <thead>
                            <tr className='bg-bgColourTwo text-left'>
                                <th className='py-[2rem] pl-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[20%] min-w-[180px]'>
                                    Transfer ID
                                </th>
                                <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                                    Date
                                </th>
                                <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                                    User email
                                </th>
                                <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                                    Amount
                                </th>
                                <th className='py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[17.5%] min-w-[120px]'>
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className='text-colorSix text-[14px] max-h-[100vh] relative'>
                            {tableData.length === 0 ? (
                                <tr>
                                    <td colSpan="5">
                                        <div className='min-h-[393px] flex flex-col justify-center items-center'>
                                            <img src={Empty} alt='empty' />
                                            <p>No transfers found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                tableData.map((data, index) => (
                                    <tr className='border-b border-gray-300' key={index}>
                                        <td className='w-[20%] py-[1.2rem] pl-[2rem]'>
                                            {data.Transfer_ID}
                                        </td>
                                        <td className='w-[17.5%] py-[1.2rem]'>
                                            {data.Date}
                                        </td>
                                        <td className='w-[17.5%] py-[1.2rem]'>
                                            {data.User_email}
                                        </td>
                                        <td className='w-[17.5%] py-[1.2rem]'>
                                            ${data.Amount}
                                        </td>
                                        <td className='w-[17.5%] py-[1.2rem]'>
                                            {data.Status}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Transfer