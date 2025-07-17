import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import LineChart from '../Charts/LineChart';
import { ScanHistory } from '../../types';
import { getScoreColor } from '../../utils/scoreColor';

const InsightsPage: React.FC = () => {
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const stored = localStorage.getItem("scanHistory");
  if (stored) {
    setScanHistory(JSON.parse(stored));
  }
  setLoading(false);
}, []);


  // Convert letter scores to numeric values for chart
  const scoreToNumber = (score: string): number => {
    const scoreMap = { 'A': 90, 'B': 75, 'C': 60, 'D': 45, 'F': 25 };
    return scoreMap[score as keyof typeof scoreMap] || 0;
  };

  const chartData = {
    labels: scanHistory.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Eco Score',
        data: scanHistory.map(item => scoreToNumber(item.score)),
        borderColor: '#00EB88',
        backgroundColor: 'rgba(0, 235, 136, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const stats = [
    {
      label: 'Total Scans',
      value: scanHistory.length,
      icon: BarChart3,
      color: 'text-blue-600',
    },
    {
      label: 'Average Score',
      value: scanHistory.length > 0 
        ? (scanHistory.reduce((acc, item) => acc + scoreToNumber(item.score), 0) / scanHistory.length).toFixed(0) + '%'
        : '0%',
      icon: TrendingUp,
      color: 'text-[#00EB88]',
    },
    {
      label: 'This Month',
      value: scanHistory.filter(item => {
        const itemDate = new Date(item.date);
        const now = new Date();
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      }).length,
      icon: Calendar,
      color: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00EB88]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Insights
          </h1>
          <p className="text-gray-600 text-lg">
            Track your environmental impact and sustainability progress over time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Score Trends</h3>
            {scanHistory.length > 0 ? (
              <LineChart data={chartData} title="Environmental Score Over Time" />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No scan data available
              </div>
            )}
          </motion.div>

          {/* Scan History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Scans</h3>
            {scanHistory.length > 0 ? (
              <div className="space-y-4">
                {scanHistory.slice(0, 8).map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: getScoreColor(scan.score) }}
                      >
                        {scan.score}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{scan.material}</p>
                        <p className="text-sm text-gray-500">{scan.confidence}% confidence</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(scan.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No scan history available
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;