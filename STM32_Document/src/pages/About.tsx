import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <h1>アバウト</h1>
      <p>このアプリケーションはSTM32の技術文書を管理するためのReactアプリケーションです。</p>
      <ul>
        <li>技術文書の一覧表示</li>
        <li>検索機能</li>
        <li>カテゴリ別分類</li>
      </ul>
    </div>
  );
};

export default About;
