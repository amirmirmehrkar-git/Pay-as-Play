'use client';

/**
 * LMS Progress Charts Component
 * Displays line chart (time spent), bar chart (amount spent), and pie chart (progress distribution)
 */

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeSpentDataPoint {
  date: string;
  time: number; // seconds
}

interface AmountSpentDataPoint {
  course: string;
  amount: number; // PLY
}

interface ProgressDistribution {
  completed: number;
  inProgress: number;
  notStarted: number;
}

interface LMSProgressChartsProps {
  timeSpentOverTime: TimeSpentDataPoint[];
  amountSpentPerCourse: AmountSpentDataPoint[];
  progressDistribution: ProgressDistribution;
  loading?: boolean;
}

const COLORS = ['#10b981', '#3b82f6', '#6b7280']; // green, blue, gray

export default function LMSProgressCharts({
  timeSpentOverTime,
  amountSpentPerCourse,
  progressDistribution,
  loading = false,
}: LMSProgressChartsProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const pieData = [
    { name: 'Completed', value: progressDistribution.completed },
    { name: 'In Progress', value: progressDistribution.inProgress },
    { name: 'Not Started', value: progressDistribution.notStarted },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Line Chart - Time Spent Over Time */}
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Time Spent Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSpentOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#71717a"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              tickFormatter={(value) => formatDuration(value)}
              stroke="#71717a"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              formatter={(value: number) => formatDuration(value)}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="time" stroke="#3b82f6" strokeWidth={2} name="Time Spent" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart and Pie Chart */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Bar Chart - Amount Spent Per Course */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Amount Spent Per Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amountSpentPerCourse}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="course" stroke="#71717a" style={{ fontSize: '12px' }} />
              <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(2)} PLY`}
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" name="Amount (PLY)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Progress Distribution */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Progress Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

