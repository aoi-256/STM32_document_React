import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Advance02ReadDataI2C() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 応用編2</h3>
        <h1>I2C通信でセンサーのデータを読み取ってみよう</h1>

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

        <h3>I2C通信で書き込みをする関数</h3>

        <p>前回は読み取りの関数を紹介したので、書き込みの関数を紹介する</p>
    
        <h3>関数</h3>
        <pre><code className="language-cpp">HAL_I2C_Mem_Write(&hi2cx, I2CADDR, REGISTER, REGLen, Data, DataLen, TimeOut);</code></pre>

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
                        <th>&hi2cx</th>
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
                        <th>書き込むレジスタアドレス</th>
                    </tr>
                    <tr>
                        <th>REGLen</th>
                        <th>uint16_t</th>
                        <th>書き込むレジスタの数</th>
                    </tr>
                    <tr>
                        <th>Data</th>
                        <th>uint8_t*</th>
                        <th>書き込む値を入れるバッファー（ポインタ）</th>
                    </tr>
                    <tr>
                        <th>DataLen</th>
                        <th>uint16_t</th>
                        <th>書き込むデータの数</th>
                    </tr>
                    <tr>
                        <th>TimeOut</th>
                        <th>uint32_t</th>
                        <th>最大実行時間（超えたら処理を諦める）</th>
                    </tr>
                </tbody>
            </table>
        </div>   

        <h2>データの処理について</h2>

        <p>センターから受信できるデータはuint8_t(8桁の2進数)であるため、0~255までの値しか表現できない</p>
        
        <p>これだと表現できる値が少ないので、2つのレジスタに上8桁と下8桁を分割してデータが入っている</p>

        <p>そのため、2つのレジスタから読み取った値を上8桁を8桁ずらして下8桁を足すことで元の16桁のデータとしている</p>

        <p>書き方としては"&lt;&lt; 8"で8桁ずらし、2つのデータを"|"を使ってOR演算（足し算）する</p>

        <pre><code className="language-cpp">AccelData[0]  = (int16_t)(HighByte &lt;&lt; 8 | LowByte)</code></pre>

        <p>前回紹介した受信のコードと合わせるとこのように書くことができる（引数の変数を定義して使ってね）</p>

        <pre><code className="language-cpp">{`//センサーからデータを読み取り

//受信データの配列
uint8_t RawData[12] = {};

HAL_I2C_Mem_Read(&hi2c1, I2CADDR, ACEEL_DATA_X1_UI, 1, RawData, 12, 1000);
        
//取得データの処理
AccelData[0]  = (int16_t)(RawData[0] | RawData[1] << 8);
AccelData[1]  = (int16_t)(RawData[2] | RawData[3] << 8);
AccelData[2]  = (int16_t)(RawData[4] | RawData[5] << 8);
        
GyroData[0]  = (int16_t)(RawData[6]  | RawData[7] << 8);
GyroData[1]  = (int16_t)(RawData[8]  | RawData[9] << 8);
GyroData[2]  = (int16_t)(RawData[10] | RawData[11] << 8);`}</code></pre>

        <h2>サンプルコード</h2>
        <p>実際にICM45686から値を取得するコードを書いてみよう</p>

        <p>今回は最低限のレジスタ操作しかしないのでこの3つのみを設定すればよい</p>
        
        <div className="note">
            <h3>今回使用するレジスタ</h3>

            <p>WIA→ PWM_MGMT → ACEEL_DATA_X1_UIの順番で操作していこう</p>

            <table>
                <thead>
                    <tr>
                        <th>レジスタ名</th>
                        <th>レジスタアドレス</th>
                        <th>内容</th>
                        <th>値</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>ACEEL_DATA_X1_UI</th>
                        <th>0x00</th>
                        <th>センターデータ(ここから12byteにAccelとGyroのデータがある）</th>
                        <th>読み取り専用</th>
                    </tr>
                    <tr>
                        <th>PWR_MGMT</th>
                        <th>0x10</th>
                        <th>センサーの電源設定</th>
                        <th>書き込み(値: 0x0f)</th>
                    </tr>
                    <tr>
                        <th>WIA</th>
                        <th>0x72</th>
                        <th>通信チェック用</th>
                        <th>読み取り専用(0xE9が返ってくる）</th>
                    </tr>
                </tbody>
            </table>
        </div>  

        <p>TeraTermへの送信はusart.hと"string"をインクルードしてこのコードで送ることができる</p>
        <p>受信したデータが入っている変数がAccelDataとGyroDataになっているので必要に応じて変えてね</p>
        
        <pre><code className="language-cpp">{`str = "AccelData: " + std::to_string(AccelData[0]) + std::to_string(AccelData[1]) + std::to_string(AccelData[2]) + "\\n";
str = "GyroData: " + std::to_string(GyroData[0]) + std::to_string(GyroData[1]) + std::to_string(GyroData[2]) + "\\n";`}</code></pre>

        <h2>終わりに</h2>

        <p>今回は実際にセンサーデータを取得してみました</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={17} label="応用編2" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/advance/01"><h3>・前のページ</h3></a>
        <a href="/advance/03"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Advance02ReadDataI2C;
