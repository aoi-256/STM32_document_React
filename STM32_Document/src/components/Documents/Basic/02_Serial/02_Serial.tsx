import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic02Serial() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 2</h3>
        <h1>シリアル通信でデータを送ってみよう</h1>
        <p>STMからPCにデータを送信する方法を学んでみよう</p>
        <p>今回は1本の線のみを使って、0と1のデータを順番に送るシリアル通信を紹介する</p>

        <h2>今回やること</h2>
        <p>前回と同じ流れなので、資料に沿って進めてね</p>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てる</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>TeraTermでデータを受信する</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回は、USARTという機能を使って通信を行う</p>
        <p>画像のように<strong>PA2とPA3にUSART_RX（受信）とUSART_TX（送信）</strong>を割り当ててみよう</p>
        <p>(すでに割り当てられている場合は確認して次に進もう)</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/02_Serial/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        
        <h2>プログラム</h2>

        <h3>データを送信する関数</h3>
        <p>ここでは指定したデータを送信する関数を紹介する</p>
    
        <h3>関数</h3>
        <pre><code className="language-cpp">HAL_UART_Transmit(&huartx, Data, Len, Time);</code></pre>
        <div className="note">
            <h3>この関数の引数</h3>

            <p>1つ目の<strong>UART_HandleTypeDef*</strong>はHALライブラリで定義されているので</p>

            <p>難しいことを考えないで使ってね</p>

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
                        <th>送信するデータのポインタ</th>
                    </tr>
                    <tr>
                        <th>Len</th>
                        <th>uint16_t</th>
                        <th>送信するデータ長</th>
                    </tr>
                    <tr>
                        <th>Time</th>
                        <th>uint32_t</th>
                        <th>最大実行時間（超えたら処理を諦める）</th>
                    </tr>
                </tbody>
            </table>
        </div>   
        <details>
            <summary>受信のお話(次回の導入?)</summary>
            <br />
            <ul>
                <li><strong> データを受信する関数</strong>
                    <p></p>
                    <pre><code className="language-cpp">HAL_UART_Receive(&huartx, Data, Len, Time);</code></pre>
                    <p>受信したデータを入れる変数をdataに入れる 他の引数は送信と同じなので覚えておこう！</p>
                    <p>この関数が実行されている時に来たデータしか受信できないので、プログラムによっては取りこぼしてしまうことがある</p>
                    <p>受信のお話は次の資料で詳しく解説します!</p>
                </li>
            </ul>
        </details>

        <h2>サンプルコード</h2>
        <p>起動時に1度だけ"Hello World"と送信し、その後数字をカウントアップするコードを載せた</p>
        
        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "usart.h"
#include "string"

uint16_t count = 0;

void init(){ 

    uint8_t str[] = "Hello World\\n";
    HAL_UART_Transmit(&huart2, str,12,100);//strの中身を送信
}
void loop(){

    //文字と数字を組み合わせたものを文字列に変換
    std::string str = "count:" + std::to_string(count) + "\\n";
    HAL_UART_Transmit(&huart2, (uint8_t *)str.c_str(),str.length(),100);

    //カウントアップ
    count ++;
    HAL_Delay(500);
}`}</code></pre>

        <details>
            <summary>細かいお話</summary>
                <br />
                <ul>
                    <li><strong> 文章を送信する仕組みについて </strong>
                    <p>ここでは、文章を送信する仕組みとコードの詳しい説明をする</p>
                    <p>文章の送信の際には、<strong>文字を数字に変換してから送信している</strong></p>
                    <p>ここでは、数字とアルファベットと記号に0~127の数字を割り振ったASCIIコードと呼ばれるものを利用している</p>
                    <p>0~127の数字は2進数7桁で表現できるため、uint8_t（符号なし整数8桁）の配列に数字の並びとして格納している</p>
                <pre><code className="language-cpp">{`uint8_t str[] = "Hello World";
std::string str = "count:" + std::to_string(count++) + "\\n";`}</code></pre>
                    <p>この部分で文字を数字に変換している</p>
                    </li>
                </ul>
        </details>

        <h2>TeraTermでの受信</h2>
        
        <p>TeraTermを使うことで、STMから送信したデータを受信することができる</p>
        <p>下の手順を参考に実際にデータを見てみよう！</p>

        <div className="note">
            <h3>受信方法</h3>
            <ul>
                <li>STM32とPCをUSBケーブルで接続する</li>
                <li>TeraTermを起動して、新しい接続を開く（ファイル &gt; 新しい接続で開けるよ）</li>
                <li>シリアル(E)を選択する</li>
            </ul>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/02_Serial/TeraTerm.png" alt="TeraTerm Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <details>
            <summary>文字化けや改行がおかしいときは</summary>
            <ul>
                <li><strong> 文字化けしてしまったとき</strong></li>
                <p>設定(S)からシリアルポート(E)を選択し、スピードを115200にしよう</p>

                <li><strong> 改行がおかしいときは</strong></li>
                <p>設定(S)から端末(T)を選択し、受信の改行コードをLFにしよう</p>
            </ul>
        </details>

        <h2>終わりに</h2>
        <p>今回はシリアル通信について説明した</p>
        <p>現在の値やエラーメッセージの出力など、様々な用途で使えるのでぜひ覚えておこう</p>
        <p>次回は、通信の管理でとっても便利な割り込み処理について説明します</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={7} label="基礎編2" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/01"><h3>・前のページ</h3></a>
        <a href="/basic/03"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic02Serial;
