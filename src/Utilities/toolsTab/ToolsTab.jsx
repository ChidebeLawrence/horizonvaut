import React, { useState } from 'react'

import { Link } from 'react-router-dom'

function ToolsTab({ sub_header, description, img, onLinkClick }) {
    const StyleNavIcon = "relative top-[3px] h-[22px] w-[20px]"
    const StyleNavSubHeader = "font-medium text-sm text-white"
    const StyleNavSubDescription = "text-[12px] text-gray-500 leading-none"
    const StyleNavSubLink = "flex p-[10px] hover:bg-gray-800 rounded-md lg:gap-0 lg:px-[20px] lg:py-[20px]"

    return (
        <Link to="#" className={`${StyleNavSubLink}`} onClick={onLinkClick}>
            <div className="w-[15%] lg:w-[10%]">
                <img src={img} alt="Options trading" className={`${StyleNavIcon}`} />
            </div>
            <div className="w-[85%] lg:w-[90%]">
                <div className={`${StyleNavSubHeader}`}>{sub_header}</div>
                <div className={`${StyleNavSubDescription}`}>
                    {description}
                </div>
            </div>
        </Link>
    );
}

export default ToolsTab;

