import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic03DMA() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 3</h3>
        <h1>シリアル通信でデータを受信しよう（割り込み処理）</h1>
        <p>前回と同じようにシリアル通信を受信するコードを書くことができる</p>
        <p>しかし、LEDをつけている間など他の処理をしている間に来たデータについては取りこぼしてしまう</p>
        <p>そこで今回は、割り込み処理という手法を使ってデータを取りこぼさないようにしてみよう</p>

        <h2>今回やること</h2>
        <p>前回と同じ流れなので、資料に沿って進めてね</p>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てて、割り込みの設定をする</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>TeraTermでデータを送信する</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回もUSART2を使うので、前回と同じようにPA2とPA3に割り当てをしておこう</p>

        <h2>割り込みの設定</h2>
        <p>USART2の設定からDMAを追加しよう</p>

        <p>ピンの詳細な設定は、画面左から選ぶことができる</p>

        <p>小さくて見えない時は縁にカーソルを合わせて拡大してね</p>

        <h3>設定の場所</h3>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/03_DMA/Config.png" alt="DMA Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h3>設定の内容</h3>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/03_DMA/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        
        <h2>プログラム</h2>

        <h3>割り込み受信の開始</h3>
        <pre><code className="language-cpp">HAL_UART_Receive_DMA(&huart2, receive_buffer, len);</code></pre>

        <div className="note">
            <h3>この関数の引数</h3>

            <p>前回扱った送信関数との違いは、最大時間の引数が消えているだけなので同じように使えるよ</p>

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
                        <th>&huartx</th>
                        <th>UART_HandleTypeDef*</th>
                        <th>UARTのポインタ（xはUARTの番号）</th>
                    </tr>
                    <tr>
                        <th>Data</th>
                        <th>uint8_t*</th>
                        <th>受信するデータのポインタ</th>
                    </tr>
                    <tr>
                        <th>Len</th>
                        <th>uint16_t</th>
                        <th>受信するデータ長</th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <details>
            <summary>DMAとは</summary>
            <br />
            <ul>
                <li><strong>DMA(Direct Memory Access)</strong>
                    <p>通常はCPUがデータを転送するが、DMAを使うことでCPUを使わずにデータを転送することができる</p>
                    <p>そのため、受信の処理がより高速に行えるようになる</p>

                    <p>割り込み受信の間、他の処理が止まってしまうので影響を少なくするために利用している</p>
                </li>
            </ul>
        </details>

        <h3>割り込み受信後の処理</h3>
        <pre><code className="language-cpp">void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)</code></pre>

        <div className="note">
            <h3>この関数の引数</h3>

            <p>この関数の引数はこちらから変える必要はないので毎回コピペで大丈夫</p>
            <p>どのUSARTで受信したがが、*huartに入っているのでif文を使って判定することができる</p>

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
                        <th>&huart</th>
                        <th>UART_HandleTypeDef*</th>
                        <th>UARTのポインタ（xはUARTの番号）</th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <p>この関数は、データを受信したとき（割り込み受信が完了したとき）に自動で呼び出される</p>
        <p>この関数内に受信後の処理（受信したデータを判定など）を書くことで、受信後すぐに処理ができる</p>

        <h2>サンプルコード</h2>
        <p>実際にDMAを使って受信したデータを送り返すコードを作成した</p>
        <p>TeraTermでアルファベット1文字を送信して、同じ文字が帰ってくることを確かめてみよう</p>
        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "usart.h"  

uint8_t data[1];

void init(){

    //割り込みの開始
    HAL_UART_Receive_DMA(&huart2, data, 1);
}            
void loop(){

}
//データを受信したら呼び出される
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart){

    //受信したデータを送り返す
    HAL_UART_Transmit(&huart2, data, 1, 1000);

    //割り込み受信の再開
    HAL_UART_Receive_DMA(&huart2, data, 1);

}`}</code></pre>

        <details>
            <summary>TeraTermでのデータ送信方法</summary>
            <br />
            <ul>
                <li><strong>ローカルエコーの有効化</strong></li>
                <p>設定(S)から端末(T)を開き、ローカルエコー(L)を有効化しよう</p>
                <p>これでキーボード入力でデータを送信できる</p>
            </ul>
        </details>

        <h2>終わりに</h2>
        <p>今回は、割り込み処理を使ったデータ受信について紹介しました！</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={8} label="基礎編3" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/02"><h3>・前のページ</h3></a>
        <a href="/basic/04"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic03DMA;
