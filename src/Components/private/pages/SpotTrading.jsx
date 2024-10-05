import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from "@/assets/images/searchGray.svg"
import Merket from '@/Utilities/Market';
import Limit from '@/Utilities/Limit';
import Trigger from '@/Utilities/Trigger';
import Chart from "react-apexcharts";

function SpotTrading() {
    const availableBalance = 0

    const [selectedCoin, setSelectedCoin] = useState(
        {
            id: "",
            name: "btc",
            current_price: 0,
            image: "btc",
            change: 0,
            high24h: 0,
            low24h: 0,
            volume: 0,
            amount: 0,
        }
    );
    const [currency, setCurrency] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeOrder, setActiveOrder] = useState('Market');
    const [activeHistrory, setActiveHistory] = useState('My Open Orders');

    const [seriesData, setSeriesData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);

    const handleOrderClick = (tab) => {
        setActiveOrder(tab);
    };

    const handleHistroryClick = (tab) => {
        setActiveHistory(tab);
    };

    const orderData = [
        // {
        //     date: "12/09/2024", pair: "BTC/USD", side: "Good", type: "Any", amount: 125, status: "success"
        // },
    ]
    const historyData = [
        // {
        //     date: "12/09/2024", pair: "ETC/USD", side: "Good", type: "Any", amount: 125, status: "success"
        // },
    ]


    useEffect(() => {
        return () => {
            // fetchList();
            fetchData()
        };
    }, []);

    const fetchList = async () => {
        const params = new URLSearchParams({
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 25,
            page: 1,
        });

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${params}`)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const coinDetails = data.map((item) => ({
                id: item.id,
                name: item.symbol,
                current_price: item.current_price,
                image: item.image,
                change: item.market_cap_change_percentage_24h,
                high24h: item.high_24h,
                low24h: item.low_24h,
                volume: item.total_volume,
                amount: item.circulating_supply,
            }));

            if (coinDetails.length > 0) {
                setSelectedCoin(coinDetails[0]);
            }

            setCurrency(coinDetails);

            const bitcoinData = {
                "current_price": 65454,
                "market_cap": 1293325011415,
                "high_24h": 65923,
                "low_24h": 64195,
            };

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setIsLoading(false); // Stop loading
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
            );
            const data = await response.json();

            const candleData = data.prices.map((price, index) => ({
                x: new Date(price[0]),
                y: [
                    price[1] - 50,
                    price[1] + 20,
                    price[1] - 20,
                    price[1],
                ],
            }));

            setSeriesData([{ data: candleData }]);
        } catch (error) {
            console.error("Error fetching candlestick data", error);
        }
    };

    const candlechart = {
        series: seriesData.length ? seriesData : [{
            data: [
                
            ]
        }],

        options: {
            chart: {
              height: 350,
              type: 'candlestick',
            },
            title: {
              text: 'CandleStick Chart - Category X-axis',
              align: 'left'
            },
            annotations: {
              xaxis: [
                {
                  x: 'Oct 06 14:00',
                  borderColor: '#00E396',
                  label: {
                    borderColor: '#00E396',
                    style: {
                      fontSize: '12px',
                      color: '#fff',
                      background: '#00E396'
                    },
                    orientation: 'horizontal',
                    offsetY: 7,
                    text: 'Annotation Test'
                  }
                }
              ]
            },
            tooltip: {
              enabled: true,
            },
            xaxis: {
              type: 'category',
              labels: {
                formatter: function(val) {
                  return dayjs(val).format('MMM DD HH:mm')
                }
              }
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          },

        // options: {
        //     chart: {
        //         type: 'candlestick',
        //         height: 400,
        //         background: '#131722',  // Dark background
        //         toolbar: {
        //             show: true,
        //             tools: {
        //                 download: true,
        //                 selection: true,
        //                 zoom: true,
        //                 zoomin: true,
        //                 zoomout: true,
        //                 pan: true,
        //                 reset: true,
        //             },
        //             autoSelected: 'zoom',
        //         },
        //     },
        //     title: {
        //         text: 'Bitcoin Candlestick Chart',
        //         align: 'left',
        //         style: {
        //             color: '#ffffff',
        //         },
        //     },
        //     xaxis: {
        //         type: 'datetime',
        //         labels: {
        //             style: {
        //                 colors: '#a0a0a0',  // Light grey for time labels
        //             },
        //         },
        //         axisBorder: {
        //             color: '#333',  // Dark axis border
        //         },
        //         // range: 10 * 60 * 1000,  // Show 10 minutes of data at a time (can adjust based on your data)
        //         // scrollbar: {
        //         //     enabled: true,  // Enable horizontal scrolling
        //         //     height: 20,
        //         //     track: {
        //         //         background: '#333',
        //         //     },
        //         //     thumb: {
        //         //         background: '#888',
        //         //     },
        //         // },
        //     },
        //     yaxis: {
        //         tooltip: {
        //             enabled: true,
        //         },
        //         labels: {
        //             style: {
        //                 colors: '#a0a0a0',  // Light grey for price labels
        //             },
        //             formatter: function (value) {
        //                 return `$${value.toFixed(2)}`;  // Format price in USD
        //             },
        //         },
        //     },
        //     // tooltip: {
        //     //     enabled: true,
        //     //     theme: 'dark',
        //     //     x: {
        //     //         format: 'dd MMM yyyy HH:mm',
        //     //     },
        //     //     y: {
        //     //         formatter: (val) => `$${val.toFixed(2)}`,
        //     //     },
        //     // },
        //     // grid: {
        //     //     borderColor: '#444',  // Subtle grid lines
        //     //     strokeDashArray: 3,   // Dashed lines for grid
        //     // },
        //     // markers: {
        //     //     size: 0,
        //     // },
        //     // stroke: {
        //     //     width: [1],
        //     //     colors: ['#666'],  // Thin lines for candlestick wicks
        //     // },
        //     // plotOptions: {
        //     //     candlestick: {
        //     //         colors: {
        //     //             upward: '#26A69A',  // Green for bullish candles
        //     //             downward: '#EF5350',  // Red for bearish candles
        //     //         },
        //     //         wick: {
        //     //             useFillColor: true,
        //     //         },
        //     //     },
        //     // },
        // },
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCurrency = currency.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-black' >
            <div className="flex flex-col text-white bg-black">
                <div className="flex flex-1 flex-col-reverse lg:flex-row">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-[25%] p-2 bg-black">
                        <div className="bg-[#17181e] p-2 h-[470px] mdLg:h-[485px] h-[470px] rounded-md overflow-auto">
                            <div className='relative'>
                                <input
                                    type="text"
                                    className="bg-[#1f2027] text-white w-full text-colorFive border border-none pl-[45px] py-[3px] px-4 rounded text-black box-border focus:border-blue-500 focus:outline-none"
                                    placeholder="Search"
                                    onChange={handleSearchChange}
                                />
                                <img src={Search} alt='search' className='absolute top-[7px] left-[10px] w-[15px] h-[15px]' />
                            </div>

                            <div className='overflow-y-auto rounded-md border border-[#17181e] pt-[5px]'>
                                <table className='text-[11px] w-full text-left border-collapse table-fixed'>
                                    <thead className='text-[#b7bdc6]'>
                                        <th className='w-1/2 font-normal'>Currency</th>
                                        <th className='w-1/3 font-normal text-right'>Last</th>
                                        <th className='w-1/3 font-normal text-right'>Change</th>
                                    </thead>

                                    <tbody>
                                        <p>{isLoading && <p>Loading...</p>}</p>
                                        <p>{error && <p>Error: {error}</p>}</p>

                                        {filteredCurrency.map((coin, index) => (
                                            <tr key={index} onClick={() => setSelectedCoin(coin)} className="hover:bg-[#1e1f25] cursor-pointer">
                                                <td className="flex items-end space-x-2 py-[10px]">
                                                    <span>
                                                        <img src={coin.image} alt={coin.image} className="w-[20px] h-[]" />
                                                    </span>
                                                    <span className='uppercase'>
                                                        {coin.name}
                                                        <span className="text-[#b7bdc6]">/USD</span>
                                                    </span>
                                                </td>
                                                <td className="text-[#b7bdc6] text-right">{coin.current_price}</td>
                                                <td className="text-[#03a66d] text-right">{coin.change}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Trades section */}
                        <div className="overflow-y-auto rounded-md border border-[#17181e] bg-[#17181e] mt-[10px] h-[470px] mdLg:h-[485px] lg:h-[470px] overflow-auto">

                            <p className='border-b border-[#f4f9ff1a] p-2'>Trades</p>
                            <table className='text-[11px] w-full border-collapse table-fixed'>
                                <thead className='text-[#b7bdc6] text-left'>
                                    <th className='w-1/3 font-normal p-2'>Price(USDT)</th>
                                    <th className='w-1/4 font-normal p-2'>Size(BTC)</th>
                                    <th className='w-1/4 font-normal text-right px-4'>Time</th>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className='w-1/3 font-normal text-[#f6465d] px-2'>57,976.94</td>
                                        <td className='w-1/3 font-normal text-[#b7bdc6] p-2'>0.089574</td>
                                        <td className='w-1/3 font-normal text-[#b7bdc6] p-2 text-right px-4'>12.9 14:15</td>
                                    </tr>
                                    <tr>
                                        <td className='w-1/3 font-normal text-[#03a66d] px-2'>57,976.94</td>
                                        <td className='w-1/3 font-normal text-[#b7bdc6] p-2'>0.089574</td>
                                        <td className='w-1/3 font-normal text-[#b7bdc6] p-2 text-right px-4'>12.9 14:15</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </aside>

                    {/* Main Content - Chart and Order Book */}
                    <main className="w-full p-2 flex flex-col space-y-2">
                        <div className="flex space-x-4">
                            {selectedCoin && <div className='w-full bg-[#17181e] text-[#f4f7ff] flex gap-[2rem] py-[10px] px-[16px] rounded-md overflow-auto'>
                                <p className='text-[20px] font-semibold flex gap-[12px] items-center justify-center uppercase'>
                                    <img src={selectedCoin.image} alt={selectedCoin.image} className='h-[28px] w-[28px]' />
                                    {selectedCoin.name}/USD
                                </p>

                                <div className='flex gap-[3rem] items-center'>
                                    <div>
                                        <p className='text-[18px] text-[#03a66d]'>{selectedCoin.current_price}</p>
                                        <p className='text-[12px] text-[#b7bdc6]'>≈${selectedCoin.current_price}</p>
                                    </div>
                                    <div>
                                        <p className='text-[12px] text-[#b7bdc6] pb-[3px]'>24h Change</p>
                                        <p className='text-[#03a66d]'>{selectedCoin.change}%</p>
                                    </div>
                                    <div className='text-[12px] text-[#b7bdc6]'>
                                        <p>24h High</p>
                                        <p className='text-[#f4f7ff] pt-[3px]'>{selectedCoin.high24h}</p>
                                    </div>
                                    <div className='text-[12px] text-[#b7bdc6]'>
                                        <p>24h Low</p>
                                        <p className='text-[#f4f7ff] pt-[3px]'>{selectedCoin.low24h}</p>
                                    </div>
                                    <div className='text-[12px] text-[#b7bdc6]'>
                                        <p>24h Volume</p>
                                        <p className='text-[#f4f7ff] pt-[3px]'>{selectedCoin.volume}</p>
                                    </div>
                                    <div className='text-[12px] text-[#b7bdc6]'>
                                        <p>24h Amount(USDT)</p>
                                        <p className='text-[#f4f7ff] pt-[3px]'>{selectedCoin.amount}</p>
                                    </div>
                                </div>
                            </div>}
                        </div>

                        <div className="flex gap-4 flex-col lg:flex-row">
                            <div className='w-full lg:w-[75%]'>
                                {/* Chart Section */}
                                <div className="w-[100%] bg-black">
                                    <div className="bg-white h-[504.99px] bg-[#17181e]">
                                        {/* Placeholder for the chart */}
                                        {/* <Chart
                                            options={candlechart.options}
                                            series={candlechart.series}
                                            type="candlestick"
                                            width="100%"
                                            height={500}
                                        /> */}

                                        <Chart
                                            options={candlechart.options}
                                            series={candlechart.series}
                                            type="candlestick"
                                            width="100%"
                                            height={505}
                                        />
                                    </div>

                                    {/* Trade Inputs Section */}
                                    <div className="space-x-4 text-[#8c90a5] text-[16px] mt-2 bg-[#17181e]">
                                        <div className='bg-[#1f2027] text-[#8c90a5] flex text-[12px]'>
                                            <p className={`px-4 py-2 ${activeOrder === "Limit" ? "border-t border-[blue] border-t-2 text-white" : ""} cursor-pointer`} onClick={() => handleOrderClick('Limit')}>Limit</p>
                                            <p className={`px-4 py-2 ${activeOrder === "Market" ? "border-t border-[blue] border-t-2 text-white" : ""} cursor-pointer`} onClick={() => handleOrderClick('Market')}>Market</p>
                                            <p className={`px-4 py-2 ${activeOrder === "Trigger Order" ? "border-t border-[blue] border-t-2 text-white" : ""} cursor-pointer`} onClick={() => handleOrderClick('Trigger Order')}>Trigger Order</p>
                                        </div>

                                        <div className='flex gap-[30px] text-[14px] pr-[16px] flex-col md:flex-row'>
                                            {activeOrder === 'Limit' && <>
                                                <div className='w-full md:w-1/2'>
                                                    <Limit pair="USDT" balance={availableBalance.toFixed(2)} bid="Buy BTC" bgcolor="bg-[#03a36b]" one="Price" two="Size" three="Amount" pairOne="USDT" />
                                                </div>

                                                <div className='w-full md:w-1/2'>
                                                    <Limit pair="USDT" balance={availableBalance.toFixed(2)} bid="Buy BTC" bgcolor="bg-[#ee445a]" one="Amount" two="Size" three="Total" pairOne="BTC" />
                                                </div>
                                            </>}

                                            {activeOrder === 'Market' && <>
                                                <div className='w-full md:w-1/2'>
                                                    <Merket pair="USDT" balance={availableBalance.toFixed(2)} currency="BTC" bid="Buy BTC" get="purchase" bgcolor="bg-[#03a36b]" />
                                                </div>

                                                <div className='w-full md:w-1/2'>
                                                    <Merket pair="BTC" balance={availableBalance.toFixed(8)} currency="USDT" bid="Sell BTC" get="sale" bgcolor="bg-[#ee445a]" />
                                                </div>
                                            </>}

                                            {activeOrder === 'Trigger Order' && <>
                                                <div className='w-full md:w-1/2'>
                                                    <Trigger pair="USDT" balance={availableBalance.toFixed(2)} bid="Buy BTC" bgcolor="bg-[#03a36b]" />
                                                </div>

                                                <div className='w-full md:w-1/2'>
                                                    <Trigger pair="BTC" balance={availableBalance.toFixed(8)} bid="Sell BTC" bgcolor="bg-[#ee445a]" />
                                                </div>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Book Section */}
                            <div className="bg-[#17181e] w-full lg:w-[25%]">
                                <p className='text-[16px] font-semibold border-b border-[#f4f9ff1a] p-2'>Order Book</p>
                                <div className='text-[12px]'>
                                    <table className='text-[#b7bdc6] w-full border-collapse table-fixed'>
                                        <thead>
                                            <th className='w-1/2 text-left font-thin p-2'>Price(USDT)</th>
                                            <th className='w-1/2 text-right font-thin p-2'>Size(BTC)</th>
                                        </thead>

                                        <tbody>
                                            <tr className='bg-[#321e25]'>
                                                <td className='w-1/2 text-left px-2 text-[#f6465d]'>57,976.94</td>
                                                <td className='w-1/2 text-right px-2'>0.211727</td>
                                            </tr>
                                            <tr>
                                                <td className='w-1/2 text-left px-2 text-[#f6465d]'>57,976.94</td>
                                                <td className='w-1/2 text-right px-2'>0.211727</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <div className='flex justify-center items-center gap-[8px] text-[14px] bg-[#1f2027] py-2 border-b border-[#f4f9ff1a] border-t border-[#f4f9ff1a]'>
                                        <span className='font-semibold text-[16px] text-[#03a66d]'>58034.97</span>
                                        <span>≈$58034.97</span>
                                    </div>

                                    <table className='text-[#b7bdc6] w-full border-collapse table-fixed'>
                                        <tr className='bg-[#142927]'>
                                            <td className='w-1/2 text-left px-2 text-[#03a66d]'>57,976.94</td>
                                            <td className='w-1/2 text-right px-2'>0.211727</td>
                                        </tr>
                                        <tr className='bg-[]'>
                                            <td className='w-1/2 text-left px-2 text-[#03a66d]'>57,976.94</td>
                                            <td className='w-1/2 text-right px-2'>0.211727</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Open Orders / Trading History */}
                <div className="bg-[#17181e] text-[#8c90a5] m-[10px] lg:mb-[1rem]">
                    <div className="flex bg-[#1f2027]">
                        <span className={`p-2 text-[#8c9085] cursor-pointer ${activeHistrory === "My Open Orders" ? "border-t border-[blue] border-t-2 text-[white]" : ""}`} onClick={() => handleHistroryClick("My Open Orders")}>My Open Orders</span>
                        <span className={`p-2 text-[#8c9085] cursor-pointer ${activeHistrory === "My Trading History" ? "border-t border-[blue] border-t-2 text-[white]" : ""}`} onClick={() => handleHistroryClick("My Trading History")}>My Trading History</span>
                    </div>

                    <div className="mt-4 h-[350px] overflow-auto">
                        <table className="min-w-[600px] w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className='font-normal w-1/6 px-[10px]'>Date</th>
                                    <th className='font-normal w-1/6'>Pair</th>
                                    <th className='font-normal w-1/6'>Side</th>
                                    <th className='font-normal w-1/6'>Type</th>
                                    <th className='font-normal w-1/6'>Amount</th>
                                    <th className='font-normal w-1/6'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.length === 0 ?
                                    (<tr>
                                        {activeHistrory === "My Open Orders" && <td colSpan="6" className="text-center pt-[9rem]">No open orders</td>}
                                    </tr>)
                                    :
                                    (orderData.map((data) => (
                                        activeHistrory === "My Open Orders" && <tr>
                                            <td className='w-1/6 py-[7px] px-[7px]'>{data.date}</td>
                                            <td className='w-1/6'>{data.pair}</td>
                                            <td className='w-1/6'>{data.side}</td>
                                            <td className='w-1/6'>{data.type}</td>
                                            <td className='w-1/6'>{data.amount}</td>
                                            <td className='w-1/6'>{data.status}</td>
                                        </tr>
                                    )))
                                }

                                {historyData.length === 0 ?
                                    (<tr>
                                        {activeHistrory === "My Trading History" && <td colSpan="6" className="text-center pt-[9rem]">No historical orders</td>}
                                    </tr>)
                                    :
                                    (historyData.map((data) => (
                                        activeHistrory === "My Trading History" && <tr>
                                            <td className='w-1/6 py-[7px] px-[7px]'>{data.date}</td>
                                            <td className='w-1/6'>{data.pair}</td>
                                            <td className='w-1/6'>{data.side}</td>
                                            <td className='w-1/6'>{data.type}</td>
                                            <td className='w-1/6'>{data.amount}</td>
                                            <td className='w-1/6'>{data.status}</td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SpotTrading
