

import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import axios from "axios";

export default function StockData({
  ticker,
  open,
  date,
  high,
  low,
  close,
  volume,
  time,
}) {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [data, setData] = useState({
    open: 0,
    date: "",
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
    time: "",
  });

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const api = 'YTBB8TX9CAMTR76V'; // Replace with your Alpha Vantage API key
        const symbol = ticker; // Use the passed ticker symbol
        const interval = '5min';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${api}`;

        const response = await axios.get(url, {
          headers: { 'User-Agent': 'request' },
        });

        // Extract relevant data from the response
        const timeSeriesData = response.data['Time Series (5min)'];

        // Extract x (time) and y (open price) values for plotting
        const xValues = [];
        const yValues = [];

        for (const key in timeSeriesData) {
          xValues.push(key);
          yValues.push(parseFloat(timeSeriesData[key]['1. open']));
        }

        // Set the state with the fetched data for plotting
        setStockChartXValues(xValues);
        setStockChartYValues(yValues);

        // Extract latest data
        const latestTime = xValues[0];
        const latestData = timeSeriesData[latestTime];

        setData({
          open: parseFloat(latestData['1. open']),
          date: latestTime.split(" ")[0],
          high: parseFloat(latestData['2. high']),
          low: parseFloat(latestData['3. low']),
          close: parseFloat(latestData['4. close']),
          volume: parseInt(latestData['5. volume']),
          time: latestTime.split(" ")[1],
        });
      } catch (error) {
        // Handle any errors here
        console.error('Error:', error);
      }
    };

    fetchLatestData();
  }, [ticker]);

  return (
    <tr>
      <td>{ticker}</td>
      <td>{data.open}</td>
      <td>{data.date}</td>
      <td>{data.high}</td>
      <td>{data.low}</td>
      <td>{data.close}</td>
      <td>{data.volume}</td>
      <td>{data.time}</td>
      <td>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{ width: 720, height: 440, title: 'A Fancy Plot' }}
        />
      </td>
    </tr>
  );
}
