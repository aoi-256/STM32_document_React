import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic01LED() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 1</h3>
        <h1>LEDをつけてみよう</h1>
        <p>LEDをつけて、STMの開発の流れを覚えていこう!</p>

        <h2>今回やること</h2>
        <p>今回は3つのステップに沿ってLEDをつけてみる</p>
        <p>通信などをするときも同じステップを踏むので慣れておこう！</p>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>LEDにピンを割り当てる</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>LEDがつくことを確かめる</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>STM32では、1つのピンに通信やLEDなどの機能を割り当てることができる</p>
        <p>そのため、どの用途でどのピンを使うかを設定しなくてはならない</p>
        <p><strong>(プロジェクト名).ioc</strong>をクリックすると画像のような画面が出てくるのでここで設定しよう</p>

        <div className="note">
            <p>PA5にGPIO_Output（電圧を変えることができる機能）が割り当てられていることを確認しておこう</p>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/01_LED/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>プログラム</h2>

        <h3>LEDをつけるための関数</h3>
        <p>今回はLEDに与える電圧を設定することで、LEDをつけている</p>
        <p>そこで、電圧を変更する関数について説明する</p>

        <h3>関数</h3>
        <pre><code className="language-cpp">HAL_GPIO_WritePin(GPIOx,GPIO_PIN_y, GPIO_PIN_SET);</code></pre>
        <div className="note">
            <h3>この関数の引数</h3>

            <p>GPIOxやGPIO_PIN_yは整数型だけど、システム側で文字に対応するようになってるので</p>
            <p>GPIOAなどと書くことができる</p>

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
                        <th>uint32_t</th>
                        <th>GPIOの種類(xはGPIOの種類)</th>
                    </tr>
                    <tr>
                        <th>GPIO_PIN_y</th>
                        <th>uint32_t</th>
                        <th>ピンの種類（yはピン番号）</th>
                    </tr>
                    <tr>
                        <th>GPIO_PIN_SET</th>
                        <th>GPIO_PinState</th>
                        <th>SET: 3.3v RESET: 0.0v</th>
                    </tr>
                </tbody>
            </table>
        </div>   
        <details>
            <summary>細かいお話</summary>
            <br />
            <ul>
                <li><strong>ピンの状態を反転する関数</strong>
                    <p>LEDが付いている時消す、消えている時につけるという動作を実行したいときは、この関数を使ってみよう</p>
                    <pre><code className="language-cpp">HAL_GPIO_TogglePin(GPIOA,GPIO_PIN_1);</code></pre>
                    <p>反転する関数なので、電圧を決める引数がないこと以外は、上の関数と同じ</p>
                </li>
            </ul>
        </details>

        <h3>待機する関数</h3>
        <p>タイミングを調整するために、一定時間待機する関数を使う</p>

        <h3>関数</h3>
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
#include "gpio.h"

//起動時に一度だけ実行される
void init(){

    //LEDをつける
    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5, GPIO_PIN_SET);
                    
    //1000ms(1s)待機
    HAL_Delay(1000);
}

//繰り返し実行される            
void loop(){
                
    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5, GPIO_PIN_RESET);
                    
    HAL_Delay(500);
                    
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

export default Basic01LED;
