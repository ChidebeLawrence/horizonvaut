import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import Index from "./Index";
import SubHeaderTwo from "@/Utilities/SubHeaderTwo";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { AuthApi } from "@/api/AuthApi";

function UpdatePassword() {
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
        stroke="#52C050"
        stroke-width="12"
        stroke-linecap="round"
      ></line>
      <line
        x1="29.4746"
        y1="8.35617"
        x2="8.35616"
        y2="38.5254"
        stroke="#7044EE"
        stroke-width="12"
        stroke-linecap="round"
      ></line>
    </svg>
  );

  const security = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2385 2.60182L6.41685 4.79515C5.07518 5.29682 3.97852 6.88348 3.97852 8.30682V16.9752C3.97852 18.3518 4.88852 20.1602 5.99685 20.9885L11.0135 24.7335C12.6585 25.9702 15.3652 25.9702 17.0102 24.7335L22.0268 20.9885C23.1352 20.1602 24.0452 18.3518 24.0452 16.9752V8.30682C24.0452 6.87182 22.9485 5.28515 21.6069 4.78348L15.7852 2.60182C14.7935 2.24015 13.2068 2.24015 12.2385 2.60182Z"
        stroke="#191D31"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M14.0001 14.5832C15.2887 14.5832 16.3334 13.5385 16.3334 12.2498C16.3334 10.9612 15.2887 9.9165 14.0001 9.9165C12.7114 9.9165 11.6667 10.9612 11.6667 12.2498C11.6667 13.5385 12.7114 14.5832 14.0001 14.5832Z"
        stroke="#191D31"
        stroke-width="1.75"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M14 14.5835V18.0835"
        stroke="#191D31"
        stroke-width="1.75"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );

  const key = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4915 12.4421C14.7748 14.1504 12.3165 14.6754 10.1581 14.0004L6.23313 17.9171C5.9498 18.2088 5.39146 18.3838 4.99146 18.3254L3.1748 18.0754C2.5748 17.9921 2.01646 17.4254 1.9248 16.8254L1.6748 15.0088C1.61646 14.6088 1.80813 14.0504 2.08313 13.7671L5.9998 9.85042C5.33313 7.68376 5.8498 5.22542 7.56646 3.51709C10.0248 1.05876 14.0165 1.05876 16.4831 3.51709C18.9498 5.97542 18.9498 9.98376 16.4915 12.4421Z"
        stroke="white"
        stroke-width="1.25"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M5.74146 14.5752L7.65812 16.4919"
        stroke="white"
        stroke-width="1.25"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M12.0833 9.1665C12.7736 9.1665 13.3333 8.60686 13.3333 7.9165C13.3333 7.22615 12.7736 6.6665 12.0833 6.6665C11.3929 6.6665 10.8333 7.22615 10.8333 7.9165C10.8333 8.60686 11.3929 9.1665 12.0833 9.1665Z"
        stroke="white"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );

  const authApi = new AuthApi();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleResendOtp = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userEmail = userDetails?.email || "";

    if (!userEmail) {
      toast.warn("Email not available. Please log in.");
      return;
    }

    setOtpLoading(true);

    try {
      const response = await authApi.ResendOTP(userEmail);
      toast.success(
        response.message.data.message || "OTP has been sent to your email."
      );
      setResendCountdown(60);
    } catch (error) {
      toast.error(error ?? "Error resending OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.warn("Password must be at least 8 characters long.");
      return;
    }

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userEmail = userDetails?.email || "";

    if (!userEmail) {
      toast.warn("Email not available. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: userEmail,
        password: newPassword,
        otp: otp,
      };

      const response = await axios.post(
        "https://api.fomobitmax.com/auth/update-password",
        payload
      );

      if (response.status === 200) {
        toast.success("Password updated successfully.");
      } else {
      toast.warn("Failed to update password. Please try again.");
      }
    } catch (error) {
      toast.warn("Error updating password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-[15rem]">
      <SubHeaderTwo
        icon={icon}
        header="Account password"
        content="Login password is used to log in to your account"
      />
      <Index />
      <div
        className={classNames(
          "bg-white text-[#78778B] m-[20px] py-4 px-[40px] flex flex-col gap-[20px] rounded-md",
          "text-[#78778B] lg:mx-[55px] lg:mb-[50px] lg:py-6 lg:px-[40px] lg: lg:items-start lg:justify-between"
        )}
      >
        <div className="flex items-center gap-[20px] smLg:w-[50%] lg:w-full lg:w-[50%]">
          <p>{security}</p>
          <div>
            <p className="text-[20px] text-black font-semibold">
              Change password
            </p>
            <p className="text-[12px]">Contains at least 8 characters</p>
          </div>
        </div>

        <div className="smLg:w-full flex-col lg:w-full flex justify-between gap-[16px]">
          <form
            className="flex flex-col gap-4 justify-between gap-[16px] w-full"
            onSubmit={handleUpdatePassword}
          >
            <p className="relative w-full">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-[13px] px-[20px] focus:outline-[#825fe9] border border-[#e5e8eb] rounded-md text-black"
                required
              />
            </p>

            <p className="relative w-full">
              <input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-[13px] px-[20px] focus:outline-[#825fe9] border border-[#e5e8eb] rounded-md text-black"
                required
              />
            </p>

            <p className="relative w-full">
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full py-[13px] px-[20px] focus:outline-[#825fe9] border border-[#e5e8eb] rounded-md text-black"
                required
              />
            </p>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCountdown > 0 || loading} // Disable when countdown is active or loading
              className={`${
                resendCountdown > 0 || loading
                  ? "opacity-50 cursor-default"
                  : ""
              }`}
            >
              {otpLoading ? (
                <div
                  className={`flex items-center justify-center gap-2 ${
                    otpLoading ? "opacity-50 cursor-default" : ""
                  }`}
                >
                  <span>Sending OTP </span>
                  <ClipLoader color="gray" loading={true} size={20} />
                </div>
              ) : resendCountdown > 0 ? (
                `Resend OTP in (${resendCountdown}s)`
              ) : (
                "Send OTP"
              )}
            </button>

            <button
              className={`w-full py-[14px] bg-[#825fe9] text-white text-[14px] rounded-md flex items-center justify-center gap-[5px] ${
                loading ? "opacity-50 cursor-default" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-[7px]">
                  {key}
                  Change password
                  <ClipLoader color={"#ffffff"} loading={loading} size={20} />
                </div>
              ) : (
                <p className="flex gap-2">{key} Change password</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
