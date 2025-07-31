import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Advance04ReadDataSPI() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 応用編4</h3>
        <h1>SPI通信でセンサーのデータを読み取ってみよう</h1>

        <p>今回は前回のプログラムを使って求めた加速度を使って角度を簡単に求めてみよう</p>

        <h2>今回やること</h2>

        <p>前回のコードをそのまま使うのでプロジェクトは分けなくても大丈夫！</p>
        <p>今回からは実際に自分でコードを書いてみよう（ヒントはいっぱいあるから頑張ってね）</p>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てる（前回と同じなので省略）</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>センサーとSTM32をつなぐ</li>
                <li>TeraTermでデータを受信する</li>
            </ul>
        </div>
        
        <h2>プログラム</h2>

        <h3>SPI通信で書き込みをする関数</h3>

        <p>前回は読み取りの関数を紹介したので、書き込みの関数を紹介する</p>
    
        <h3>関数</h3>
        <pre><code className="language-cpp">{`HAL_SPI_Transmit(&hspi1, TxData, DataLen, TimeOut);`}</code></pre>

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
                        <th>&hspi1</th>
                        <th>SPI_HandleTypeDef*</th>
                        <th>SPIのピンに関する設定（hspi1を使用）</th>
                    </tr>
                    <tr>
                        <th>TxData</th>
                        <th>uint8_t*</th>
                        <th>送信するデータが入った配列のポインタ</th>
                    </tr>
                    <tr>
                        <th>DataLen</th>
                        <th>uint16_t</th>
                        <th>送信するデータの長さ</th>
                    </tr>
                    <tr>
                        <th>TimeOut</th>
                        <th>uint32_t</th>
                        <th>タイムアウト時間（ms）</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>電源モードの設定</h3>

        <p>センサーは省電力のため、初期設定では電源が入っていない状態になっている</p>

        <p>そのため、データを取得する前に電源モードを設定してセンサーを動かす必要がある</p>

        <div className="note">
            <h3>電源モードレジスタの設定</h3>

            <table>
                <thead>
                    <tr>
                        <th>項目</th>
                        <th>内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>レジスタアドレス</th>
                        <th>0x0F</th>
                    </tr>
                    <tr>
                        <th>設定値</th>
                        <th>0x0F</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>センサーデータの取得</h2>

        <p>センサーからデータを取得する際は、複数のレジスタから連続でデータを読み取る必要がある</p>

        <h3>取得するデータ</h3>

        <div className="note">
            <h3>データ構成</h3>
            <table>
                <thead>
                    <tr>
                        <th>データ</th>
                        <th>レジスタアドレス</th>
                        <th>バイト数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>加速度X（下位）</th>
                        <th>0x00</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>加速度X（上位）</th>
                        <th>0x01</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>加速度Y（下位）</th>
                        <th>0x02</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>加速度Y（上位）</th>
                        <th>0x03</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>加速度Z（下位）</th>
                        <th>0x04</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>加速度Z（上位）</th>
                        <th>0x05</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>ジャイロX（下位）</th>
                        <th>0x06</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>ジャイロX（上位）</th>
                        <th>0x07</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>ジャイロY（下位）</th>
                        <th>0x08</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>ジャイロY（上位）</th>
                        <th>0x09</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>ジャイロZ（下位）</th>
                        <th>0x0A</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>ジャイロZ（上位）</th>
                        <th>0x0B</th>
                        <th>1</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>データの変換</h3>

        <p>読み取ったデータは8bitずつに分かれているので、16bit（int16_t型）に結合する必要がある</p>

        <pre><code className="language-cpp">{`// 受信した生データを16bit整数に変換
int16_t accel_data[3];
int16_t gyro_data[3];

accel_data[0] = (int16_t)(RawData[1] << 8 | RawData[0]); // X軸加速度
accel_data[1] = (int16_t)(RawData[3] << 8 | RawData[2]); // Y軸加速度  
accel_data[2] = (int16_t)(RawData[5] << 8 | RawData[4]); // Z軸加速度

gyro_data[0] = (int16_t)(RawData[7] << 8 | RawData[6]);   // X軸ジャイロ
gyro_data[1] = (int16_t)(RawData[9] << 8 | RawData[8]);   // Y軸ジャイロ
gyro_data[2] = (int16_t)(RawData[11] << 8 | RawData[10]); // Z軸ジャイロ`}</code></pre>

        <h2>実装してみよう</h2>

        <p>以下の手順でプログラムを実装してみよう：</p>

        <div className="note">
            <h3>実装手順</h3>
            <ol>
                <li>init関数で電源モードを設定する</li>
                <li>loop関数でセンサーデータを連続読み取りする</li>
                <li>読み取ったデータを16bit整数に変換する</li>
                <li>変換したデータをシリアル通信で送信する</li>
            </ol>
        </div>

        <h2>終わりに</h2>
        <p>今回はSPI通信でセンサーのデータを読み取る方法を学びました</p>
        <p>次回は発展編で、センサーのライブラリを作成してみましょう！</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={19} label="応用編4" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/advance/03"><h3>・前のページ</h3></a>
        <a href="/dev/01"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Advance04ReadDataSPI;