// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, useState } from 'react';

function TradingViewWidget({ coin }) {
  const container = useRef();

  useEffect(
    () => {
      coin=coin.toUpperCase()
      console.log("here "+coin)
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${coin}USDT",
          "interval": "D",
          "timezone": "Asia/Kolkata",
          "theme": "light",
          "style": "2",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": false,
          "calendar": false,
          "hide_top_toolbar": true,
          "save_image": false,
          "hide_volume": true,
          "calendar": false
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "500px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);