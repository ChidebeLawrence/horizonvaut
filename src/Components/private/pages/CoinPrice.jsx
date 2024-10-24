import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoinPrice = () => {
    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchCryptos = async (pageNum = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/markets`,
                {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 50,
                        page: pageNum,
                        price_change_percentage: '1h,24h,7d',
                    },
                }
            );
            setCryptocurrencies(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCryptos(page);
    }, [page]);

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-black border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2 hidden sm:table-cell">1h %</th>
                                <th className="border px-4 py-2">24h %</th>
                                <th className="border px-4 py-2 hidden sm:table-cell">7d %</th>
                                <th className="border px-4 py-2 hidden md:table-cell">Market Cap</th>
                                <th className="border px-4 py-2 hidden lg:table-cell">Volume (24h)</th>
                                <th className="border px-4 py-2 hidden lg:table-cell">Circulating Supply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptocurrencies.map((crypto, index) => (
                                <tr key={crypto.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2 text-center">
                                        {(page - 1) * 50 + index + 1}
                                    </td>
                                    <td className="border px-4 py-2 flex items-center">
                                        <img
                                            src={crypto.image}
                                            alt={`${crypto.name} Logo`}
                                            className="w-6 h-6 mr-2"
                                        />
                                        {crypto.name}
                                    </td>
                                    <td className="border px-4 py-2 text-right">
                                        ${crypto.current_price.toLocaleString()}
                                    </td>
                                    {/* 1h % change */}
                                    <td
                                        className={`border px-4 py-2 text-right hidden sm:table-cell ${crypto.price_change_percentage_1h_in_currency >= 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                    >
                                        {crypto.price_change_percentage_1h_in_currency
                                            ? `${crypto.price_change_percentage_1h_in_currency.toFixed(2)}%`
                                            : 'N/A'}
                                    </td>
                                    {/* 24h % change */}
                                    <td
                                        className={`border px-4 py-2 text-right ${crypto.price_change_percentage_24h >= 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                    >
                                        {crypto.price_change_percentage_24h
                                            ? `${crypto.price_change_percentage_24h.toFixed(2)}%`
                                            : 'N/A'}
                                    </td>
                                    {/* 7d % change */}
                                    <td
                                        className={`border px-4 py-2 text-right hidden sm:table-cell ${crypto.price_change_percentage_7d_in_currency >= 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                    >
                                        {crypto.price_change_percentage_7d_in_currency
                                            ? `${crypto.price_change_percentage_7d_in_currency.toFixed(2)}%`
                                            : 'N/A'}
                                    </td>
                                    <td className="border px-4 py-2 text-right hidden md:table-cell">
                                        ${crypto.market_cap.toLocaleString()}
                                    </td>
                                    <td className="border px-4 py-2 text-right hidden lg:table-cell">
                                        ${crypto.total_volume.toLocaleString()}
                                    </td>
                                    <td className="border px-4 py-2 text-right hidden lg:table-cell">
                                        {crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">Page {page}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CoinPrice;
