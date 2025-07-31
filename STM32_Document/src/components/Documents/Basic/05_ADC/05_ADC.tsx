import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic05ADC() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 5</h3>
        <h1>赤外線を検出してみよう</h1>
        <p>赤外線は目には見えないが、制御や誘導などで非常に便利である</p>
        <p>そこで今回は、フォトトランジスタとAD変換という手法を使って赤外線を検出してみよう</p>

        <h2>今回やること</h2>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てる</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>フォトトランジスタとSTM32を配線でつなぐ</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>赤外線投光器を近づけて値を観察する</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回はADCという機能を使います</p>
        <p>(プロジェクト名).iocからPA0を選択し、ADC1_IN0を割り当てよう</p>  
        
        <p>左側のAnalogからADC1を選択し、IN0にチェックを入れよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/05_ADC/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>回路</h2>

        <p>フォトトランジスタとSTM32をジャンパー線を使ってつなぐ</p>

        <p>回路が少し複雑なので、気を付けてつけてね</p>

        <h3>配線図</h3>

        <p>フォトトランジスタと10kΩの抵抗を使ってね</p>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Basic/05_ADC/Circuit.png" alt="Circuit Diagram" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        
        <h2>プログラム</h2>

        <p>今回はADCのスタートとストップ、変換待機と読み取りの4つの関数を使います</p>

        <h3>ADCのスタート</h3>
        <p>指定したADCを起動するための関数</p>
        <pre><code className="language-cpp">HAL_ADC_Start(&hadcx);</code></pre>

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
                        <th>&hadcx</th>
                        <th>ADC_HandleTypeDef*</th>
                        <th>ADCのポインタ（xはADCの番号）</th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <h3>AD変換の待機</h3>
        <p>指定したADCを起動するための関数</p>
        <pre><code className="language-cpp">HAL_ADC_PollForConversion(&hadcx, Time)</code></pre>

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
                        <th>&hadcx</th>
                        <th>ADC_HandleTypeDef*</th>
                        <th>ADCのポインタ（xはADCの番号）</th>
                    </tr>
                    <tr>
                        <th>Time</th>
                        <th>uint32_t</th>
                        <th>待機する最大時間</th>
                    </tr>
                </tbody>
            </table>
        </div>  

        <h3>値の読み取り</h3>
        <p>変換した値を読み取るための関数</p>
        <pre><code className="language-cpp">Value = HAL_ADC_GetValue(&hadcx);</code></pre>

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
                        <th>&hadcx</th>
                        <th>ADC_HandleTypeDef*</th>
                        <th>ADCのポインタ（xはADCの番号）</th>
                    </tr>
                </tbody>
            </table>

            <h3>この関数の戻り値</h3>
            <table>
                <thead>
                    <tr>
                        <th>戻り値名</th>
                        <th>変数型</th>
                        <th>内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Value</th>
                        <th>uint16_t</th>
                        <th>ADCをした値(0~4095)</th>
                    </tr>
                </tbody>
            </table>
        </div>  

        <h3>ADCのストップ</h3>
        <p>指定したADCを停止するための関数</p>
        <pre><code className="language-cpp">HAL_ADC_Stop(&hadcx);</code></pre>

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
                        <th>&hadcx</th>
                        <th>ADC_HandleTypeDef*</th>
                        <th>ADCのポインタ（xはADCの番号）</th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <h2>サンプルコード</h2>
        <p>実際にAD変換を行い、その値をシリアル通信で送信するプログラムを作成した</p>
        <p>蛍光灯や日光にあてて値の変化を読み取ってみよう</p>
        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "adc.h"
#include "usart.h"
#include "string"

uint16_t ADC_Value = 0;

void init(){
    
    HAL_Delay(500);     
}
        
void loop(){

    //ADCのスタート
    HAL_ADC_Start(&hadc1);
    
    //変換を待機
    if(HAL_ADC_PollForConversion(&hadc1, 1000) == HAL_OK ){

        //値の読み取り
        ADC_Value = HAL_ADC_GetValue(&hadc1);

        //値の送信
        std::string str = "ADC_Value:" + std::to_string(ADC_Value) + "\\n";
        HAL_UART_Transmit(&huart2, (uint8_t *)str.c_str(),str.length(),100);
    }

    //ADCのストップ
    HAL_ADC_Stop(&hadc1);

    //ちょっと待機
    HAL_Delay(100);
}`}</code></pre>

        <h2>終わりに</h2>
        <p>今回は、AD変換を使って赤外線を読み取ってみた</p>
        <p>色々な場面で使えるので、ぜひ覚えておこう</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={10} label="基礎編5" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/04"><h3>・前のページ</h3></a>
        <a href="/basic/06"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic05ADC;
