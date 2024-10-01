import React from 'react'
import support from "@/assets/images/chat_photo.svg"
import avatar from "@/assets/images/avatar.png"
import SubHeaderTwo from '@/Utilities/SubHeaderTwo'

function Support() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#47FF70" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const send = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.16641 5.2668L13.2414 2.90846C16.4164 1.85013 18.1414 3.58346 17.0914 6.75846L14.7331 13.8335C13.1497 18.5918 10.5497 18.5918 8.96641 13.8335L8.26641 11.7335L6.16641 11.0335C1.40807 9.45013 1.40807 6.85846 6.16641 5.2668Z" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8.42578 11.3745L11.4091 8.38281" stroke="white" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    return (
        <>
            <SubHeaderTwo icon={icon} header="Customer support chat" content="Here to help you 24/7" />

            <div className='text-black mx-[20px] my-[45px] md:mx-[32px]'>
                <div className='flex items-center gap-[20px] p-[20px] bg-[#F8FAFC] border-b border-[#DADADA] rounded-t-md'>
                    <div className='relative'>
                        <img src={support} alt='support' className='h-[50px] w-[50px]' />
                        <div className='p-[3px] absolute bottom-[2px] right-[2px] bg-[#F8FAFC] rounded-full'>
                            <div className='bg-[#41D37E] h-[8px] w-[8px] rounded-full'></div>
                        </div>
                    </div>
                    <p className='border-gradient-bottom w-fit text-[20px] font-semibold'>Live support service</p>
                </div>

                <div className='bg-white px-[20px] py-[1rem] mb-[5px] h-[589px] rounded-b-md flex flex-col justify-end overflow-y-auto md:px-[60px]'>
                    <div className='w-full flex items-start gap-[16px] my-[12px] relative'>
                        <div className='flex flex-col justify-center items-center gap-[5px] w-[112px] md:w-fit'>
                            <img src={avatar} alt='support' className='h-[44px] w-[44px]' />
                            <p className='text-[#6B798D] text-[11px]'>Support</p>
                        </div>

                        <p className='bg-[#F5F6FA] text-[#242731] border border-[#DADADA] p-[12px] rounded-md'>Hello my name is Alice, if you have any questions you can ask them here</p>
                    </div>

                    <div className='w-full flex items-start justify-end gap-[16px] my-[12px] relative'>
                        <p className='bg-[#A162F7] text-white border border-[#DADADA] p-[12px] rounded-md'>Hello my name is Alice, if you have any questions you can ask them here</p>

                        <div className='flex flex-col justify-center items-center  w-[104px] md:w-fit'>
                            <img src={avatar} alt='support' className='h-[44px] w-[44px]' />
                            <p className='text-[#6B798D] text-[11px] w-[44px] text-center'>You</p>
                        </div>
                    </div>
                </div>

                <div className='bg-[#F5F6FA] px-[30px] mt-[30px] py-[16px] rounded-md flex flex-col gap-[10px] border border-[#DADADA] md:flex-row md:gap-[20px]'>
                    <input type='text' placeholder='Enter your message' className='w-[100%] px-[40px] py-[13px] focus:outline-none border border-[#DADADA] rounded-md md:w-[90%]' />
                    <button className='bg-[#7044EE] rounded-md w-[112px] h-[49px] text-white flex items-center justify-center gap-[5px] text-[16px]'>{send}Send</button>
                </div>
            </div>
        </>
    )
}

export default Support