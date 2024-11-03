import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Change.css'

export const Change = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://openexchangerates.org/api/latest.json?app_id=41e406887de34f86bba0b558aa310b1f');
        const exchangeRatesObject = {
          USD: response.data.rates.USD,
          EUR: response.data.rates.EUR,
          GBP: response.data.rates.GBP,
          JPY: response.data.rates.JPY,
          CNY: response.data.rates.CNY,
          
        };
        setExchangeRates(exchangeRatesObject);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div className="sidebar">
      <h2>Tipo de Cambio a Quetzales (GTQ)</h2>
      <ul>
        {Object.keys(exchangeRates).map((currency, index) => (
          <li key={index}>
            <span>{currency}</span>
            <span>{exchangeRates[currency]}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}