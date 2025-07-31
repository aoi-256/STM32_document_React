import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Advance03WIASPI() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 応用編3</h3>
        <h1>SPI通信でセンサーと通信をしてみよう</h1>

        <p>今回は、SPI通信という方法を使ってICM45686のWIAレジスタを読み取ってみよう</p>

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

        <h2>SPI通信とは</h2>

        <p>I2Cのようにセンサーと通信する時に使う通信形式の1つ</p>

        <p>送受信の2本の通信線と、デバイス選択の信号線を使うことで高速通信を実現している</p>

        <div className="note">
            <h3>I2CとSPIの違い</h3>

            <p>簡単にI2CとSPIの違いを表にまとめてみた</p>
            <p>例外は色々あるので、この通りにならないこともしばしばある</p>

            <p>速度が早くいいことばかりに見えるが、デバイスごとに信号線が必要になるので</p>
            <p>センターの数だけ配線が複雑になってしまうというデメリットを抱えている</p>

            <table>
                <thead>
                    <tr>
                        <th>要素</th>
                        <th>I2C通信</th>
                        <th>SPI通信</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>通信線</th>
                        <th>1本(SDA)</th>
                        <th>2本(MISO, MOSI)</th>
                    </tr>
                    <tr>
                        <th>信号線</th>
                        <th>1本(SCL)</th>
                        <th>1本(SCK)</th>
                    </tr>
                    <tr>
                        <th>デバイス選択</th>
                        <th>I2Cアドレス（プログラム）</th>
                        <th>信号線(CS, ハード)</th>
                    </tr>
                    <tr>
                        <th>通信速度（このセンサーの最大値）</th>
                        <th>1Mbps</th>
                        <th>24Mbps</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>デバイス選択(CS)とは</h3>

        <p>SPI通信のCSピンに繋がる信号線は、選択時に0v、非選択時には3.3vに保っておく必要がある</p>

        <p>そこでGPIOを使用し、通信直前にRESET、通信後にSETをすることでこの動作を実装できる</p>

        <h2>ピンの割り当て</h2>

        <h3>ピンの設定</h3>

        <p>今回はSPI1を使うので図のようにSPIのピンを3つとGPIOを設定しよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Advance/03_WIA_SPI/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h3>詳細設定</h3>

        <p>SPI1の設定を開き、BaudRateが1~5Mbits程度になるようにPrescalerの値を変更しよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Advance/03_WIA_SPI/SPI_Config.png" alt="SPI Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <p>System CoreからGPIOを選択し、PB6の設定を変更しよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Advance/03_WIA_SPI/GPIO_Config.png" alt="GPIO Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>プログラム</h2>

        <h3>SPI通信で送受信をする関数</h3>

        <p>SPI通信では送信と受信が同時に行われるため、送受信用の関数を使用する</p>
    
        <h3>関数</h3>
        <pre><code className="language-cpp">HAL_SPI_TransmitReceive(&hspix, TxData, RxData, Size, Timeout);</code></pre>

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
                        <th>&hspix</th>
                        <th>SPI_HandleTypeDef*</th>
                        <th>SPIのポインタ（xはSPIの番号）</th>
                    </tr>
                    <tr>
                        <th>TxData</th>
                        <th>uint8_t*</th>
                        <th>送信データのポインタ</th>
                    </tr>
                    <tr>
                        <th>RxData</th>
                        <th>uint8_t*</th>
                        <th>受信データを格納するポインタ</th>
                    </tr>
                    <tr>
                        <th>Size</th>
                        <th>uint16_t</th>
                        <th>送受信するデータサイズ</th>
                    </tr>
                    <tr>
                        <th>Timeout</th>
                        <th>uint32_t</th>
                        <th>最大実行時間</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>サンプルコード</h2>

        <p>ICM45686のWHOAMIレジスタをSPI通信で読み取るサンプルコード</p>

        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "usart.h"
#include "spi.h"
#include "gpio.h"
#include "string"

void init(){

}

void loop(){
    
    uint8_t TxData[2] = {0x72 | 0x80, 0x00}; // 読み取り用コマンド
    uint8_t RxData[2] = {0};

    // CS信号をLowに（通信開始）
    HAL_GPIO_WritePin(GPIOB, GPIO_PIN_6, GPIO_PIN_RESET);
    
    // SPI通信実行
    HAL_SPI_TransmitReceive(&hspi1, TxData, RxData, 2, 1000);
    
    // CS信号をHighに（通信終了）
    HAL_GPIO_WritePin(GPIOB, GPIO_PIN_6, GPIO_PIN_SET);

    // 受信データをシリアル送信
    std::string str = "WHOAMI: " + std::to_string(RxData[1]) + "\\n";
    HAL_UART_Transmit(&huart2, (uint8_t *)str.c_str(), str.length(), 100);

    HAL_Delay(1000);
}`}</code></pre>

        <h2>終わりに</h2>

        <p>今回はSPI通信の基本を学びました</p>

        <p>次回は、実際にSPIでセンサーデータを取得してみよう</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={18} label="応用編3" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/advance/02"><h3>・前のページ</h3></a>
        <a href="/advance/04"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Advance03WIASPI;
