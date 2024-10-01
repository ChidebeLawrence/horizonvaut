import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const coins = useSelector((state) => state.coins);

  // Separate coins into individual categories and "Other coins"
  const individualCoins = coins.filter(
    (coin) => coin.Abbr === 'BTC' || coin.Abbr === 'ETH'
  );

  const otherCoins = coins.filter(
    (coin) => coin.Abbr !== 'BTC' && coin.Abbr !== 'ETH'
  );

  // Calculate data for "Other coins"
  const otherTotal = otherCoins.reduce((sum, coin) => sum + parseFloat(coin.Total), 0);

  // Combine individual coins and "Other coins"
  const allCoins = [...individualCoins, { Abbr: 'Other', Total: otherTotal }];
  const labels = allCoins.map((coin) => coin.Abbr);
  const totals = allCoins.map((coin) => parseFloat(coin.Total));

  const total = totals.reduce((sum, value) => sum + value, 0);

  // Calculate percentages for the chart
  let percentages = [];
  if (total === 0) {
    percentages = [0.5, 0.5, 99.0]; // Custom percentages for the chart
  } else {
    percentages = totals.map((value) => (total > 0 ? (value / total) * 100 : 0));
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Allocation',
        data: percentages,
        backgroundColor: ['#794ae3', '#f39daa', '#80de94'],
        borderColor: ['#794ae3', '#f39daa', '#80de94'],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    devicePixelRatio: 2,
  };

  return (
    <div className="flex items-center justify-center relative py-[20px]">
    {/* <div className="flex items-center justify-center absolute"> */}
      <div className="relative" style={{ width: '104px', height: '104px' }}>
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs font-medium text-gray-500">Allocation</p>
        </div>
      </div>
      <div className="ml-6">
        {allCoins.map((coin, index) => (
          <div key={coin.Abbr} className={`py-[5px] ${index < allCoins.length - 1 ? 'border-b border-[#DADADA]' : ''}`}>
            <span className="text-[#404053] text-[14px]">{coin.Abbr}</span>
            <span className="text-gray-500"> {total === 0 ? totals[index].toFixed(2) : percentages[index].toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
