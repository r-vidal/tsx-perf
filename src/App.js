import React from 'react';
import './App.css';
import PerformanceChart from './components/PerformanceChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Strategy Performance Dashboard</h1>
      </header>
      <main>
        <PerformanceChart />
      </main>
    </div>
  );
}

export default App;