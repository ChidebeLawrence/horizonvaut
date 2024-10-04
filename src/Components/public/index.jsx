import React from 'react'
import trade from "@/assets/images/trade.gif"
import { Link, Outlet } from 'react-router-dom'

function index() {
    return (
        <div className='w-full flex lg:fixed'>
            <div className='w-full lg:w-1/2 bg-white text-black w-contain overflow-auto h-[100vh] m-auto lg:p-0'>
                <Outlet />
            </div>
            <div className='w-1/2 bg-black h-[100vh] flex hidden lg:flex h-[100vh]'>
                <img src={trade} alt='trade' className='m-auto' />
            </div>
        </div>
    )
}

export default index