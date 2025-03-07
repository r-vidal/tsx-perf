import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = () => {
  // Define months for X axis
  const months = [
    'Jan-23', 'Feb-23', 'Mar-23', 'Apr-23', 'May-23', 'Jun-23', 
    'Jul-23', 'Aug-23', 'Sep-23', 'Oct-23', 'Nov-23', 'Dec-23',
    'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 
    'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
    'Jan-25', 'Feb-25'
  ];

  // Strategies data
  const strategiesData = {
    "Bengal Fox": [74.1, 75.09, 73.64, 67.28, 66.29, 67.64, 65.52, 69.71, 67.14, 81.5, 88.41, 96.76, 90.78, 124.23, 131.77, 122.19, 123.29, 124.81, 121.23, 111.19, 113.73, 123.37, 157.75, 156.3, 152.54, 151.54],
    "Isatis Fox": [100, 102.34, 87.61, 90.44, 87.91, 84.65, 81.75, 88.2, 87.29, 87.41, 96.14, 104.04, 92.99, 125.95, 123.04, 119.79, 123.26, 114.09, 112.68, 112.68, 110.28, 93.91, 119.94, 102.02, 104.31, 117.71],
    "Fennec Fox": [81.78, 79.09, 72.8, 71.19, 66.76, 82.61, 80.57, 81.9, 82.5, 85.45, 86.8, 96.27, 90.86, 113.63, 171.64, 141.83, 133.47, 134.29, 126.02, 117.83, 114.28, 101.24, 110.48, 97.57, 101.06, 101.71],
    "Gray Fox": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 96.1, 124.08, 134.63, 120.01, 133.97, 135.08, 154.83, 142.44, 157.48, 176.67, 226.26, 218.27, 226.5, 184.17],
    "Red Fox": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 102.45, 100.97, 89, 105.84, 94.35, 117.6, 93.92, 93.92, 94.48, 122.68, 112.18, 109.51, 95.2],
    "Goupil Fox": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 133.28, 130.33, 135.17, 123.13, 147.85, 139.2, 155.75, 161.59, 180.01, 191.93, 185.54, 168.17],
    "Cross Fox": [125.81, 126.64, 151.42, 155.59, 149.08, 165.29, 158, 148.39, 153.71, 186.58, 200.07, 211.98, 214.71, 279.77, 303.3, 270.36, 286.37, 270.5, 343.76, 332.82, 367.97, 420.59, 539.78, 522.51, 549.94, 522.06],
    "Tibetan Fox": [122.06, 119.59, 134.01, 139.62, 139.56, 136.86, 134.2, 124.57, 126.75, 136.06, 147.29, 154.62, 157.88, 206.78, 207.61, 182.99, 210.89, 184.85, 235.01, 227.16, 241.48, 263.35, 343.33, 313.33, 280.24, 255.13],
    "Bat-eared Fox": [118.65, 109.56, 118.13, 120.68, 117.02, 89.36, 87.55, 80.11, 80.54, 85.06, 81.62, 101.73, 100.08, 125.45, 162.54, 158.94, 159.29, 136.15, 181.2, 183.43, 205.24, 216.73, 244.11, 260.02, 247.54, 250.16],
    "Cape Fox": [125.81, 127.5, 148.63, 148.63, 141.13, 156.17, 149.94, 140.17, 144.59, 175.52, 190.39, 208.38, 209.42, 302.22, 349.03, 297.69, 332.79, 307.36, 317.57, 290.48, 313.31, 348.78, 445.98, 451.65, 499.11, 414.86],
    "Island Fox": [125.81, 100.66, 120.36, 123.67, 118.5, 131.38, 125.59, 117.95, 122.17, 148.31, 159.03, 168.49, 170.66, 222.38, 241.08, 214.9, 227.62, 195.91, 203.18, 196.72, 217.49, 248.59, 319.05, 308.84, 325.05, 308.57],
    "Cozumel Fox": [122.06, 97.98, 109.79, 114.39, 114.34, 112.12, 108.71, 100.91, 102.67, 110.22, 119.31, 125.26, 127.9, 167.51, 168.18, 148.23, 170.84, 151.53, 141.24, 136.53, 145.13, 158.28, 206.35, 188.31, 168.43, 153.33],
    "Silver Fox": [118.65, 92.34, 99.56, 101.71, 98.63, 75.31, 73.79, 67.52, 67.88, 71.69, 68.79, 85.74, 84.35, 105.73, 136.99, 133.96, 134.26, 109.86, 108.06, 109.39, 122.4, 129.25, 145.57, 155.07, 147.62, 149.19]
  };

  // Prepare data for chart
  const chartData = months.map((month, index) => {
    const dataPoint = { month };
    Object.keys(strategiesData).forEach(strategy => {
      if (index < strategiesData[strategy].length) {
        dataPoint[strategy] = strategiesData[strategy][index];
      }
    });
    return dataPoint;
  });

  // Colors for the lines
  const colors = [
    '#4285F4', '#EA4335', '#FBBC05', '#34A853', // Google colors
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', // Chart.js colors
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', // More colors
    '#C71585', '#7B68EE', '#3CB371', '#FF7F50', '#6495ED' // Additional colors
  ];

  // State for filtering strategies
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTopPerformers, setShowTopPerformers] = useState(false);

  // Strategy groups
  const categories = {
    'all': 'All Strategies',
    'prophet': 'Prophet',
    'arima': 'ARIMA/SARIMAX',
    'hourly': 'Hourly',
    'daily': 'Daily',
    'weekly': 'Weekly'
  };

  // Function to filter strategies
  const getFilteredStrategies = () => {
    let filtered = Object.keys(strategiesData);
    
    // Filter by category
    if (selectedCategory === 'prophet') {
      filtered = filtered.filter(name => name.includes("Fox") && !name.includes("ARIMA"));
    } else if (selectedCategory === 'arima') {
      filtered = filtered.filter(name => name.includes("Fox") && name.includes("Fox"));
    } else if (selectedCategory === 'hourly') {
      filtered = filtered.filter(name => name.includes("Hourly"));
    } else if (selectedCategory === 'daily') {
      filtered = filtered.filter(name => name.includes("Daily"));
    } else if (selectedCategory === 'weekly') {
      filtered = filtered.filter(name => name.includes("Weekly"));
    }
    
    // Limit to top performers
    if (showTopPerformers) {
      // Calculate last value for each strategy
      const performances = filtered.map(strategy => ({
        name: strategy,
        lastValue: strategiesData[strategy][strategiesData[strategy].length - 1]
      }));
      
      // Sort by performance and take top 5
      performances.sort((a, b) => b.lastValue - a.lastValue);
      filtered = performances.slice(0, 5).map(item => item.name);
    }
    
    return filtered;
  };

  // Filtered strategies
  const filteredStrategies = getFilteredStrategies();

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Strategy Performance (2023-2025)</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <div>
          <label className="mr-2 font-medium">Category:</label>
          <select 
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="topPerformers"
            checked={showTopPerformers}
            onChange={() => setShowTopPerformers(!showTopPerformers)}
            className="mr-2"
          />
          <label htmlFor="topPerformers">Show only top 5 strategies</label>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10 }}
              angle={-45}
              height={60}
              interval={1}
              textAnchor="end"
            />
            <YAxis
              domain={['auto', 'auto']}
              label={{ value: 'NAV', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={(value) => [`${value.toFixed(2)}`, 'NAV']} />
            <Legend />
            {filteredStrategies.map((strategy, index) => (
              <Line
                key={strategy}
                type="monotone"
                dataKey={strategy}
                name={strategy}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Performance table */}
      {filteredStrategies.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Final Performance (February 2025)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="p-2 border">Strategy</th>
                  <th className="p-2 border">Initial Value</th>
                  <th className="p-2 border">Final Value</th>
                  <th className="p-2 border">Total Performance</th>
                </tr>
              </thead>
              <tbody>
                {filteredStrategies.map((strategy) => {
                  const initialValue = 100;
                  const finalValue = strategiesData[strategy][strategiesData[strategy].length - 1];
                  const performance = ((finalValue - initialValue) / initialValue) * 100;
                  
                  return (
                    <tr key={strategy}>
                      <td className="p-2 border">{strategy}</td>
                      <td className="p-2 border text-right">{initialValue}</td>
                      <td className="p-2 border text-right">{finalValue.toFixed(2)}</td>
                      <td className="p-2 border text-right" style={{ 
                        color: performance >= 0 ? 'green' : 'red',
                        fontWeight: 'bold'
                      }}>
                        {performance.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;