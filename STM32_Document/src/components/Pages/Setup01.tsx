import CompleteButton from '../CompleteButton';
import './Format.css';

function Setup01() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 導入 1</h3>
        <h1>開発に必要なソフトをインストールしよう！</h1>
        <p>STM32の開発のためには、2つのソフトが必要になるのでダウンロードしよう!</p>

        <h2>今回やること</h2>
        <p>今回は、STM32CubeIDEとTeraTermというソフトをインストールします</p>
        <div className="note">
          <h3>インストール</h3>            
          <ul>
            <li>環境構築はプログラミング序盤で一番難しいので、遠慮なく周りに聞いてね</li>
          </ul>
        </div>

        <h2>STM32CubeIDE</h2>
        <p>まずは、STM32CubeIDEからインストールしよう</p>
        <p>メールアドレスを使ってアカウント作成をする必要があるので、しっかりとメモを取っておこう</p>
        <p>ログイン周りのバグがあるので、バージョン選択からv1.16.1を選ぼう</p>
        
        <a href="https://www.st.com/ja/development-tools/stm32cubeide.html">
          <h3>・STM32CubeIDEのダウンロードページ</h3>
        </a>

        <h2>TeraTerm</h2>
        <p>次に、TeraTermをインストールしよう</p>
        <p>上から2番目のTeraTerm(v5系統)というのをインストールしてね</p>

        <a href="https://forest.watch.impress.co.jp/library/software/utf8teraterm/">
          <h3>・TeraTermのダウンロードページ</h3>
        </a>

        <h2>終わりに</h2>
        <p>ダウンロードが終わったら今回は終わりです!</p>
        <p>次回は、STM32CubeIDEの使い方を説明します</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={1} label="導入編1" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/setup/02"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Setup01;
