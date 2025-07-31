import CompleteButton from '../CompleteButton';
import './Format.css';

function Basic01() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 1</h3>
        <h1>LEDをつけてみよう!</h1>
        <p>今回はSTM32でLEDをつけてみよう</p>
        <p>プログラムを書き込んで、実際に動かすところまでやってみます</p>

        <h2>今回やること</h2>
        <div className="note">
          <h3>作業の流れ</h3>
          <ul>
            <li>ピンを割り当てる</li>
            <li>wrapper.cppにコードを書き込む</li>
            <li>STM32にプログラムを書き込み実行する</li>
            <li>LEDの点滅を眺める</li>
          </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回はPA5ピンを使います</p>
        <p>(プロジェクト名).iocからPA5を選択し、GPIO_Outputを割り当てよう</p>

        <h2>プログラム</h2>
        <p>今回はLEDの点灯と待機の2つの関数を使用します</p>

        <h3>LEDの点灯</h3>
        <p>指定したピンをHIGHまたはLOWにするための関数</p>
        <pre><code className="language-cpp">HAL_GPIO_WritePin(GPIOx, GPIO_PIN_y, PinState);</code></pre>

        <div className="note">
          <h3>この関数の引数</h3>
          <table>
            <thead>
              <tr>
                <th>引数名</th>
                <th>変数型</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>GPIOx</th>
                <th>GPIO_TypeDef*</th>
                <th>GPIOポートのポインタ（xはポート名）</th>
              </tr>
              <tr>
                <th>GPIO_PIN_y</th>
                <th>uint16_t</th>
                <th>yはピン番号</th>
              </tr>
              <tr>
                <th>PinState</th>
                <th>GPIO_PinState</th>
                <th>GPIO_PIN_SET or GPIO_PIN_RESET</th>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>待機</h3>
        <p>指定した時間だけプログラムを停止させるための関数</p>
        <pre><code className="language-cpp">HAL_Delay(Time);</code></pre>

        <div className="note">
          <h3>この関数の引数</h3>
          <table>
            <thead>
              <tr>
                <th>引数名</th>
                <th>変数型</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Time</th>
                <th>uint32_t</th>
                <th>待機時間（単位はミリ秒）</th>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>サンプルコード</h2>
        <p>実際にLEDを点灯させるコードを載せた</p>
        <p>実際に実行してみたり、Delayの時間を変えたりしてみよう</p>

        <pre><code className="language-cpp">{`#include "wrapper.hpp"

void init(){
    // 初期化処理（特になし）
}

void loop(){
    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5, GPIO_PIN_SET);
    HAL_Delay(500);      
}`}</code></pre>

        <h2>終わりに</h2>
        <p>今回はLEDをつけて、開発の流れを体験してもらいました!</p>
        <p>次回は、2本の通信線を使ったシリアル通信について説明します!</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={6} label="基礎編1" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/setup/02"><h3>・前のページ</h3></a>
        <a href="/basic/02"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic01;
