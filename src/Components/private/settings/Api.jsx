import React from 'react'
import Index from './Index'
import Empty from "@/assets/images/emptyOne.svg"
import Info from '@/assets/images/info.svg'
import SubHeaderTwo from '../../../Utilities/SubHeaderTwo'

function Api() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#4198FD" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const api = <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.91732 22.1322H9.33398C4.66732 22.1322 2.33398 20.9655 2.33398 15.1322V9.29883C2.33398 4.63216 4.66732 2.29883 9.33398 2.29883H18.6673C23.334 2.29883 25.6673 4.63216 25.6673 9.29883V15.1322C25.6673 19.7988 23.334 22.1322 18.6673 22.1322H18.084C17.7223 22.1322 17.3723 22.3072 17.1507 22.5989L15.4007 24.9322C14.6307 25.9589 13.3706 25.9589 12.6006 24.9322L10.8506 22.5989C10.664 22.3422 10.244 22.1322 9.91732 22.1322Z" stroke="#191D31" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.33333 10.1504L7 12.4837L9.33333 14.8171" stroke="#191D31" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M18.666 10.1504L20.9993 12.4837L18.666 14.8171" stroke="#191D31" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M15.1673 9.76367L12.834 15.2004" stroke="#191D31" stroke-width="1.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const tableData = [
        // {
        //     Time: "14-09-2024", Type: "Bitcoin", Amount: "500", Asset: "BTC"
        // },
    ]

    return (
        <div>
            <SubHeaderTwo icon={icon} header="API management" content="You can use API to check market data, process automated trading orders and much more" />

            <Index />

            <div className='lg:mx-[55px] lg:mb-[50px] m-[20px] text-[#78778B] flex flex-col gap-[2rem]'>
                <div className='bg-white p-[20px] lg:py-6 lg:px-[40px] rounded-md flex flex-col items-center justify-between gap-[20px] lg:flex-row'>
                    <div className='flex items-center gap-[10px] lg:w-[23%]'>
                        {api}
                        <div>
                            <p className='text-[20px] text-black font-semibold'>Create API key</p>
                            <p className='text-[12px]'>Create API Keys to suit your trading needs</p>
                        </div>
                    </div>

                    <div className='w-[50%] flex flex-wrap justify-center gap-[12px] md:w-[77%] lg:justify-around'>
                        <span className='flex items-center gap-[5px]'>
                            <input type='checkbox' className='w-[17px] h-[17px]' checked disable />
                            Read data
                        </span>
                        <span className='flex items-center gap-[5px]'>
                            <input type='checkbox' className='w-[17px] h-[17px]' />
                            Spot trading
                        </span>
                        <span className='flex items-center gap-[5px]'>
                            <input type='checkbox' className='w-[17px] h-[17px]' />
                            Future trading
                        </span>
                        <span className='flex items-center gap-[5px]'>
                            <input type='checkbox' className='w-[17px] h-[17px]' />
                            Withdraw
                        </span>

                        <button className='border border-none bg-[#7044EE] text-white py-[10px] px-[45px] font-semibold rounded-md'>Create</button>
                    </div>

                </div>

                <div className='bg-white max-h-[502px] min-h-[350px] overflow-y-auto overflow-x-auto rounded-md border border-[#dadada]'>
                    <table className='min-w-[800px] w-full border-collapse table-fixed'>
                        <thead className='bg-bgColourTwo text-left'>
                            <th className='border-none py-[1.5rem] pl-[2rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[25%]'>Secret key</th>
                            <th className='border-none py-[1.5rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[55%]'>Permissions</th>
                            <th className='border-none py-[1.5rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[10%]'>Status</th>
                            <th className='border-none py-[1.5rem] border-b border-gray-300 text-colorFive text-[14px] font-medium w-[10%]'>Action</th>
                        </thead>

                        <tbody className='text-colorSix text-[14px] relative'>
                            {tableData.length === 0 ?
                                (<div className='absolute left-[0px] right-[0] top-[0] bottom-[0] h-[250px] flex flex-col justify-center items-center'>
                                    <img src={Empty} alt='empty' className='w-[113px] h-[124px]' />
                                    <p>No Data Found</p>
                                </div>)
                                :
                                (tableData.map((data, index) => (
                                    <tr key={index} className='border-b border-gray-300'>
                                        <td className='py-[1.2rem] pl-[2rem] w-[25%]'>{data.Type}</td>
                                        <td className='py-[1.2rem] w-[55%]'>{data.Time}</td>
                                        <td className='py-[1.2rem] w-[10%]'>{data.Amount}</td>
                                        <td className='py-[1.2rem] w-[10%]'>${data.Asset}</td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>


                <div className='flex flex-wrap md:flex-nowrap gap-[10px] p-[10px] items-center lg:gap-[30px] bg-[#FFFDEC] text-[#6D6D6D] text-[13px] lg:px-[20px] lg:px-[30px] border border-[#FFDBA6] rounded-b-md'>
                    <img src={Info} alt='info' />
                    <ul className='list-disc list-inside pl-[20px] lg:p-4 list-outside'>
                        <li>We provide clients with the most powerful, industry-leading API functionalities. You can use API to check market data, process automated trading orders and much more.</li>
                        <li>Each account can have up to 20 keys.</li>
                        <li>For security reasons, please do not reveal your key(s) to non-trusted third parties.</li>
                        <li>After changing your login password, please set up new API key(s), as the old one will expire within seven (7) days.</li>
                        <li>Please keep your API keys securely.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Api