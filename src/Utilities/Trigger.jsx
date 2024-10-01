import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Trigger = ({ pair, balance, bid, bgcolor }) => {
    const steps = [0, 25, 50, 75, 100];
    const [amount, setAmount] = useState('');
    const [selectedStep, setSelectedStep] = useState(null);
    const [hoveredStep, setHoveredStep] = useState(null);

    const handleInputChange = (e) => {
        const inputValue = parseFloat(e.target.value);
        if (!isNaN(inputValue) && inputValue <= availableBalance) {
            setAmount(inputValue);
            const percentage = (inputValue / availableBalance) * 100;
            const stepMatch = steps.find(step => step === Math.round(percentage));
            setSelectedStep(stepMatch || null);
        } else {
            setAmount('');
            setSelectedStep(null);
        }
    };

    const handleStepClick = (percentage) => {
        const calculatedAmount = (availableBalance * percentage) / 100;
        setAmount(calculatedAmount.toFixed(2));
        setSelectedStep(percentage);
    };

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Limit');
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setBalanceOption(false);
      };

    return (
        <>
            <div>
                <div className="py-2">
                    <span>Available {balance}</span>
                    <span className="text-white"> {pair}</span>
                </div>

                <div className="relative py-[4px]">
                    <input
                        type="number"
                        className="bg-[#1f2027] w-full text-white p-[8px] border border-[#272830] outline-none text-right pr-[40px] rounded-md"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            appearance: 'textfield'
                        }}
                        value="Stop"
                        onChange="USDT"
                    />
                    <p className="absolute top-[15px] left-[5px]">Stop</p>
                    <p className="absolute top-[15px] right-[5px] text-white">USDT</p>
                </div>

                <div className="relative py-[4px] flex gap-[10px]">
                    <input
                        type="number"
                        className="bg-[#1f2027] w-[70%] text-white p-[8px] border border-[#272830] outline-none text-right pr-[10px] rounded-md"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            appearance: 'textfield'
                        }}
                        value={amount}
                        onChange={handleInputChange}
                    />
                    <p className="absolute top-[15px] left-[5px]">Price</p>

                    <div className='relative border border-[#272830] bg-[#1f2027] w-[30%] p-[8px] rounded cursor-pointer' onClick={handleOpen}>
                        <p className='flex items-center justify-between text-white'>{selectedOption} {open ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
                        {open && (<div className='absolute z-10 border border-[#272830] bg-[#1f2027] w-[100%] rounded right-[0px] top-[37px]'>
                            <p className='p-[8px] cursor-pointer text-white' onClick={() => handleOptionClick("Limit")}>Limit</p>
                            <p className='p-[8px] cursor-pointer text-white' onClick={() => handleOptionClick("Market")}>Market</p>
                        </div>)}
                    </div>
                </div>

                <div className="relative py-[4px]">
                    <input
                        type="number"
                        className="bg-[#1f2027] w-full text-white p-[8px] border border-[#272830] outline-none text-right pr-[40px] rounded-md"
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            appearance: 'textfield'
                        }}
                        value={amount}
                        onChange={handleInputChange}
                    />
                    <p className="absolute top-[15px] left-[5px]">Size</p>
                    <p className="absolute top-[15px] right-[5px] text-white">{pair}</p>
                </div>

                <div className="relative flex items-center w-full pt-4">
                    {/* Render each step individually */}
                    {steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div
                                className="flex items-center relative"
                                style={{ flex: '0 0 0%' }}
                            >
                                <div
                                    className={`w-4 h-4 border-2 ${selectedStep === step ? 'bg-[#03a36b]' : 'bg-gray-900'} border-white rounded-full cursor-pointer`}
                                    onMouseEnter={() => setHoveredStep(step)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                    onClick={() => handleStepClick(step)}
                                ></div>
                            </div>
                            {index !== steps.length - 1 && (
                                <div className="h-0.5 flex-1 bg-gray-700"></div>
                            )}
                            {hoveredStep === step && (
                                <div className="absolute top-full mt-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
                                    {step}%
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <button className={`${bgcolor} text-white w-full p-2 rounded my-[30px] mt-[48px]`}>
                    {bid}
                </button>
            </div>
        </>
    );
};

export default Trigger;
Trigger