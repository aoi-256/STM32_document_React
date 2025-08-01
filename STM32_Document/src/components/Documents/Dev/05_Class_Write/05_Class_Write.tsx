import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Dev05ClassWrite() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        
        <h3>STM32資料 発展編5</h3>
        <h1>実際にクラスを書いてみよう</h1>

        <p>前回学習した内容を使って、発展編3のクラスをよりよくしてみよう</p>

        <div className="note">
            <h3>今回やること</h3>

            <p><strong>発展編3で書いたクラスに次の要素を追加してみよう</strong></p>
    
            <table>
                <thead>
                    <tr>
                        <th>仕様</th>
                        <th>やること</th>
                        <th>内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>I2CとSPIに対応</th>
                        <th>仮想関数を使う</th>
                        <th>ICM45686_I2C, ICM45686_SPIクラスを作成する</th>
                    </tr>
                    <tr>
                        <th>設定の数字を文字に対応させる</th>
                        <th>enum classを使用</th>
                        <th>REGISTERの設定を対応させる</th>
                    </tr>
                </tbody>
            </table>
        </div>          

        <h2>enum classを使う</h2>

        <p>レジスタの値を直接書き込んでいるので、ここにenum classを使ってみよう</p>

        <p>基底クラス(ICM45686.hpp)のpublicの中に定義してみよう</p>

        <p>値を書いたあとは";(セミコロン)"ではなく、",(カンマ)"を用いる</p>

        <pre><code className="language-cpp">{`enum class REGISTER : uint8_t {

    WIA = 0x72, //WIAレジスタのアドレス
    //他２つのレジスタの値を定義してみよう
}`}</code></pre>

        <h2>仮想関数を定義する</h2>

        <p>2つの通信を実装するために、仮想関数と継承を使う</p>

        <p>発展編3のクラスで定義したRead/Write関数を仮想関数にしてみよう</p>
        <pre><code className="language-cpp">{`//書き込みと読み取りの関数

virtual void Read(uint8_tregister, uint8_t* rx_buffer, uint8_t len) = 0; //Read関数の宣言
virtual void Write(uint8_t register, uint8_t* tx_buffer, uint8_t len) = 0; //Write関数の宣言`}</code></pre>

        <p>仮想関数は、派生クラス（通信のクラス）で実装するので、ICM45686.cppからこの関数の実装部分を消しておこう</p>
    
        <h2>派生クラスを作成する</h2>

        <p>先ほど定義した仮想関数を実装するために派生クラスを作成する</p>

        <p>この中で仮想関数を実装するので、</p>

        <p><strong>ICM45686.cppを参考にICM45686_I2C.cppを作成してみよう</strong></p>

        <pre><code className="language-cpp">{`// I2Cのクラスを定義
class ICM45686_I2C: public ICM45686{
    
    public:

        ICM45686_I2C(I2C_HandleTypeDef* use_i2c_pin); 

    private:

        //仮想関数の実装
        void Read(uint8_t register, uint8_t* rx_buffer, uint8_t len); //Read関数の実装
        void Write(uint8_t register, uint8_t* tx_buffer, uint8_t len); //Write関数の実装
        I2C_HandleTypeDef* i2c_pin; //I2Cのピン情報を格納する変数

}; //I2Cのクラスの定義`}</code></pre>

        <p>難しそうに聞こえるが、コンストラクタの実装とHALライブラリのI2C関数を利用して</p>

        <p>3つの関数を実装するだけなので、頑張ってみてね</p>

        <h2>実際に使ってみよう</h2>

        <p>ICM45686_I2Cクラスで具体的な通信を定義したので、ICM45686_I2Cクラスを呼び出そう</p>

        <p>基本的には発展編3と同じように使うことができる</p>

        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "ICM45686_I2C.hpp"
#include "i2c.h"
#include "usart.h"

ICM45686 ICM45686_I2C(&hi2c1); //ICM45686_I2Cのインスタンスを作成
int16_t accel_data[3]; //加速度データを格納する変数
int16_t gyro_data[3]; //ジャイロデータを格納する変数[

uint8_t wia; //WIAを格納する変数

void init(){

    wia = icm.WIA(); //WIAを取得

    //WIAが正しいか確認のため送信する(成功なら0、失敗なら1が送信される)
    HAL_UART_Transmit(&huart2, &wia, 1, 1000);

    //電源モードを設定する関数を呼び出す
    icm.PowerON(); 
}

void loop(){   

    //データを取得する関数を呼び出す
    icm.GetSensorData(accel_data, gyro_data);

    //取得したデータを送信する（コメントアウトで送信するデータを選べる）

    HAL_UART_Transmit(&huart2, (uint8_t*)"Accel Data: ", 12, 1000);
    HAL_UART_Transmit(&huart2, (uint8_t*)&accel_data, sizeof(accel_data), 1000);

    //HAL_UART_Transmit(&huart2, (uint8_t*)"Gyro Data: ", 12, 1000);
    //HAL_UART_Transmit(&huart2, (uint8_t*)&gyro_data, sizeof(gyro_data), 1000);
}`}</code></pre>

        <h2>やってみよう</h2>

        <p>ICM45686_I2Cクラスを参考にSPI通信を行うICM45686_SPIクラスを作成してみよう</p>

        <p>仮想関数とコンストラクタの実装だけなので、ICM45686クラスや</p>

        <p>wrapper.cppのインクルードとインスタンス作成以外は変更しないで実装できる</p>

        <h2>終わりに</h2>

        <p>今回は継承や仮想関数を利用したクラスを作成してみました</p>

        <p>ICM45686(基底クラス)やwrapper.cppにほとんど影響を与えずに通信形式を変更でき</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={40} label="発展編5" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/dev/04"><h3>・前のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Dev05ClassWrite;
