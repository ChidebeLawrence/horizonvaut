import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchCryptos } from "@/redux/actions";

const CoinPrice = () => {
  const dispatch = useDispatch();
  const { market, loading } = useSelector((state) => state);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  const filteredMarket = market.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto relative">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or symbol..."
            className="p-2 border border-gray-300 rounded w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <table className="min-w-full bg-white text-black border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-center align-middle">#</th>
              <th className="border px-4 py-2 text-center align-middle">Name</th>
              <th className="border px-4 py-2 text-center align-middle">Price (USD) </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-8">
                  <ClipLoader />
                </td>
              </tr>
            ) : (
              filteredMarket.map((crypto, index) => (
                <tr key={crypto.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center align-middle">{index + 1}</td>
                  <td className="border px-4 py-2 flex items-center align-middle">
                    {crypto.name}
                  </td>
                  <td className="border px-4 py-2 text-right align-middle">
                    ${crypto.rate?.toLocaleString() || "N/A"}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinPrice;
