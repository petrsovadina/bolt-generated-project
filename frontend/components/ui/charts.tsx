"use client"

import { Line, Bar, Pie, Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { HeatMapGrid } from 'react-grid-heatmap'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const defaultOptions: ChartOptions<'line' | 'bar' | 'pie' | 'scatter'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart',
    },
  },
}

export function LineChart({ data, options = {} }) {
  return <Line options={{ ...defaultOptions, ...options }} data={data} />
}

export function BarChart({ data, options = {} }) {
  return <Bar options={{ ...defaultOptions, ...options }} data={data} />
}

export function PieChart({ data, options = {} }) {
  return <Pie options={{ ...defaultOptions, ...options }} data={data} />
}

export function ScatterChart({ data, options = {} }) {
  return <Scatter options={{ ...defaultOptions, ...options }} data={data} />
}

export function HeatMap({ data, xLabels, yLabels, options = {} }) {
  return (
    <HeatMapGrid
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
      cellRender={(x, y, value) => (
        <div title={`${value.toFixed(2)}`}>{value.toFixed(1)}</div>
      )}
      {...options}
    />
  )
}
