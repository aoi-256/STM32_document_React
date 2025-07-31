import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Format.css'; // Format.cssをインポート

function Home() {

  const navigate = useNavigate();

  // 現在の進捗用の変数（初期値を空オブジェクトに設定）
  const [progress, setProgress] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  // GASのURL
  const gasUrl = "https://script.google.com/macros/s/AKfycbxhwRIE8b0BgwJiHynETd-1om3Wq_4wpw7d8laSaYG0E_wzwUr16yece2hOtuiiRdwM/exec";

  // GASから進捗データを取得する関数
  async function loadUserData() {
    try {
      const progressUrl = `${gasUrl}?action=get_progress&id=${localStorage.getItem("userId")}&password=${localStorage.getItem("userPassword")}`;
      const response = await fetch(progressUrl);
      const progressResult = await response.json();
      
      // progressが存在する場合のみ設定
      if (progressResult && progressResult.progress) {
        setProgress(progressResult.progress);
      }
    } catch (error) {
      console.error("進捗データの取得に失敗しました:", error);
      // エラーが発生した場合は空オブジェクトを設定
      setProgress({});
    } finally {
      setIsLoading(false);
    }
  }

  // チェックボックス用の変数
  type CheckableLinkProps = {
    href: string;
    children: React.ReactNode;
    itemId: string;
  };

  // チェックボックスのコンポーネント
  function CheckableLink({ href, children, itemId }: CheckableLinkProps) {
    return (
      <div>
        <input
          type="checkbox"
          checked={progress[itemId] || false} // progressがundefinedでもfalseになる
          readOnly
        />
        <button 
          onClick={() => navigate(href)}
          style={{
            backgroundColor: progress[itemId] ? '#28a745' : '#007bff', // 完了時は緑、未完了時は青
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '8px'
          }}
        >
          {children}
        </button>
      </div>
    );
  }

  // ページを開いたときログイン判定と進捗取得を行う
  useEffect(() => {
    // ログイン状態の判定
    if(localStorage.getItem("isLoggedIn") !== "true") {
      navigate('/');
      return;
    }
    
    loadUserData(); 
  }, [navigate]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h2>読み込み中...</h2>
      </div>
    );
  }

  return (

    <div>

      <h1>ホームページ</h1>
      <p>ようこそ {localStorage.getItem("userId")}さん!</p>

        <h1>STM32 開発資料（現在執筆中）</h1>

        <p>STM32を開発していく上で必要な知識をまとめました</p>

        <p><strong>はじめての方にも分かりやすくするため、多少厳密ではない部分があります</strong></p>
        
        <h2>
          導入編
        </h2>
        <p>STM32の開発環境を導入しよう</p>

        <CheckableLink href="/setup/01" itemId="setup_01">
          導入編1 STM32をインストールしよう
        </CheckableLink>

        <CheckableLink href="/setup/02" itemId="setup_02">
          導入編2 コードを書くための準備をしよう
        </CheckableLink>

        <h2>
          基礎編
        </h2>

        <h3>基本的な機能を実際に動かして体験してみよう</h3>
        <p>基礎編1~6を使って、基礎編7と8のプログラムを書いてみよう!</p>
        <p>サンプルコードを参考にどのようにしたら動くのかを学んでみよう</p>

        <CheckableLink href="/basic/01" itemId="basic_01">
          基礎編1 LEDをつける
        </CheckableLink>

        <CheckableLink href="/basic/02" itemId="basic_02">
          基礎編2 シリアル通信（送信）
        </CheckableLink>

        <CheckableLink href="/basic/03" itemId="basic_03">
          基礎編3 シリアル通信（受信）
        </CheckableLink>

        <CheckableLink href="/basic/04" itemId="basic_04">
          基礎編4 サーボモータを動かそう(PWM)
        </CheckableLink>

        <CheckableLink href="/basic/05" itemId="basic_05">
          基礎編5 赤外線を検知しよう(ADC)
        </CheckableLink>

        <CheckableLink href="/basic/06" itemId="basic_06">
          基礎編6 SBUSを受信してみよう
        </CheckableLink>

        <CheckableLink href="/basic/07" itemId="basic_07">
          基礎編7 投下装置を作ってみよう
        </CheckableLink>

        <CheckableLink href="/basic/08" itemId="basic_08">
          基礎編8 投下装置を自動化しよう
        </CheckableLink>

        <h2>
          応用編
        </h2>
        <h3>2つの通信形式でセンサーからデータを読み取ってみよう</h3>
        <p>自分でコードを作成する部分が増えるので、少し難しくなってきます</p>

        <CheckableLink href="/advance/01" itemId="advance_01">
          応用編1 センサーと通信してみよう(I2C通信)
        </CheckableLink>

        <CheckableLink href="/advance/02" itemId="advance_02">
          応用編2 センサーの値を読んでみよう(I2C通信)
        </CheckableLink>

        <CheckableLink href="/advance/03" itemId="advance_03">
          応用編3 センサーと通信してみよう(SPI通信)
        </CheckableLink>

        <CheckableLink href="/advance/04" itemId="advance_04">
          応用編4 センサーの値を読んでみよう(SPI通信)
        </CheckableLink>

        <h2>
          発展編
        </h2>
        <h3>センサーのライブラリを書いてみよう</h3>
        <p>内容が複雑かつ言語化が難しいので対面でやりたいかも</p>
        <p>ここまで出来たら、数学の知識と合わせてマルコプのFCが作れるかも?</p>
        <p>サンプルコードのデバックが終わってないので、バグを倒しながら進んでください</p>

        <CheckableLink href="/dev/01" itemId="dev_01">
          発展編1 構造体を使ってみよう
        </CheckableLink>

        <CheckableLink href="/dev/02" itemId="dev_02">
          発展編2 クラスについて知ってみよう
        </CheckableLink>

        <CheckableLink href="/dev/03" itemId="dev_03">
          発展編3 クラスを実際に書いてみよう
        </CheckableLink>
        
        <CheckableLink href="/dev/04" itemId="dev_04">
          発展編4 クラスを見やすくしてみよう
        </CheckableLink>

        <h2>
          補足編
        </h2>
        <p>必須ではないけど、知っておくと便利な機能を学んでみよう</p>

        <CheckableLink href="/supplement/01" itemId="supplement_01">
          補足編1 タイマー割り込み
        </CheckableLink>

        <CheckableLink href="/supplement/02" itemId="supplement_02">
          補足編2 実行時間測定（タイマー割り込み）
        </CheckableLink>

        <CheckableLink href="/supplement/03" itemId="supplement_03">
          補足編3 printfを使ってみよう
        </CheckableLink>

      
    </div>
  );
};

export default Home;
