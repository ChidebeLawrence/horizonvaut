import React from 'react'
import SubHeader from '@/Utilities/SubHeader'
import Empty from '@/assets/images/empty.svg'

function History() {
    const tableData = [
        // {
        //     Time: "14-09-2024", Type: "Bitcoin", Amount: "500", Asset: "BTC", Status: "Sucess", Address: "bc1qw7gayedse89sdqyvaj3xnk0hg47x64ysxgs7uj"
        // },
    ]

    const wallet_overview = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#FF5B5B" strokeWidth="12" strokeLinecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" strokeWidth="12" strokeLinecap="round"></line>
    </svg>

    return (
        <div>
            <SubHeader sub_header_icon={wallet_overview} header="Transaction history" content="Your recent transactions" />

            <div className='px-[1.5rem] py-[30px] w-full md:px-[3.5rem]'>
                <div className='h-[575px] bg-white overflow-auto rounded-md border border-[#dadada]'>
                    {/* Add both vertical and horizontal scrolling */}
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
                                {tableData.length === 0 ? (
                                    <div className='absolute left-[0px] z-5 right-[0] top-[0] bottom-[0] min-h-[393px] flex flex-col justify-center items-center'>
                                        <img src={Empty} alt='empty' />
                                        <p>No transfers found</p>
                                    </div>
                                ) : (
                                    tableData.map((data, index) => (
                                        <tr key={index} className='border-b border-gray-300'>
                                            <td className='w-[17.5%] py-[1.2rem] pl-[2rem]'>{data.Time}</td>
                                            <td className='w-[17.5%] py-[1.2rem]'>{data.Type}</td>
                                            <td className='w-[17.5%] py-[1.2rem]'>{data.Amount}</td>
                                            <td className='w-[17.5%] py-[1.2rem]'>${data.Asset}</td>
                                            <td className='w-[17.5%] py-[1.2rem]'>{data.Status}</td>
                                            <td className='w-[17.5%] py-[1.2rem] pr-[1rem]'>{data.Address}</td>
                                        </tr>
                                    ))
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