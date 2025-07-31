import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Format.css'; // Format.cssをインポート

function Home() {

  const navigate = useNavigate();

  function CheckLoginState(){
  
    // ログイン状態の判定（遅延があるため、localStorageを直接参照
    if(localStorage.getItem("isLoggedIn") !== "true") {

      navigate('/');
    }
  }

  // ページを開いたときログイン判定を行う
  useEffect(() => {

    CheckLoginState();
  }, []);

  return (

    <div>

      <h1>ホームページ</h1>
      <p>ようこそ {localStorage.getItem("userId")}さん!</p>

        <h1>STM32 開発資料（現在執筆中）</h1>

        <p>STM32を開発していく上で必要な知識をまとめました</p>

        <p><strong>はじめての方にも分かりやすくするため、多少厳密ではない部分があります</strong></p>
        
        <h2>導入編</h2>

        <p>STM32の開発環境を導入しよう</p>

        <a href= "Documents/Setup/01_Install/01_Install.html" ><h3>・導入編1 STM32をインストールしよう</h3></a>

        <a href= "Documents/Setup/02_Project/02_Project.html" ><h3>・導入編2 コードを書くための準備をしよう</h3></a>

        <h2>基礎編</h2>

        <p>基本的な機能や関数について、実際に動かしながら学んでみよう</p>

        <p>基礎編1~6を使って、基礎編7と8のプログラムを書いてみよう!</p>

        <a href= "Documents/Basic/01_LED/01_LED.html" ><h3>・基礎編1 LEDをつける</h3></a>

        <a href= "Documents/Basic/02_Serial/02_Serial.html" ><h3>・基礎編2 シリアル通信（送信）</h3></a>

        <a href= "Documents/Basic/03_DMA/03_DMA.html" ><h3>・基礎編3 シリアル通信（受信）</h3></a>

        <a href= "Documents/Basic/04_PWM/04_PWM.html" ><h3>・基礎編4 サーボモータを動かそう(PWM)</h3></a>

        <a href= "Documents/Basic/05_ADC/05_ADC.html" ><h3>・基礎編5 赤外線を検知しよう(ADC)</h3></a>

        <a href= "Documents/Basic/06_SBUS/06_SBUS.html" ><h3>・基礎編6 SBUSを受信してみよう</h3></a>

        <a href= "Documents/Basic/07_Touka/07_Touka.html" ><h3>・基礎編7 投下装置を作ってみよう</h3></a>

        <a href= "Documents/Basic/08_ToukaZidou/08_ToukaZidou.html" ><h3>・基礎編8 投下装置を自動化しよう</h3></a>

        <h2>応用編</h2>

        <p>センサーの値を読んでみよう！</p>

        <a href= "Documents/Advance/01_I2C/01_I2C.html" ><h3>・応用編1 I2C通信とは </h3></a>

        <a href= "Documents/Advance/02_Sensor/02_Sensor.html" ><h3>・応用編2 センサーの値を読んでみよう</h3></a>

        <a href= "" ><h3>・応用編3 姿勢推定入門</h3></a>

        <h2>発展編</h2>

        <p>かなり難しい内容です</p>

        <p>ここまでできれば、ある程度1人で開発ができちゃいます!</p>

        <a href= "" ><h3>・発展編1 データシートの読み方</h3></a>

        <a href= "" ><h3>・発展編2 センサーのライブラリを書いてみよう</h3></a>

        <h2>補足編</h2>

        <p>必須ではないけど、知っておくと便利な機能を学んでみよう</p>

        <a href= "Documents/Supplement/01_Tim/01_Tim.html" ><h3>・補足編1 タイマー割り込み</h3></a>

        <a href= "" ><h3>・補足編2 実行時間の測定</h3></a>

        <h2>便利なツール</h2>

        <a href= "" ><h3>・PWM計算サイト</h3></a>

        <h2>その他</h2>

        <a href= "https://nokolat.github.io/Programming_Documents/" ><h3>・航空研の電装ドキュメント</h3></a>

        <a href= "Documents/Dev/01_CPP/01_Cpp.html" ><h3>・開発テストページ</h3></a>

      
    </div>
  );
};

export default Home;
