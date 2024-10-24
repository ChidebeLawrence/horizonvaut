import { useState } from "react";

function Investment() {
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("Checkout");
  const [closeModal, setCloseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleWalletChange = (e) => setWallet(e.target.value);

  const handleInvest = () => {
    console.log("Investing", amount, "from", wallet);
  };

  const handleClose = () => {
    setCloseModal(!closeModal);
  };

  // Investment plans data
  const investmentPlans = [
    {
      name: "CRYPTO BASIC",
      dailyInterest: "5%",
      minimum: 500,
      maximum: 30000,
      profitFor: "Every Day",
      duration: "7 Days",
    },
    {
      name: "CRYPTO CLASSIC",
      dailyInterest: "10.5%",
      minimum: 5000,
      maximum: 49999,
      profitFor: "Every Day",
      duration: "7 Days",
    },
    {
      name: "CRYPTO PREMIUM",
      dailyInterest: "13%",
      minimum: 35000,
      maximum: 500000,
      profitFor: "Lifetime",
      duration: "Lifetime",
    },
    {
      name: "CRYPTOESATE STARTER",
      dailyInterest: "6.2%",
      minimum: 5000,
      maximum: 100000,
      profitFor: "Lifetime",
      duration: "Lifetime",
    },
    {
      name: "CRYPTOESATE SILVER",
      dailyInterest: "10.5%",
      minimum: 12500,
      maximum: 200000,
      profitFor: "Lifetime",
      duration: "Lifetime",
    },
    {
      name: "CRYPTOESATE GOLD",
      dailyInterest: "13%",
      minimum: 50000,
      maximum: 1000000,
      profitFor: "Every Day",
      duration: "7 Days",
    },
    {
      name: "BOT TRADE",
      dailyInterest: "0.9%",
      minimum: 150,
      maximum: 5000,
      profitFor: "Every Hour",
      duration: "Every Hour",
    },
  ];

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setCloseModal(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setCloseModal(false);
    }
  };

  return (
    <div className="text-black gap-8 px-4 lg:px-8 py-8">
      <div className="bg-white py-8 px-6">
        <div className="flex flex-col items-center">
          <h1 className="text-[30px] font-semibold">INVESTMENT PLANS</h1>
          <p className="text-gray-400">
            Select from our array of plans suitable for you
          </p>
        </div>

        <div className="flex gap-12 flex-wrap justify-center py-8">
          {investmentPlans.map((plan, index) => (
            <div
              key={index}
              className="min-w-[280px] flex-wrap shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05),0_-4px_6px_-2px_rgba(0,0,0,0.05)] p-6 flex flex-col justify-center items-center rounded-md"
            >
              <h1 className="font-semibold text-[20px]">{plan.name}</h1>
            <div>
                <span className="font-semibold text-[40px]">
                  {plan.dailyInterest}
                </span>
              <span className="text-[20px]">/daily</span>
            </div>
              <p className="font-semibold">Profit For {plan.profitFor}</p>
            <ul className="list-disc list-inside space-y-4 text-gray-700 text-[16px] py-4">
                <li>Minimum ${plan.minimum}</li>
                <li>Maximum ${plan.maximum}</li>
            </ul>
              <button
                onClick={() => handleOpenModal(plan)}
                className="bg-[#7044ee] hover:bg-[#825fe9] text-white py-2 px-12 rounded-md"
              >
              Invest Now
            </button>
          </div>
          ))}
          </div>

        {closeModal && selectedPlan && (
          <div onClick={handleOverlayClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white text-blaack p-8 rounded-lg w-[25rem] text-center">
              <button
                className="absolute top-2 right-2 text-2xl focus:outline-none"
                onClick={handleClose}
              >
                ×
            </button>
              <h2 className="text-xl font-bold mb-2">{selectedPlan.name}</h2>
              <p className="text-sm">
                Invest: ${selectedPlan.minimum} - ${selectedPlan.maximum}
              </p>
              <p className="text-sm">Interest: {selectedPlan.dailyInterest}</p>
              <p className="text-sm mb-4">
                Per {selectedPlan.duration}, {selectedPlan.profitFor}
              </p>

              <div className="text-left mb-4">
                <label className="block mb-2">Select Wallet</label>
                <select
                  value={wallet}
                  onChange={handleWalletChange}
                  className="w-full p-2 bg-white text-black rounded"
                >
                  <option value="Checkout">Checkout</option>
                  {/* Add more wallet options here */}
                </select>
          </div>

              <div className="text-left mb-4">
                <label className="block mb-2">Amount</label>
                <div className="flex items-center border rounded">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full p-2 bg-white text-black rounded-l"
                  />
                  <span className="p-2 bg-gray-200 text-black rounded-r">
                    USD
                  </span>
            </div>
          </div>

              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleInvest}
              >
              Invest Now
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Investment;
