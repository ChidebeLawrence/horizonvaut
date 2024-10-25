import React from 'react'

function SubHeaderTwo({ icon, header, content }) {
    return (
        <div className='bg-colorOne flex items-center justify-between p-[20px] md:py-[2.6rem] md:px-[5.5rem]'>
            <div className='flex items-center justify-center gap-3'>
                {icon}

                <span>
                    <h1 className='text-[20px] text-white md:text-[24px] font-extrabold tracking-[1px]'>{header}</h1>
                    <p className="text-[12px] md:text-[14px] text-darkgray">{content}</p>
                </span>
            </div>
        </div>
    )
}

export default SubHeaderTwo