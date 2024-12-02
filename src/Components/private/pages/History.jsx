import React, { useState, useEffect } from "react";
import SubHeader from "@/Utilities/SubHeader";
import Empty from "@/assets/images/empty.svg";
import { ClipLoader } from "react-spinners";

function History() {
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("transactionHistory");

  const wallet_overview = (
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
        stroke="#FF5B5B"
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (activeTab === "transactionHistory") {
      fetchHistory();
    }
    if (activeTab === "allInvestments") {
      fetchInvestments();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://api.fomobitmax.com/wallet/history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Please check network connection " + response.statusText
        );
      }

      const result = await response.json();
      const transactionData = result.data;

      const transactionList = transactionData.map((transaction) => {
        const formattedDate = new Date(
          transaction.last_updated * 1000
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        return {
          time: formattedDate,
          lastUpdated: transaction.last_updated,
          type: capitalizeFirstLetter(transaction.transaction_type),
          amount: transaction.amount,
          asset: transaction.coin.symbol.toUpperCase(),
          status: capitalizeFirstLetter(transaction.status),
          address: transaction.receiver?.email || transaction.receiver_address,
          receiver_address: transaction.receiver_address || "N/A",
        };
      });

      const sortedTransactions = transactionList.sort(
        (a, b) => b.lastUpdated - a.lastUpdated
      );

      localStorage.setItem(
        "transactionHistory",
        JSON.stringify(sortedTransactions)
      );
      setTransaction(sortedTransactions);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        setError("No authentication token found.");
        return;
      }
  
      const response = await fetch(
        "https://api.fomobitmax.com/investment/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching investments: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Investments response:", result);
  
      if (result && result.data) {
        // Sort investments by created_at (timestamp)
        const sortedInvestments = result.data.sort(
          (a, b) => b.created_at - a.created_at
        );
  
        // Format data for UI
        const investmentData = sortedInvestments.map((investment) => {
          const formattedDate = new Date(
            investment.created_at * 1000
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
  
          return {
            time: formattedDate,
            investment_name: investment.investment_name,
            deposit_type: investment.deposit_type,
            amount: investment.amount,
            investment_rate: investment.investment_rate,
            status: capitalizeFirstLetter(investment.status),
          };
        });
  
        setInvestments(investmentData);
        setError("");
      } else {
        setError("No investments found.");
      }
    } catch (error) {
      console.error("Error fetching investments:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <SubHeader
        sub_header_icon={wallet_overview}
        header="Transaction History"
        content="Your recent transactions"
      />

      <div className="max-w-5xl mx-auto px-4 py-6 bg-white rounded-lg">
        <div className="flex justify-end mb-4 space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "transactionHistory"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("transactionHistory")}
          >
            Transaction History
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "allInvestments"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("allInvestments")}
          >
            All Investments
          </button>
        </div>

        {activeTab === "transactionHistory" && (
          <div className="bg-white overflow-auto rounded-md border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Asset
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Address / Email
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center">
                        <ClipLoader
                          loading={loading}
                          size={35}
                          color="#3498db"
                        />
                      </td>
                    </tr>
                  ) : transaction.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-16 text-center">
                        <img
                          src={Empty}
                          alt="No transactions found"
                          className="w-20 mx-auto mb-4"
                        />
                        <p className="text-gray-500">No transfers found</p>
                      </td>
                    </tr>
                  ) : (
                    transaction.map((transaction, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{transaction.time}</td>
                        <td className="py-3 px-4">{transaction.type}</td>
                        <td className="py-3 px-4">
                          $ {transaction.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">{transaction.asset}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              transaction.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : transaction.status === "Failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {transaction.address || transaction.receiver_address}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "allInvestments" && (
          <div className="bg-white overflow-auto rounded-md border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Investment Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Deposit Type
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Rate
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center">
                        <ClipLoader
                          loading={loading}
                          size={35}
                          color="#3498db"
                        />
                      </td>
                    </tr>
                  ) : investments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-16 text-center">
                        <img
                          src={Empty}
                          alt="No investments found"
                          className="w-20 mx-auto mb-4"
                        />
                        <p className="text-gray-500">No investments found</p>
                      </td>
                    </tr>
                  ) : (
                    investments.map((investment, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{investment.time}</td>
                        <td className="py-3 px-4">
                          {investment.investment_name}
                        </td>
                        <td className="py-3 px-4">{investment.deposit_type}</td>
                        <td className="py-3 px-4">
                          $ {investment.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          {investment.investment_rate}%
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              investment.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : transaction.status === "Failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {investment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
