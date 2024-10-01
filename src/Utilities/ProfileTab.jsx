import React from 'react';
import { Link } from 'react-router-dom';

function ProfileTab({ wallet_menu, alt, title, to, onclick, close }) {
    return (
        <div>
            <Link to={to} className='flex items-center gap-[5px] hover:bg-[#2b2d33] px-[32px] py-[7px]' onClick={onclick}>
                <img src={wallet_menu} alt={alt} className='h-[18px] w-[16px]' />
                {title}
            </Link>
        </div>
    );
}

export default ProfileTab;
