import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const [otp, setOtp] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      };

      const response = await fetch(
        "https://api.horizonvaut.com/auth/verify-email",
        requestOptions
      );
      const data = await response.json();
      const messageFromResponse = data.message;
      const codeFromResponse = data.code;

      if (codeFromResponse === 200) {
        const { token, user } = data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('userDetails', JSON.stringify(user));

        navigate("/profile/wallet");
      } else {
        setMessageColor("orangered");
        setMessage(messageFromResponse);
      }
    } catch (error) {
      setMessageColor("orangered");
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      };

      const response = await fetch(
        "https://api.horizonvaut.com/auth/resent-otp",
        requestOptions
      );
      const data = await response.json();
      const messageFromResponse = data.message;
      const codeFromResponse = data.code;

      if (codeFromResponse === 200) {
        setMessageColor("limegreen");
        setMessage(messageFromResponse || "OTP resent successfully.");
      }

      if (codeFromResponse !== 200) {
        setMessageColor("red");
        setMessage(messageFromResponse);
      }
    } catch (error) {
      setMessageColor("orangered");
      setMessage("An error occurred while resending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[404px] m-auto py-4 px-6">
      <form onSubmit={handleVerifyOtp}>
        <div>
          <h1 className="text-[30px] font-semibold">Verify your Email</h1>
          <p className="text-[14px] text-[#78778b]">
            Enter the OTP sent to your email address
          </p>
        </div>
        <div className="flex flex-col gap-[1rem] mt-[1rem]">
          <div>
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-[5px] text-[#78778b] py-[12px] px-[20px] w-full border border-[#dadada] outline-none focus:border-[blue] focus:border-2 rounded-md"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button
            className={`bg-[#7044ee] text-white w-full py-[14px] rounded-md ${
              loading ? "opacity-50 cursor-default" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-[7px]">
                Verifying
                <ClipLoader color={"#ffffff"} loading={loading} size={20} />
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-blue-500 mt-2 w-full"
            disabled={loading}
          >
            Resend OTP
          </button>
          <div style={{ color: messageColor }}>{message && <p>{message}</p>}</div>
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;
