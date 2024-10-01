import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { getNames, getCode } from 'country-list';
import ReactCountryFlag from "react-country-flag";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import SubHeaderTwo from '../../../Utilities/SubHeaderTwo'
import Index from './Index'

function UpgardeVerification() {
    const icon = <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="52.4746" y1="8.35617" x2="31.3562" y2="38.5254" stroke="#3ED7D7" stroke-width="12" stroke-linecap="round"></line>
        <line x1="29.4746" y1="8.35617" x2="8.35616" y2="38.5254" stroke="#7044EE" stroke-width="12" stroke-linecap="round"></line>
    </svg>

    const verify = <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5414 3.07279C13.3464 2.33316 14.6647 2.33316 15.4814 3.07279L17.3247 4.7777C17.6747 5.10364 18.328 5.3669 18.7947 5.3669H20.778C22.0147 5.3669 23.0297 6.45754 23.0297 7.78637V9.91751C23.0297 10.4064 23.2747 11.121 23.578 11.4971L25.1647 13.4778C25.853 14.3428 25.853 15.7593 25.1647 16.6369L23.578 18.6176C23.2747 18.9937 23.0297 19.6957 23.0297 20.1971V22.3283C23.0297 23.6571 22.0147 24.7477 20.778 24.7477H18.7947C18.3397 24.7477 17.6747 25.011 17.3247 25.3369L15.4814 27.0418C14.6764 27.7815 13.358 27.7815 12.5414 27.0418L10.698 25.3369C10.348 25.011 9.6947 24.7477 9.22803 24.7477H7.2097C5.97303 24.7477 4.95803 23.6571 4.95803 22.3283V20.1846C4.95803 19.6957 4.71303 18.9937 4.42137 18.6176L2.84637 16.6243C2.1697 15.7593 2.1697 14.3553 2.84637 13.4903L4.42137 11.4971C4.71303 11.121 4.95803 10.419 4.95803 9.93004V7.77383C4.95803 6.445 5.97303 5.35436 7.2097 5.35436H9.22803C9.68303 5.35436 10.348 5.0911 10.698 4.76516L12.5414 3.07279Z" stroke="#101828" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M9.77637 15.0445L12.588 18.0782L18.223 12.0107" stroke="#101828" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const file = <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.25 10.084V15.5839L10.0833 13.7506" stroke="#191D31" stroke-width="1.37499" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8.25031 15.5833L6.41699 13.75" stroke="#191D31" stroke-width="1.37499" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20.1661 9.16724V13.7505C20.1661 18.3338 18.3328 20.1671 13.7495 20.1671H8.2496C3.66632 20.1671 1.83301 18.3338 1.83301 13.7505V8.25058C1.83301 3.6673 3.66632 1.83398 8.2496 1.83398H12.8329" stroke="#191D31" stroke-width="1.37499" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20.1663 9.16724H16.4996C13.7497 9.16724 12.833 8.25058 12.833 5.50061V1.83398L20.1663 9.16724Z" stroke="#191D31" stroke-width="1.37499" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const send = <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66641 5.2668L13.7414 2.90846C16.9164 1.85013 18.6414 3.58346 17.5914 6.75846L15.2331 13.8335C13.6497 18.5918 11.0497 18.5918 9.46641 13.8335L8.76641 11.7335L6.66641 11.0335C1.90807 9.45013 1.90807 6.85846 6.66641 5.2668Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8.92578 11.3745L11.9091 8.38281" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const countries = getNames().map((name) => ({
        label: name,
        value: getCode(name),
    }));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '3.8px 20px',
            borderRadius: '0.375rem',
            borderColor: '#D1D5DB',
            '&:hover': {
                borderColor: '#6B7280',
            },
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0',
        }),
    };

    return (
        <div>
            <SubHeaderTwo icon={icon} header="KYC Verification - LVL2" content="Select a suitable benefit according to your needs and complete the verification" />

            <Index />

            <div className='bg-white text-black m-[20px] lg:mx-[55px] flex flex-col gap-[30px] py-[20px] px-[30px]'>
                <div className='flex items-center gap-4'>
                    <div>
                        {verify}
                    </div>

                    <div className='flex-col'>
                        <h1 className='text-[18px] font-semibold'>Verification for Level 2</h1>
                        <p className='text-[12px] text-[#667085]'>Enter your details to get level 2 verification</p>
                    </div>
                </div>

                <form>
                    <div className='flex flex-wrap justify-center lg:justify-start gap-8'>
                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>First name</label>
                            <input
                                type='text'
                                name='fname'
                                className='border border-1 border-[#dadada] w-full py-[12px] px-[20px] rounded-md outline-none focus:border-[#7044ee] focus:border-2'
                                placeholder='Enter your first name'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>Last name</label>
                            <input
                                type='text'
                                name='lname'
                                className='border border-1 border-[#dadada] w-full py-[12px] px-[20px] rounded-md outline-none focus:border-[#7044ee] focus:border-2'
                                placeholder='Enter your last name'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>Country</label>
                            <Select
                                options={countries}
                                formatOptionLabel={({ label, value }) => (
                                    <div className="flex items-center">
                                        <ReactCountryFlag countryCode={value} svg style={{ width: '1.5em', height: '1.5em' }} />
                                        <span className="ml-2">{label}</span>
                                    </div>
                                )}
                                placeholder="Select country"
                                styles={customStyles}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>Address</label>
                            <input
                                type='text'
                                name='address'
                                className='border border-1 border-[#dadada] w-full py-[12px] px-[20px] rounded-md outline-none focus:border-[#7044ee] focus:border-2'
                                placeholder='Enter your full address'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>Phone number</label>
                            <input
                                type='text'
                                name='phone'
                                className='border border-1 border-[#dadada] w-full py-[12px] px-[20px] rounded-md outline-none focus:border-[#7044ee] focus:border-2'
                                placeholder='+00 999 00 66 000'
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]">
                            <label className="font-semibold font-medium text-gray-700">Date of Birth</label>
                            <div className="relative flex items-center border border-gray-300 rounded-lg">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full py-[12px] px-[20px] border-none outline-none rounded-lg focus:ring focus:ring-indigo-200"
                                />
                                <FaCalendarAlt className="absolute right-3 text-gray-500" />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>Select ID type</label>
                            <input
                                type='text'
                                name='fname'
                                className='border border-1 border-[#dadada] w-full py-[12px] px-[20px] rounded-md outline-none focus:border-[#7044ee] focus:border-2'
                                placeholder='Enter your first name'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>
                            <label className='font-semibold'>ID number</label>
                            <input
                                type='text'
                                name='card'
                                className='border border-1 border-[#dadada] w-full py-[12px] px-[20px] rounded-md outline-none focus:border-[#7044ee] focus:border-2'
                                placeholder='Enter the document number'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex gap-8 mt-8 flex-wrap justify-center lg:justify-start'>
                        <div className="flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]">
                            <label className="font-semibold">Upload the document</label>
                            <p className="text-[12px] text-[#667085]">
                                Ensure that all details on your document are clearly visible when uploaded. The document size should not exceed 2MB.
                            </p>

                            <div className="border-2 border-dashed border-[#dadada] rounded-lg p-6 text-center flex items-center justify-center gap-4">
                                {file}
                                <p className="">
                                    {selectedFile ? selectedFile.name : "Drop file here or"}
                                    <label htmlFor="file-upload" className="text-indigo-600 cursor-pointer"> Browse</label>
                                </p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]">
                            <label className="font-semibold">Upload the selfie</label>
                            <p className="text-[12px] text-[#667085]">
                                Upload your own selfie photo. Please keep your camera at eye level. Use either the front or back camera to get the highest photo resolution. Do not cover your face (e.g. wearing eyeglasses, sunglasses, hats, or the like).
                            </p>

                            <div className="border-2 border-dashed border-[#dadada] rounded-lg p-6 text-center flex items-center justify-center gap-4">
                                {file}
                                <p className="">
                                    {selectedFile ? selectedFile.name : "Drop file here or"}
                                    <label htmlFor="file-upload" className="text-indigo-600 cursor-pointer"> Browse</label>
                                </p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button type='submit' className='flex items-center justify-center gap-[15px] text-white bg-[#6544C6] mx-auto mt-[25px] py-[15px] rounded-md mt-[10px] w-[calc(100%/1)] mdLg:w-[calc(50%-1rem)] lg:w-[calc(32.6%-1rem)]'>{send} Submit for review</button>
                </form>
            </div>
        </div>
    )
}

export default UpgardeVerification