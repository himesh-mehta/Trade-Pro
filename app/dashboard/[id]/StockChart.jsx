"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Title,
  Legend
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

// Generate simulated candlestick data
function generateCandlestickData(seed, points) {
  const data = [];
  let lastClose = seed;
  for (let i = 0; i < points; i++) {
    const open = lastClose + Math.random() * 10 - 5;
    const close = open + Math.random() * 10 - 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;
    data.push({ x: `#${i + 1}`, o: open, h: high, l: low, c: close });
    lastClose = close;
  }
  return data;
}

export default function StockChart({ stock = "UNKNOWN" }) {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState("5M");
  const [currentValue, setCurrentValue] = useState(0);
  const [change, setChange] = useState({ value: 0, percentage: 0 });
  const intervalRef = useRef(null);

  const pointsForRange = (range) => {
    switch (range) {
      case "5M": return 5;
      case "10M": return 10;
      case "15M": return 15;
      case "30M": return 30;
      case "1H": return 60;
      default: return 5;
    }
  };

  // Initial load and interval updates
  useEffect(() => {
    const seed = 4250;
    const points = pointsForRange(timeRange);
    const initialData = generateCandlestickData(seed, points);
    setData(initialData);

    const last = initialData[initialData.length - 1].c;
    const base = initialData[0].o;
    setCurrentValue(last);
    setChange({ value: last - base, percentage: base ? ((last - base) / base) * 100 : 0 });

    intervalRef.current = setInterval(() => {
      setData(prev => {
        const newPoints = generateCandlestickData(prev[prev.length - 1].c, 1);
        const next = [...prev, ...newPoints];
        const lastClose = newPoints[newPoints.length - 1].c;
        const baseVal = next[0].o;
        setCurrentValue(lastClose);
        setChange({ value: lastClose - baseVal, percentage: baseVal ? ((lastClose - baseVal) / baseVal) * 100 : 0 });
        return next;
      });
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [timeRange]);

  const chartData = {
    datasets: [
      {
        label: stock,
        data,
        color: {
          up: "#10B981",
          down: "#EF4444",
          unchanged: "#999",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        type: "category", // use category instead of time
        ticks: { color: "#9CA3AF" },
        grid: { color: "#4B5563" },
      },
      y: {
        beginAtZero: false,
    min: Math.min(...data.map(d => d.l)) * .995,
    max: Math.max(...data.map(d => d.h)) * 1.005,
    ticks: { color: "#9CA3AF" },
    grid: { color: "#4B5563" },
      },
    },
  };

  return (
    <motion.div {...fadeInUp} className="bg-gray-800 p-6 rounded-lg shadow-lg my-6 h-[550px]">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{stock}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">{currentValue.toFixed(2)}</span>
            <span className={`flex items-center ${change.value >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change.value >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
              {change.value.toFixed(2)} ({change.percentage.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          {["5M", "10M", "15M", "30M", "1H"].map(r => (
            <motion.button
              key={r}
              onClick={() => setTimeRange(r)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded text-sm ${timeRange === r ? 'bg-gray-700 text-blue-500' : 'text-gray-300'}`}
            >
              <Clock size={14} className="mr-1" /> {r}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="h-[350px]">
        <Chart ref={chartRef} type="candlestick" data={chartData} options={options} />
      </div>
    </motion.div>
  );
}
