import React, {useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import {AuthApi} from "@/api/AuthAPI";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AccountSetup = () => {
    const auth = new AuthApi()
    const navigate = useNavigate();
    React.useEffect(() => {
        const setup = async () => {
            try {
                await auth.AccountSetup()
                navigate('/profile/wallet')
            } catch (e) {
                toast.error(e);
            }
        }
        setup().then()
    }, [])


    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <h2 className='text-[20px] font-semibold font-sans'>Account Setup</h2>

            <div className='mt-3'>
                <ClipLoader color={"blue"} loading={true} size={40}/>
            </div>

            <p className='font-sans text-[14px]'> Please wait for some minutes while we setup your account... </p>

        </div>
    );
};

export default AccountSetup;
