import React, { useState, useEffect } from 'react'
import SubHeader from '@/Utilities/SubHeader'
import Empty from '@/assets/images/empty.svg'
import { ClipLoader } from 'react-spinners';

function History() {
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const [error, setError] = useState('');

    const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#FF5B5B" strokeWidth="12" strokeLinecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
    </svg>

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true)

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch("https://api.horizonvaut.com/wallet/history", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }

            const result = await response.json();
            const transactionData = result.data;

            const transactionList = transactionData.map((transaction) => ({
                time: transaction.last_updated,
                formattedTime: new Date(transaction.last_updated * 1000).toLocaleDateString("en-US"), // Display in table
                type: capitalizeFirstLetter(transaction.transaction_type),
                amount: transaction.amount,
                asset: transaction.coin.symbol.toUpperCase(),
                status: capitalizeFirstLetter(transaction.status),
                address: transaction.receiver.email,
            }));

            const sortedTransactions = transactionList.sort((a, b) => b.time - a.time);
            setTransaction(sortedTransactions);
            setError("")

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <SubHeader sub_header_icon={wallet_overview} header="Transaction history" content="Your recent transactions" onClick={fetchHistory} />

            <div className='px-[1.5rem] py-[30px] w-full md:px-[3.5rem]'>
                <div className='h-[575px] bg-white overflow-auto rounded-md border border-[#dadada]'>
                    <div className='overflow-x-auto overflow-y-auto h-full'>
                        <table className='min-w-[900px] w-full border-collapse'>
                            <thead>
                                <tr className='bg-bgColourTwo text-left'>
                                    <th className='border-none py-[2rem] pl-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/6'>
                                        Time
                                    </th>
                                    <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/6'>
                                        Type
                                    </th>
                                    <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/6'>
                                        Amount
                                    </th>
                                    <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/6'>
                                        Asset
                                    </th>
                                    <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/6'>
                                        Status
                                    </th>
                                    <th className='border-none py-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-1/6'>
                                        Address
                                    </th>
                                </tr>
                            </thead>

                            <tbody className='text-colorSix text-[14px] relative bg-white'>
                                {loading ? (<div className='absolute left-[0px] z-5 right-[0] top-[0] bottom-[0] min-h-[393px] flex flex-col justify-center items-center'>
                                    <ClipLoader loading={loading} size={40} cssOverride={{
                                        border: '5px solid #f3f3f3',
                                        borderTopColor: '#3498db',
                                        borderLeftColor: '#3498db',
                                        borderRightColor: '#3498db',
                                        borderBottomColor: '#3498db',
                                    }} />
                                </div>) : (
                                    transaction.length === 0 ? (
                                        <div className='absolute left-[0px] z-5 right-[0] top-[0] bottom-[0] min-h-[393px] flex flex-col justify-center items-center'>
                                            <img src={Empty} alt='empty' />
                                            <p>No transfers found</p>
                                        </div>
                                    ) : (
                                        transaction.map((transaction, index) => (
                                            <tr key={index} className='border-b border-gray-300'>
                                                <td className='w-[17.5%] py-[1.2rem] pl-[2rem]'>{transaction.time}</td>
                                                <td className='w-[17.5%] py-[1.2rem]'>{capitalizeFirstLetter(transaction.type)}</td>
                                                <td className='w-[17.5%] py-[1.2rem]'>$ {transaction.amount.toFixed(2)}</td>
                                                <td className='w-[17.5%] py-[1.2rem]'>{transaction.asset}</td>
                                                <td className='w-[17.5%] py-[1.2rem]'>{capitalizeFirstLetter(transaction.status)}</td>
                                                <td className='w-[17.5%] py-[1.2rem] pr-[1rem]'>{transaction.address}</td>
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default History