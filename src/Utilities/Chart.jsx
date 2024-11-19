import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const coinsObject = useSelector((state) => state.coins);
    const coins = Object.values(coinsObject);

  const individualCoins = coins.filter(
    (coin) => coin.wallet_name === 'Bitcoin' || coin.wallet_name === 'Ethereum'
  );

  const otherCoins = coins.filter(
    (coin) => coin.wallet_name !== 'Bitcoin' && coin.wallet_name !== 'Ethereum'
  );

  const otherTotal = otherCoins.reduce((sum, coin) => sum + parseFloat(coin.balance), 0);

  const allCoins = [...individualCoins, { wallet_name: 'Other', balance: otherTotal }];
  const labels = allCoins.map((coin) => coin.wallet_name);
  const totals = allCoins.map((coin) => Number(coin.balance));

  const total = totals.reduce((sum, value) => sum + value, 0);
  let percentages = [];
  if (total === 0) {
    percentages = [0.5, 0.5, 99.0];
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
      <div className="relative" style={{ width: '104px', height: '104px' }}>
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xs font-medium text-gray-500">Allocation</p>
        </div>
      </div>
      <div className="ml-6">
        {allCoins.map((coin, index) => (
          <div key={coin.wallet_name} className={`py-[5px] ${index < allCoins.length - 1 ? 'border-b border-[#DADADA]' : ''}`}>
            <span className="text-[#404053] text-[14px]">{coin.wallet_name}</span>
            <span className="text-gray-500"> {total === 0 ? totals[index].toFixed(2) : percentages[index].toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
