import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  // Fetch available currencies
  useEffect(() => {
    axios
      .get("https://api.frankfurter.app/currencies")
      .then((res) => {
        setCurrencies(Object.keys(res.data));
      })
      .catch((err) => console.error(err));
  }, []);

  // Convert currency
  const convertCurrency = () => {
    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    axios
      .get("https://api.frankfurter.app/latest", {
        params: { amount, from: fromCurrency, to: toCurrency },
      })
      .then((res) => {
        setResult(res.data.rates[toCurrency]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          💰 Currency Converter
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div className="mx-4 text-2xl text-blue-500">➡️</div>

          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convertCurrency}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Convert
        </button>

        {result && (
          <div className="mt-6 text-center bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              {amount} {fromCurrency} ={" "}
              <span className="text-blue-600">
                {result.toFixed(2)} {toCurrency}
              </span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
