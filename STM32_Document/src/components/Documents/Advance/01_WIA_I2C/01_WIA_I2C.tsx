import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Advance01WIAI2C() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 応用編1</h3>
        <h1>I2C通信でセンサーと通信をしてみよう</h1>

        <p>今回はセンサーとの通信の練習のため、一番簡単な読み取りである"Who Am I"をやってみよう</p>

        <p>これはセンサーの中にある決まった値を返してくれるメモリ（レジスタ）にアクセスし通信の確立をチェックするのに使う</p>

        <h2>今回やること</h2>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てる</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>センサーとSTM32をつなぐ</li>
                <li>TeraTermでデータを受信する</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回は、I2Cという機能を使って通信を行う</p>
        <p><strong>PB8とPB9にI2C1_SCL（クロック）とI2C1_SDA（データ）</strong>を割り当てておこう</p>
        
        <h2>プログラム</h2>

        <h3>I2C通信で読み取りをする関数</h3>

        <p>今回は通信の確立テストをするだけなので、読み取り関数のみ紹介する</p>
    
        <h3>関数</h3>
        <pre><code className="language-cpp">HAL_I2C_Mem_Read(&hi2cx, I2CADDR, REGISTER, REGLen, Data, DataLen, TimeOut);</code></pre>

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
                        <th>&hi2c1</th>
                        <th>I2C_HandleTypeDef*</th>
                        <th>I2Cのポインタ（xはI2Cの番号）</th>
                    </tr>
                    <tr>
                        <th>I2CADDR</th>
                        <th>uint8_t</th>
                        <th>送信相手のアドレス</th>
                    </tr>
                    <tr>
                        <th>REGISTER</th>
                        <th>uint8_t</th>
                        <th>読み取るレジスタアドレス</th>
                    </tr>
                    <tr>
                        <th>REGLen</th>
                        <th>uint16_t</th>
                        <th>読み取るレジスタの数</th>
                    </tr>
                    <tr>
                        <th>Data</th>
                        <th>uint8_t*</th>
                        <th>読み取った値を入れるバッファー（ポインタ）</th>
                    </tr>
                    <tr>
                        <th>DataLen</th>
                        <th>uint16_t</th>
                        <th>読み取るデータの数</th>
                    </tr>
                    <tr>
                        <th>TimeOut</th>
                        <th>uint32_t</th>
                        <th>最大実行時間（超えたら処理を諦める）</th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <h2>回路</h2>

        <p>今回はICM45686というセンサーの評価ボードを使用する</p>

        <p>配線はこの通りに繋げば動くので、上下のピンを間違えないようにしてね</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Advance/01_WIA_I2C/Circuit.png" alt="Circuit Diagram" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <table>
            <thead>
                <tr>
                    <th>用途</th>
                    <th>STM32</th>
                    <th>ICM45686</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>クロック線</td>
                    <td>D15(PB8に対応)</td>
                    <td>CN1_16</td>
                </tr>
                <tr>
                    <td>データ線</td>
                    <td>D14(PB9に対応)</td>
                    <td>CN1_18</td>
                </tr>
                <tr>
                    <td>5V線</td>
                    <td>5V</td>
                    <td>CN1_19</td>
                </tr>
                <tr>
                    <td>GND線</td>
                    <td>GND</td>
                    <td>CN1_13</td>
                </tr>
            </tbody>
        </table>

        <h2>サンプルコード</h2>
        <p>ICM45686の"WHOAMIレジスタ"（通信確立などに使う）の値を読み取るコード紹介する</p>

        <p>データシートには"0xE9(233)"が返ってくると書いてあるので、この値が受信できるか試してみよう</p>

        <p>I2Cアドレスやレジスタアドレスもデータシートに書いてあるよ</p>
        
        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "usart.h"
#include "i2c.h"
#include "string"

void init(){

}

void loop(){
    
    //引数を定義
    uint8_t I2CADDR = 0x68 << 1;
    uint8_t REGISTER = 0x72;
    uint8_t Data = 0;

    //センサーからデータを読み取り
    HAL_I2C_Mem_Read(&hi2c1, I2CADDR, REGISTER, 1, &Data, 1, 1000);

    //読み取った値をPCに送信
    std::string str = "WHOAMI: " + std::to_string(Data) + "\\n";
    HAL_UART_Transmit(&huart2, (uint8_t *)str.c_str(),str.length(),100);


    HAL_Delay(1000);
}`}</code></pre>

        <h2>終わりに</h2>

        <p>今回はセンサーとの通信の基本をやってみました</p>

        <p>次回は、実際にセンサーデータを取得してみよう</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={16} label="応用編1" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/08"><h3>・前のページ</h3></a>
        <a href="/advance/02"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Advance01WIAI2C;
