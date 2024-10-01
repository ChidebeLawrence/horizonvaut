import React, { useState } from 'react';

const Limit = ({ pair, balance, bid, bgcolor, one, two, three, pairOne }) => {
    const steps = [0, 25, 50, 75, 100];
    const [amount, setAmount] = useState('');
    const [selectedStep, setSelectedStep] = useState(null);
    const [hoveredStep, setHoveredStep] = useState(null);
    const availableBalance = 0

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

    return (
        <>
            <div>
                <div className="py-2">
                    <span>Available {balance}</span>
                    <span className="text-white"> {pair}</span>
                </div>

                <div className="relative">
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
                    <p className="absolute top-[10px] left-[7px]">{one}</p>
                    <p className="absolute top-[10px] right-[5px] text-white">{pairOne}</p>
                </div>

                <div className="relative py-2">
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
                    <p className="absolute top-[17px] left-[5px]">{two}</p>
                    <p className="absolute top-[17px] right-[5px] text-white">{pair}</p>
                </div>

                <div className="relative flex items-center w-full py-2">
                    {/* Render each step individually */}
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
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

                <div className="relative py-4 mb-4">
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
                    <p className="absolute top-[25px] left-[5px]">{three}</p>
                    <p className="absolute top-[25px] right-[5px] text-white">{pair}</p>
                </div>

                <button className={`${bgcolor} text-white w-full p-2 rounded mb-[40px]`}>
                    {bid}
                </button>
            </div>
        </>
    );
};

export default Limit;
