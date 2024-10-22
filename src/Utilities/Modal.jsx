import React from 'react';
import Horiznlogo from "@/assets/images/Horiznlogo.fw.png"

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 text-[#667085] px-[20px] lg:px-0">
      <div className='bg-[#22202e] w-[30%] lg:w-[20%] h-[50%] flex items-center justify-center rounded-l-lg'>
        <img src={Horiznlogo} alt='Horiznlogo' className='h-[75px] w-[75px] smSm:h-[100px] smSm:w-[100px] md:h-[150px] md:w-[150px]' />
      </div>

      <div className='bg-[white] flex flex-col items-center justify-center w-[70%] lg:w-[30%] h-[50%] rounded-r-lg px-[10px] lg:px-0'>
        <p className='text-[28px] font-semibold text-black'>Coming Soon</p>
        <p>This feature is under development and will soon be available.</p>
        <button onClick={onClose} className="px-4 py-2 my-2 bg-gray-200 rounded-md">Close</button>
      </div>
    </div>
  );
}
export default Modal
