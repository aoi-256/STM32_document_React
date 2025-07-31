import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic04PWM() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 4</h3>
        <h1>サーボモーターを動かしてみよう</h1>
        <p>今回はPWMという新しい機能を使ってサーボモーター動かしてみる</p>
        <p>今回から少しだけ配線が必要になるので、不安なら先輩に確認してもらおう</p>

        <h2>今回やること</h2>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てる</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>サーボモーターとSTM32を配線でつなぐ</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>サーボモーターの動きを眺める</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回はPWMという機能を使います</p>
        <p>(プロジェクト名).iocからPA8を選択し、TIM1_CH1を割り当てよう</p>

        <p>左側のTimersからTIM1を選択し、上側のModeと下側のConfigurationを写真のように設定しよう</p>

        <p>TIM1の設定からChannel1にPWM Generation CH1を割り当てよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/04_PWM/CH1.png" alt="Channel 1 Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <p>下のConfigurationからParameter Settingsを開き詳細な設定をしよう</p>

        <div className="note">
            <h3>Parameter Settings</h3>

            <p>各項目を以下のように設定してね</p>
            <ul>
                <li>Prescaler <br /> 83</li>
                <li>Counter Mode <br />UP</li>
                <li>Counter Period <br /> 2499</li>
            </ul>
        </div> 

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/04_PWM/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <details>
            <summary>この設定でやっていること</summary>
            <br />
            <ul>
                <li><strong>タイマー設定</strong>
                    <p>サーボモーターは、決まった周期で送られてくるパルス信号のオンとオフの比率（デューティ比）によって角度を決めている</p>
                    <p>この設定をすることで、STM32のクロックをサーボモーターに送りたい周期に変換している</p>
                    <p>ここで周期を決め、後で紹介する関数でデューティ比を変更している</p>
                </li>
            </ul>
        </details>   
    
        <h2>回路</h2>

        <p>サーボモーターとSTM32をジャンパー線を使ってつなぐ</p>

        <p><strong>配線を間違えるとサーボモーターが壊れてしまうことがあるので気を付けてください</strong></p>
        <p><strong>真ん中の5Vだけは絶対に間違えないようにしよう!</strong></p>
        
        <h3>配線図</h3>
        <table>
            <thead>
                <tr>
                    <th>用途</th>
                    <th>STM32</th>
                    <th>サーボモーター</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>信号線</td>
                    <td>D7(PA8に対応)</td>
                    <td>黄色</td>
                </tr>
                <tr>
                    <td>5V線</td>
                    <td>5V</td>
                    <td>赤色</td>
                </tr>
                <tr>
                    <td>GND線</td>
                    <td>GND</td>
                    <td>黒色</td>
                </tr>
            </tbody>
        </table>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/04_PWM/Circuit.png" alt="Circuit Diagram" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        
        <h2>プログラム</h2>

        <p>今回はタイマーのスタートと値の設定の2つの関数を使用します</p>

        <h3>TIMのスタート</h3>
        <p>指定したタイマーを起動するための関数</p>
        <pre><code className="language-cpp">HAL_TIM_PWM_Start(&htimx, TIM_CHANNEL_y);</code></pre>

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
                        <th>&htimx</th>
                        <th>TIM_HandleTypeDef*</th>
                        <th>TIMのポインタ（xはTIMの番号）</th>
                    </tr>
                    <tr>
                        <th>TIM_CHANNEL_y</th>
                        <th>uint32_t</th>
                        <th>yはChannelの番号 </th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <h3>TIMの設定</h3>
        <p>起動したタイマーの値を設定するための関数</p>
        <pre><code className="language-cpp">__HAL_TIM_SET_COMPARE(&htimx , TIM_CHANNEL_y, Value);</code></pre>

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
                        <th>&htimx</th>
                        <th>TIM_HandleTypeDef*</th>
                        <th>TIMのポインタ（xはTIMの番号）</th>
                    </tr>
                    <tr>
                        <th>TIM_CHANNEL_y</th>
                        <th>uint32_t</th>
                        <th>yはChannelの番号 </th>
                    </tr>
                    <tr>
                        <th>Value</th>
                        <th>uint16_t</th>
                        <th>PWMのデューティ比を変更</th>
                    </tr>
                </tbody>
            </table>
        </div> 

        <details>
            <summary>TIMを止める関数</summary>

            <p>今回は使用しないが、安全装置などの設計をする上で止める関数が使えるので紹介しておく</p>
        
            <pre><code className="language-cpp">HAL_TIM_PWM_Stop(&htimx, TIM_CHANNEL_y);</code></pre>

            <p>引数はスタートの関数と同じなので頭の片隅においておくといいかも?</p>

        </details>  

        <h2>サンプルコード</h2>
        <p>実際にサーボモータを回し続けるコードを作成した</p>
        <p>0~2500の好きな値を指定できるので、色々な値を試してみよう</p>
        <p>(CounterPriodを2500にしたので、0~2500の間で調整することになっている)</p>
        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "tim.h"

void init(){
    
    //タイマーの起動
    HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
    HAL_Delay(500);     
}
        
void loop(){
    
    //値の設定
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 1000);
    HAL_Delay(1000);
        
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 1500);
    HAL_Delay(1000);
        
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 2000);
    HAL_Delay(1000);
}`}</code></pre>

        <h2>終わりに</h2>
        <p>今回は、タイマーを使ってサーボモータを動かしてみました</p>
        <p>ほかのモーターも同じように動かすことができるので、機会があったらやってみてね</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={9} label="基礎編4" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/03"><h3>・前のページ</h3></a>
        <a href="/basic/05"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic04PWM;
