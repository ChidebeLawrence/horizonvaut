import {useState} from "react";
import Horiznlogo from "@/assets/images/Horiznlogo.fw.png";
import {Link, useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {AuthApi} from "@/api/AuthAPI";
import {toast} from "react-toastify";

function Signup() {
    const arrow = (
        <svg
            width="48"
            height="46"
            viewBox="0 0 48 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6685 22.4142C16.2399 22.6102 15.8116 22.8107 15.461 22.9992C9.18912 26.3304 3.38457 31.5487 0.112286 37.6668C-0.00458097 37.8897 0.0733304 38.164 0.307065 38.2787C0.540799 38.3933 0.813717 38.3052 0.930584 38.0819C4.16391 32.1195 9.81248 27.0404 15.9285 23.7936C16.1233 23.6861 16.3571 23.5745 16.5909 23.4614C16.6298 24.0158 16.8245 24.4723 17.0972 24.8404C17.5257 25.3862 18.1879 25.7569 18.967 25.9626C20.0578 26.2467 21.3431 26.2154 22.5118 25.9556C23.4078 25.7472 24.2259 25.3911 24.7324 24.9517C25.1609 24.5974 25.3945 24.1838 25.4335 23.7477C25.4725 23.2885 25.2779 22.7786 24.6936 22.2664C23.7197 21.3775 22.3949 21.1135 20.9536 21.2263C19.9018 21.3099 18.8112 21.6018 17.7983 21.9647C17.9152 21.6616 18.0711 21.3342 18.2659 20.981C19.8241 18.3278 23.5636 15.828 27.9656 13.756C34.666 10.6096 42.9247 8.47721 47.5215 8.45593C47.7552 8.45481 47.989 8.25022 47.989 7.99935C47.989 7.74847 47.7552 7.54576 47.5215 7.54688C42.8078 7.56853 34.3935 9.72785 27.5373 12.9399C22.9405 15.1071 19.0448 17.7648 17.4476 20.5405C17.058 21.2386 16.7853 21.8613 16.6685 22.4142ZM17.5256 23.0462C17.4866 23.5573 17.6034 23.9691 17.8371 24.2946C18.1488 24.6885 18.6552 24.9379 19.2006 25.0861C20.1355 25.3325 21.2654 25.2963 22.2782 25.0708C22.9794 24.9091 23.6415 24.6515 24.07 24.3167C24.3038 24.1274 24.4598 23.9217 24.4988 23.6842C24.4988 23.442 24.3427 23.1956 24.07 22.9253C23.252 22.213 22.1613 22.042 21.0316 22.1323C19.8629 22.2264 18.5774 22.6079 17.5256 23.0462Z"
                fill="black"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.919934 38.0386C1.89383 35.5862 2.08883 32.7086 1.73823 30.114C1.69928 29.865 1.46562 29.6881 1.23188 29.7194C0.959194 29.7504 0.764187 29.9778 0.803143 30.2264C1.11479 32.678 0.958966 35.3977 0.0240289 37.7149C-0.0538826 37.9494 0.0630606 38.2122 0.296795 38.3018C0.569485 38.391 0.842023 38.2731 0.919934 38.0386Z"
                fill="black"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.906364 38.1686C2.58146 36.2317 5.42545 35.4399 7.95757 35.136C8.19131 35.1047 8.38609 34.8769 8.34713 34.6279C8.30818 34.3793 8.07429 34.2027 7.8016 34.2341C5.0747 34.5656 1.99735 35.4795 0.166433 37.5921C0.0106106 37.7863 0.0496424 38.0726 0.244421 38.2316C0.4392 38.3911 0.750541 38.3623 0.906364 38.1686Z"
                fill="black"
            ></path>
        </svg>
    );

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            toast.warn('Passwords do not match.')
            return;
        }

        if (!validatePassword(password)) {
            toast.warn('Password must be at least 8 characters long.')
            return;
        }

        setLoading(true);

        try {
            const auth = new AuthApi()
            await auth.Signup(name, password, email)
            navigate(`/verify-otp?email=${encodeURIComponent(email)}`)

        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-[404px] m-auto py-4 px-6">
            <Link to="/" className="w-fit flex items-center gap-10 py-[12px]">
                <img
                    src={Horiznlogo}
                    alt="Horiznlogo"
                    className="object-cover h-[30px] w-[30px]"
                />
                <h1 className="font-bold text-xLarge block block">Horizon Vault</h1>
            </Link>

            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className="text-[30px] font-semibold w-fit flex flex-col items-end">
                        <span>{arrow}</span>
                        <p className='font-sans'>Create new account</p>
                    </h1>
                    <p className="text-[14px] text-[#78778b]">
                        Welcome! Please enter your details
                    </p>
                </div>

                <div className="flex flex-col gap-[1rem] mt-[1rem]">
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-[5px] text-[#78778b] py-[12px] px-[20px] w-full border border-[#dadada] outline-none focus:border-[blue] focus:border-2 rounded-md"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-[5px] text-[#78778b] py-[12px] px-[20px] w-full border border-[#dadada] outline-none focus:border-[blue] focus:border-2 rounded-md"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-[5px] text-[#78778b] py-[12px] px-[20px] w-full border border-[#dadada] outline-none focus:border-[blue] focus:border-2 rounded-md"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div>
                        <label>Repeat password</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="mt-[5px] text-[#78778b] py-[12px] px-[20px] w-full border border-[#dadada] outline-none focus:border-[blue] focus:border-2 rounded-md"
                            placeholder="Repeat your password"
                            required
                        />
                    </div>

                    <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="border h-[15px] w-[15px]"
                                required
                            />
                            <label className="text-[#78778b]">
                                I agree with Terms of service
                            </label>
                        </div>
                    </div>

                    <button
                        className={`bg-[#7044ee] text-white w-full py-[14px] rounded-md ${
                            loading ? "opacity-50 cursor-default" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center gap-[7px]">
                                Processing
                                <ClipLoader color={"#ffffff"} loading={loading} size={20}/>
                            </div>
                        ) : (
                            "Proceed"
                        )}
                    </button>



                    <div className="font-semibold pb-4">
                        <span className="text-[#78778b]">Already have an account? </span>
                        <Link to="/signin">Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;
