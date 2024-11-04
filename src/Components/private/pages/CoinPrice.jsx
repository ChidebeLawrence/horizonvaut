import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchCryptos } from "@/redux/actions";

const CoinPrice = () => {
  const dispatch = useDispatch();
  const { market, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full min-h-[450px] bg-white text-black border border-gray-300 relative">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2 hidden sm:table-cell">1h %</th>
              <th className="border px-4 py-2">24h %</th>
              <th className="border px-4 py-2 hidden sm:table-cell">7d %</th>
              <th className="border px-4 py-2 hidden md:table-cell">
                Market Cap
              </th>
              <th className="border px-4 py-2 hidden lg:table-cell">
                Volume (24h)
              </th>
              <th className="border px-4 py-2 hidden lg:table-cell">
                Circulating Supply
              </th>
            </tr>
          </thead>

          {loading ? (
            <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
              <ClipLoader />
            </div>
          ) : (
            <tbody>
              {market.map((crypto, index) => (
                <tr key={crypto.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 flex items-center">
                    <img
                      src={crypto.image}
                      alt={`${crypto.name} Logo`}
                      className="w-6 h-6 mr-2"
                    />
                    {crypto.name}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    ${crypto.current_price?.toLocaleString() || "N/A"}
                  </td>
                  <td
                    className={`border px-4 py-2 text-right hidden sm:table-cell ${
                      crypto.price_change_percentage_1h_in_currency >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_1h_in_currency
                      ? `${crypto.price_change_percentage_1h_in_currency.toFixed(
                          2
                        )}%`
                      : "N/A"}
                  </td>
                  <td
                    className={`border px-4 py-2 text-right ${
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
                    className={`border px-4 py-2 text-right hidden sm:table-cell ${
                      crypto.price_change_percentage_7d_in_currency >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.price_change_percentage_7d_in_currency
                      ? `${crypto.price_change_percentage_7d_in_currency.toFixed(
                          2
                        )}%`
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-right hidden md:table-cell">
                    ${crypto.market_cap?.toLocaleString() || "N/A"}
                  </td>
                  <td className="border px-4 py-2 text-right hidden lg:table-cell">
                    ${crypto.total_volume?.toLocaleString() || "N/A"}
                  </td>
                  {/* <td className="border px-4 py-2 text-right hidden lg:table-cell">
                    {crypto.circulating_supply?.toLocaleString() || "N/A"} {crypto.symbol.toUpperCase()}
                  </td> */}

                  <td className="border px-4 py-2 text-right hidden lg:table-cell">
                    {crypto.circulating_supply?.toLocaleString() || "N/A"}
                    {crypto.symbol ? crypto.symbol.toUpperCase() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default CoinPrice;
