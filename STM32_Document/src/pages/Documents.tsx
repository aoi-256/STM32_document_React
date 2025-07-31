import React from 'react';

function Documents() {
  return (
    <div>
      <h1>ドキュメント</h1>
      <div>
        <h2>STM32 ドキュメントリンク</h2>
        <ul>
          <li>
            <a href="/docs/stm32f4.html" target="_blank" rel="noopener noreferrer">
              STM32F4 リファレンス
            </a>
          </li>
          <li>
            <a href="/docs/gpio.html" target="_blank" rel="noopener noreferrer">
              GPIO設定ガイド
            </a>
          </li>
          <li>
            <a href="/docs/uart.html" target="_blank" rel="noopener noreferrer">
              UART通信設定
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Documents;
