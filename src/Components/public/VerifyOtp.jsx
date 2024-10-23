import {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {AuthApi} from "@/api/AuthAPI";
import {toast} from "react-toastify";


function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get("email");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = new AuthApi()

    const formatCurrentTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    const currentTimeFormatted = formatCurrentTime();


    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {data} = await auth.VerifyOTP(email, otp)
            const {access_token, refresh_token, username, email: userEmail, referral_id, expiration_in_seconds} = data;
            const expirationTime = Date.now() + expiration_in_seconds * 1000;
            await localStorage.setItem('authToken', access_token);
            await localStorage.setItem('refreshToken', refresh_token);
            await localStorage.setItem('userDetails', JSON.stringify({email: userEmail, username, referral_id, last_updated: currentTimeFormatted}));
            await localStorage.setItem('tokenExpiration', expirationTime);
            navigate("/account-setup");
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            await auth.ResendOTP(email)
            toast.success("An otp has been resent successfully.")
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full  h-full  flex  items-center lg:w-[404px] m-auto py-4 px-6">
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
                            type="number"
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
                                <ClipLoader color={"#ffffff"} loading={loading} size={20}/>
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
                </div>
            </form>
        </div>
    );
}

export default VerifyOtp;
