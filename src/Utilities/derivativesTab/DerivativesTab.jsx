import React from 'react'

import { Link } from 'react-router-dom'

function DerivativesTab({ sub_header, description, img, onLinkClick }) {
    const StyleNavIcon = "relative top-[3px] h-[22px] w-[20px]"
    const StyleNavSubHeader = "font-medium text-sm text-white"
    const StyleNavSubDescription = "text-[12px] text-gray-500 leading-none"
    const StyleNavSubLink = "flex gap-0 lg:px-4 lg:py-2 hover:bg-gray-800 rounded-md"

    return (
        <Link to="#" className={`${StyleNavSubLink} gap-[10px] lg:gap-0 pl-[10px] py-4`} onClick={onLinkClick}>
            <div className="w-[30px] lg:mr-3">
                <img src={img} alt="Options trading" className={`${StyleNavIcon}`} />
            </div>
            <div className="">
            <div className={`${StyleNavSubHeader}`}>{sub_header}</div>
                <div className={`${StyleNavSubDescription}`}>
                    {description}
                </div>
            </div>
        </Link>
    );
}

export default DerivativesTab;

