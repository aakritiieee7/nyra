import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MaterialDistribution } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DoughnutChartProps {
  data: MaterialDistribution;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 4,
        cutout: '60%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter',
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const percentage = context.parsed;
            return `${context.label}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        color: '#ffffff',
        font: {
          weight: 'bold' as const,
          size: 12,
        },
        formatter: (value: number) => `${value}%`,
        display: (context: any) => context.parsed > 5, // Only show labels for segments > 5%
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <div className="relative h-80 w-full">
      <Doughnut ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;