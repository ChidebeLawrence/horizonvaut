import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import {CommonAPI} from "@/api/CommonAPI";

function Investment() {
    const [wallet, setWallet] = useState("Cash");
    const [closeModal, setCloseModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentWallet, setPaymentWallet] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [loadingWallet, setLoadingWallet] = useState(false);
    const [schemes, setSchemes] = useState([]);
    const [error, setError] = useState("");
    const common = new CommonAPI()
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const handleWalletChange = (e) => setWallet(e.target.value);

    const amount = watch("amount", "");

    const fetchPaymentWallet = async () => {
        try {
            setLoadingWallet(true); // Set loading for wallet fetch
            const authToken = localStorage.getItem("authToken");
            const response = await fetch(
                "https://api.fomobitmax.com/investment/payment-wallet",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            const result = await response.json();
            if (response.ok) {
                setPaymentWallet(result.data);
                setShowSuccessModal(true);
            } else {
                toast.warn("Failed to retrieve payment wallet details");
            }
        } catch (error) {
            console.error("Error fetching payment wallet:", error);
            toast.error("An error occurred while retrieving wallet details.");
        } finally {
            setLoadingWallet(false); // Set loading off after the fetch completes
        }
    };

    const createInvestment = async (data) => {
        if (!selectedPlan) return;

        const payload = {
            scheme_id: selectedPlan.id,
            amount: data.amount,
            deposit_type: wallet.toLowerCase(),
        };

        try {
            setLoading(true);
            const authToken = localStorage.getItem("authToken");
            const response = await fetch(
                "https://api.fomobitmax.com/investment/create-investment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();
            if (response.ok) {
                toast.success("Your investment has been created successfully!");
                setCloseModal(false);
                setShowSuccessModal(true);
                setSuccessMessage(
                    result.message || "Your investment has been created successfully!"
                );

                if (wallet === "Wallet") {
                    fetchPaymentWallet();
                }
            } else {
                console.error(
                    "Error creating investment:",
                    result.message || "Unknown error"
                );
                toast.warn(`Error: ${result.message || "Failed to create investment"}`);
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const confirmPayment = async () => {
        try {
            setIsConfirming(true);
            const authToken = localStorage.getItem("authToken");
            const response = await fetch(
                "https://api.fomobitmax.com/investment/confirm-payment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({investment_id: selectedPlan.id}),
                }
            );

            const result = await response.json();
            if (response.ok) {
                setShowSuccessModal(false);
                toast.success("Payment confirmed successfully");
            } else {
                setConfirmationMessage(`Error: ${result.message || "Payment failed."}`);
            }
        } catch (error) {
            setConfirmationMessage("An error occurred during confirmation.");
        } finally {
            setIsConfirming(false);
            setCloseModal(false);
            setShowSuccessModal(false);
        }
    };

    const handleInvest = (data) => {
        if (
            data.amount < selectedPlan.minimum ||
            data.amount > selectedPlan.maximum
        ) {
            toast.warn(
                `Amount must be between $${selectedPlan.minimum} and $${selectedPlan.maximum}`
            );
            return;
        }
        if (wallet === "Cash") {
            createInvestment(data);
        } else if (wallet === "Wallet") {
            fetchPaymentWallet();
        }
    };

    const handleOpenModal = (plan) => {
        setSelectedPlan(plan);
        setCloseModal(true);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setCloseModal(false);
        }
    };

    const fetchInvestmentSchemes = async () => {
        setLoading(true);
        try {
            const result = await common.GetInvestmentSchemes()
            setSchemes(result);
        } catch (error) {
            setError(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestmentSchemes();
    }, []);

    function capitalizeFirstLetter(string) {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="text-black gap-8 px-4 lg:px-8 py-12">
            <div className="bg-white rounded-2xl p-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-semibold text-[#333] leading-tight">
                        Investment Plans
                    </h1>
                    <p className="text-gray-500 text-lg mt-2">
                        Select from our array of plans suitable for you
                    </p>
                </div>

                <div className="flex gap-12 flex-wrap justify-center">
                    {loading && <ClipLoader size={35} color="#3498db"/>}
                    {error && <p className="text-red-500">{error}</p>}
                    {schemes.map((plan) => (
                        <div
                            key={plan.id}
                            className="min-w-[280px] max-w-[340px] flex-wrap shadow-lg p-6 flex flex-col justify-between items-center rounded-xl bg-white transform hover:shadow-2xl"
                        >
                            <h2 className="font-semibold text-2xl text-[#333]">
                                {plan.name}
                            </h2>

                            <p className="font-semibold text-sm text-[#444] mt-2">
                                Profit For
                            </p>

                            <div className="flex items-center gap-2 mt-4">
                <span className="font-bold text-4xl text-[#7044ee]">
                  {plan.rate}%
                </span>
                                <span className="text-lg text-gray-500">/{plan.interval}</span>
                            </div>

                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-md py-4">
                                <li>Minimum ${plan.minimum}</li>
                                <li>Maximum ${plan.maximum}</li>
                            </ul>

                            <button
                                onClick={() => handleOpenModal(plan)}
                                className="bg-[#7044ee] hover:bg-[#825fe9] text-white py-3 px-12 rounded-md mt-6"
                            >
                                Invest Now
                            </button>
                        </div>
                    ))}
                </div>

                {closeModal && selectedPlan && (
                    <div
                        onClick={handleOverlayClick}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                        <div
                            className="relative bg-white text-black p-8 rounded-2xl w-[28rem] max-w-full sm:w-[32rem] md:w-[36rem] lg:w-[40rem] text-center shadow-2xl transition-all transform hover:scale-105">
                            <button
                                className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-800 focus:outline-none"
                                onClick={() => setCloseModal(false)}
                            >
                                ×
                            </button>

                            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                                {selectedPlan.name}
                            </h2>
                            <p className="text-lg mb-3 text-gray-700">
                                Invest:{" "}
                                <span className="font-bold text-[#7044ee]">
                  ${selectedPlan.minimum} - ${selectedPlan.maximum}
                </span>
                            </p>
                            <p className="text-sm mb-6 text-gray-500">
                                {capitalizeFirstLetter(selectedPlan.interval)}, {selectedPlan.rate}%
                            </p>

                            <form onSubmit={handleSubmit(handleInvest)} className="space-y-6">
                                <div className="text-left mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Select Wallet
                                    </label>
                                    <select
                                        value={wallet}
                                        onChange={handleWalletChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7044ee] focus:outline-none"
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Wallet">Wallet</option>
                                    </select>
                                </div>

                                <div className="text-left mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7044ee] focus:outline-none"
                                        {...register("amount", {required: "Amount is required"})}
                                    />
                                    {errors.amount && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-3 px-12 text-white rounded-md transition-all ${
                                        loading || loadingWallet
                                            ? "bg-[#a18be1] cursor-not-allowed"
                                            : "bg-[#7044ee] hover:bg-[#825fe9]"
                                    }`}
                                    disabled={loading || loadingWallet}
                                >
                                    {loading || loadingWallet ? (
                                        <span className="flex items-center justify-center gap-2">
                      Proceeding... <ClipLoader size="16px" color="white"/>
                    </span>
                                    ) : (
                                        "Proceed"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {showSuccessModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[35rem] max-w-full text-center shadow-lg sm:w-[30rem] md:w-[40rem] lg:w-[50rem] transition-all transform hover:scale-105">
                            <h2 className="text-xl font-bold mb-4 text-[#333]">
                                Investment In Progress!
                            </h2>

                            {amount && (
                                <div className="bg-yellow-100 p-4 my-4 border-l-4 border-yellow-500">
                                    <p className="text-sm text-yellow-700">{successMessage}</p>
                                    <p className="text-lg">
                                        You are about to deposit{" "}
                                        <span className="font-bold text-lg">${amount}</span>.
                                    </p>
                                </div>
                            )}

                            <p className="text-[#888] text-sm break-words">
                                Do not refresh the page while the transaction is in process...
                            </p>

                            {paymentWallet && wallet === "Wallet" && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-inner">
                                    <h3 className="text-lg font-semibold text-[#7044ee] mb-3">
                                        Wallet Details
                                    </h3>
                                    <div className="space-y-2 text-left text-sm text-[#444]">
                                        <p>
                                            <strong>Cryptocurrency:</strong> {paymentWallet.name}
                                        </p>
                                        <p>
                                            <strong>Exchange Rate:</strong> $
                                            {paymentWallet.rate.toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Symbol:</strong> {paymentWallet.symbol}
                                        </p>
                                        <p>
                                            <strong>Wallet ID:</strong>
                                            <span className="break-words">
                        {paymentWallet.wallet_id}
                      </span>
                                        </p>
                                        <p>
                                            <strong>Network:</strong> {paymentWallet.wallet_network}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={confirmPayment}
                                    className={`w-full py-2 px-4 text-white font-semibold rounded-md focus:outline-none ${
                                        isConfirming
                                            ? "bg-[#5dcc8b]"
                                            : "bg-[#48BB78] hover:bg-[#38A15C]"
                                    }`}
                                    disabled={isConfirming}
                                >
                                    {isConfirming ? (
                                        <span className="flex items-center justify-center gap-2">
                      Confirm Payment <ClipLoader size="16px" color="white"/>
                    </span>
                                    ) : (
                                        "Confirm Payment"
                                    )}
                                </button>

                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Investment;
