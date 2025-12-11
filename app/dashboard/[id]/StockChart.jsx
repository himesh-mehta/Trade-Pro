// StockChart.jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Eye,
  Clock,
} from "lucide-react";

const Chart = dynamic(() => import("react-google-charts").then((m) => m.Chart), {
  ssr: false,
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

// deterministic header used on server (prevents hydrate mismatch)
const HEADER = [["Time", "Low", "Open", "Close", "High"]];

const generateRandomData = (currentValue, points) => {
  // returns [header, ...rows], rows use Date objects for x axis
  const rows = [["Time", "Low", "Open", "Close", "High"]];
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(Date.now() - i * 5000); // Date
    const open = currentValue + Math.random() * 10 - 5;
    const close = open + Math.random() * 10 - 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;
    rows.push([time, low, open, close, high]);
  }
  return rows;
};

export default function StockChart({ stock = "UNKNOWN" }) {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("5M");
  const [data, setData] = useState(HEADER); // deterministic initially
  const [currentValue, setCurrentValue] = useState(null);
  const [change, setChange] = useState({ value: 0, percentage: 0 });
  const intervalRef = useRef(null);

  const getDataPoints = (range) => {
    switch (range) {
      case "5M":
        return 5;
      case "10M":
        return 10;
      case "15M":
        return 15;
      case "30M":
        return 30;
      case "1H":
        return 60;
      default:
        return 5;
    }
  };

  const options = useMemo(
    () => ({
      backgroundColor: "transparent",
      chartArea: { width: "90%", height: "80%" },
      hAxis: {
        textStyle: { color: "#9CA3AF" },
        baselineColor: "#4B5563",
        gridlines: { color: "transparent" },
        format: "HH:mm",
      },
      vAxis: {
        textStyle: { color: "#9CA3AF" },
        baselineColor: "#4B5563",
        gridlines: { color: "#4B5563" },
      },
      legend: { position: "none" },
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#EF4444" },
        risingColor: { strokeWidth: 0, fill: "#10B981" },
      },
      animation: { startup: true, duration: 800, easing: "out" },
    }),
    []
  );

  // On first client mount: generate initial data and start interval
  useEffect(() => {
    setMounted(true);
    const seed = 425371;
    const points = getDataPoints(timeRange);
    const initialRows = generateRandomData(seed, points);
    setData(initialRows);
    setCurrentValue(initialRows[initialRows.length - 1][3]);

    const initBase = initialRows?.[1]?.[2] ?? seed;
    const initChange = initialRows[initialRows.length - 1][3] - initBase;
    setChange({ value: initChange, percentage: initBase ? (initChange / initBase) * 100 : 0 });

    intervalRef.current = setInterval(() => {
      setData((prev) => {
        const prevData = Array.isArray(prev) && prev.length > 0 ? prev : initialRows;
        const lastClose = prevData.length > 1 ? prevData[prevData.length - 1][3] : seed;
        const newRows = generateRandomData(lastClose, points).slice(1);
        const next = [...prevData, ...newRows];

        const nextCurrent = next[next.length - 1][3] ?? lastClose;
        setCurrentValue(nextCurrent);

        const base = next?.[1]?.[2] ?? nextCurrent;
        const changeValue = nextCurrent - base;
        setChange({ value: changeValue, percentage: base ? (changeValue / base) * 100 : 0 });

        return next;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run just once on client

  // When timeRange changes: reset data chunk and restart interval
  useEffect(() => {
    if (!mounted) return;
    const points = getDataPoints(timeRange);
    const seed = currentValue ?? 425371;
    const next = generateRandomData(seed, points);
    setData(next);
    setCurrentValue(next[next.length - 1][3]);
    const base = next?.[1]?.[2] ?? next[next.length - 1][3];
    const changeValue = next[next.length - 1][3] - base;
    setChange({ value: changeValue, percentage: base ? (changeValue / base) * 100 : 0 });

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setData((prev) => {
        const prevData = Array.isArray(prev) && prev.length > 0 ? prev : next;
        const lastClose = prevData.length > 1 ? prevData[prevData.length - 1][3] : seed;
        const newRows = generateRandomData(lastClose, points).slice(1);
        const nextData = [...prevData, ...newRows];
        const nextCurrent = nextData[nextData.length - 1][3];
        setCurrentValue(nextCurrent);
        const baseVal = nextData?.[1]?.[2] ?? nextCurrent;
        const changeVal = nextCurrent - baseVal;
        setChange({ value: changeVal, percentage: baseVal ? (changeVal / baseVal) * 100 : 0 });
        return nextData;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeRange, mounted]); // eslint-disable-line

  return (
    <motion.div {...fadeInUp} className="bg-gray-800 p-6 rounded-lg shadow-lg my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{stock}</h2>

          <div className="flex items-center space-x-2">
            {!mounted ? (
              // deterministic placeholder to avoid hydration mismatch
              <>
                <span className="text-3xl font-bold text-white">—</span>
                <span className="text-gray-400">Loading…</span>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-white">{Number(currentValue ?? 0).toFixed(2)}</span>
                <motion.span
                  className={`flex items-center ${change.value >= 0 ? "text-green-500" : "text-red-500"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={change.value}
                >
                  {change.value >= 0 ? <ArrowUpRight size={18} className="mr-1" /> : <ArrowDownRight size={18} className="mr-1" />}
                  {change.value > 0 ? "+" : ""}
                  {Number(change.value).toFixed(2)} ({Number(change.percentage).toFixed(2)}%)
                </motion.span>
              </>
            )}
          </div>
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <PlusCircle className="inline-block mr-2" size={16} /> Create Alert
          </motion.button>
          <motion.button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Eye className="inline-block mr-2" size={16} /> Watchlist
          </motion.button>
        </div>
      </div>

      {/* Chart area */}
      {!mounted ? (
        <div className="h-[400px] flex items-center justify-center text-gray-400">Loading chart…</div>
      ) : Array.isArray(data) && data.length > 1 ? (
        <Chart key={data.length} chartType="CandlestickChart" width="100%" height="400px" data={data} options={options} />
      ) : (
        <div className="h-[400px] flex items-center justify-center text-gray-400">No data</div>
      )}

      <div className="flex justify-between mt-4 overflow-x-auto">
        {["5M", "10M", "15M", "30M", "1H"].map((range) => (
          <motion.button
            key={range}
            className={`text-sm ${timeRange === range ? "text-blue-500" : "text-gray-300"} hover:text-blue-500 transition-colors flex items-center`}
            onClick={() => setTimeRange(range)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Clock size={14} className="mr-1" />
            {range}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
