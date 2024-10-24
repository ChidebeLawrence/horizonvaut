import { useEffect, useRef, useState } from "react";
import support from "@/assets/images/chat_photo.svg";
import avatar from "@/assets/images/avatar.png";
import SubHeaderTwo from "@/Utilities/SubHeaderTwo";

function Support() {
  const [messages, setMessages] = useState([
    { text: "Hello my name is Alice, if you have any questions you can ask them here", sender: "Support" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "User" },
      ]);
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const icon = (
    <svg
      width="59"
      height="45"
      viewBox="0 0 59 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="52.4746"
        y1="8.35617"
        x2="31.3562"
        y2="38.5254"
        stroke="#47FF70"
        strokeWidth="12"
        strokeLinecap="round"
      ></line>
      <line
        x1="29.4746"
        y1="8.35617"
        x2="8.35616"
        y2="38.5254"
        stroke="#7044EE"
        strokeWidth="12"
        strokeLinecap="round"
      ></line>
    </svg>
  );

  const send = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.16641 5.2668L13.2414 2.90846C16.4164 1.85013 18.1414 3.58346 17.0914 6.75846L14.7331 13.8335C13.1497 18.5918 10.5497 18.5918 8.96641 13.8335L8.26641 11.7335L6.16641 11.0335C1.40807 9.45013 1.40807 6.85846 6.16641 5.2668Z"
        stroke="white"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8.42578 11.3745L11.4091 8.38281"
        stroke="white"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  return (
    <>
      <SubHeaderTwo
        icon={icon}
        header="Customer support chat"
        content="Here to help you 24/7"
      />

      <div className="text-black mx-[20px] my-[45px] md:mx-[32px]">
        <div className="flex items-center gap-[20px] p-[20px] bg-[#F8FAFC] border-b border-[#DADADA] rounded-t-md">
          <div className="relative">
            <img src={support} alt="support" className="h-[50px] w-[50px]" />
            <div className="p-[3px] absolute bottom-[2px] right-[2px] bg-[#F8FAFC] rounded-full">
              <div className="bg-[#41D37E] h-[8px] w-[8px] rounded-full"></div>
            </div>
          </div>
          <p className="border-gradient-bottom w-fit text-[20px] font-semibold">
            Live support service
          </p>
        </div>
        
        <div ref={messagesEndRef} />

        <div className="bg-white px-[20px] py-[1rem] mb-[5px] h-[589px] rounded-b-md flex flex-col justify-end overflow-y-auto md:px-[60px]">
          {messages.map((msg, index) => (
            <div key={index} className={`w-full flex items-start gap-[16px] my-[12px] ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
              {msg.sender !== "User" && (
                <div className="flex flex-col justify-center items-center gap-[5px] w-[112px] md:w-fit">
                  <img src={avatar} alt="support" className="h-[44px] w-[44px]" />
                  <p className="text-[#6B798D] text-[11px]">Support</p>
                </div>
              )}

              <p className={`border border-[#DADADA] p-[12px] rounded-md ${msg.sender === "User" ? "bg-[#A162F7] text-white" : "bg-[#F5F6FA] text-[#242731]"}`}>
                {msg.text}
              </p>

              {msg.sender === "User" && (
                <div className="flex flex-col justify-center items-center  w-[104px] md:w-fit">
                  <img src={avatar} alt="support" className="h-[44px] w-[44px]" />
                  <p className="text-[#6B798D] text-[11px] w-[44px] text-center">You</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={sendMessage}
          className="bg-[#F5F6FA] px-[30px] mt-[30px] py-[16px] rounded-md flex flex-col gap-[10px] border border-[#DADADA] md:flex-row md:gap-[20px]"
        >
          <input
            type="text"
            placeholder="Enter your message"
            className="w-[100%] px-[40px] py-[13px] focus:outline-none border border-[#DADADA] rounded-md md:w-[90%]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#7044EE] rounded-md w-[112px] h-[49px] text-white flex items-center justify-center gap-[5px] text-[16px]"
          >
            {send}Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Support;
