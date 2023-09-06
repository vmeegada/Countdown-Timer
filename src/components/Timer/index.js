import React, { useState, useEffect } from 'react';
import './App.css';

function Timer() {
  const [countdown, setCountdown] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [timerId, setTimerId] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      const intValue = parseInt(inputValue);
      const roundedValue = Math.floor(intValue);

      if (!isNaN(roundedValue)) {
        if (timerId) {
          clearInterval(timerId);
        }

        setCountdown(roundedValue);
        startCountdown(roundedValue);
      } else {
        setCountdown(0);
      }
    }
  };

  const startCountdown = (initialValue) => {
    const id = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        clearInterval(id);
      }
    }, 1000);

    setTimerId(id);
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <input
        type="number"
        placeholder="Enter time"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
      />
      <div id="current-time">{countdown}</div>
    </div>
  );
}

export default Timer;
