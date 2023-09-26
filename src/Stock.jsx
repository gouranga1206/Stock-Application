import React, { useState } from "react";
import StockData from "../StockData";
import "./stock.css";

function Stock() {
  const [entry, setEntry] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const handleSearch = () => {
    // Check if the entry is not empty before adding to the list
    if (entry.trim() !== "") {
      const uppercaseEntry = entry.toUpperCase(); // Convert to uppercase
      setSearchedData([...searchedData, uppercaseEntry]);
      setEntry(""); // Clear the input field after adding
    }
  };

  return (
    <>
      <div className="input_data">
        <input
          type="text"
          name="data"
          id="data"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="stock">
        <div className="stock_header">Real Time Stock Data</div>
        <div className="data">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Open</th>
                <th>Date</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
                <th>Time</th>
                <th>Chart</th>
              </tr>
            </thead>
            <tbody>
              {searchedData.map((ticker, index) => (
                <StockData key={index} ticker={ticker} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Stock;
