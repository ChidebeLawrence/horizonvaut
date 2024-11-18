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
              <th className="border px-4 py-2 text-center align-middle">Price</th>
              <th className="border px-4 py-2 text-center align-middle hidden sm:table-cell">1h %</th>
              <th className="border px-4 py-2 text-center align-middle">24h %</th>
              <th className="border px-4 py-2 text-center align-middle hidden sm:table-cell">7d %</th>
              <th className="border px-4 py-2 text-center align-middle hidden md:table-cell">Market Cap</th>
              <th className="border px-4 py-2 text-center align-middle hidden lg:table-cell">Volume (24h)</th>
              <th className="border px-4 py-2 text-center align-middle hidden lg:table-cell">Circulating Supply</th>
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
                    <img
                      src={crypto.image}
                      alt={`${crypto.name} Logo`}
                      className="w-6 h-6 mr-2"
                    />
                    {crypto.name}
                  </td>
                  <td className="border px-4 py-2 text-right align-middle">
                    ${crypto.current_price?.toLocaleString() || "N/A"}
                  </td>
                  <td
                    className={`border px-4 py-2 text-right hidden sm:table-cell align-middle ${
                      crypto.price_change_percentage_1h_in_currency >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_1h_in_currency
                      ? `${crypto.price_change_percentage_1h_in_currency.toFixed(2)}%`
                      : "N/A"}
                  </td>
                  <td
                    className={`border px-4 py-2 text-right align-middle ${
                      crypto.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_24h
                      ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A"}
                  </td>
                  <td
                    className={`border px-4 py-2 text-right hidden sm:table-cell align-middle ${
                      crypto.price_change_percentage_7d_in_currency >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_7d_in_currency
                      ? `${crypto.price_change_percentage_7d_in_currency.toFixed(2)}%`
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-right hidden md:table-cell align-middle">
                    ${crypto.market_cap?.toLocaleString() || "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-right hidden lg:table-cell align-middle">
                    ${crypto.total_volume?.toLocaleString() || "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-right hidden lg:table-cell align-middle">
                    {crypto.circulating_supply?.toLocaleString() || "N/A"} {crypto.symbol ? crypto.symbol.toUpperCase() : ""}
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
