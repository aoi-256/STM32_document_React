import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Supplement02ExecTime() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 補足編 2</h3>
        <h1>実行時間を測定してみよう</h1>

        <p>タイマー割り込みを使って実行時間を測定してみよう</p>

        <h2>今回やること</h2>

        <p>タイマー割り込みで1ミリ秒ごとにカウントアップすることで実行時間を測定します</p>

        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てて、割り込みの設定をする</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>PCでデータを受信する</li>
            </ul>
        </div>

        <h2>タイマーの設定</h2>

        <div className="note">
            <h3>Configurationの設定</h3>
            <ul>
                <li><strong>今回は内部クロックから1ミリ秒ごとにリセットされるタイマーを作成する</strong></li>
                <p>このボードのタイマーのクロックは84MHZなので、1秒に8400万回のクロックが発生する</p>
                <p>そのため、84クロックごとに1カウントアップするタイマーで1000回カウントすれば8.4万回( = 1ミリ秒)を数えることができる</p>

                <p>そこでPreScalerを83、Counter Periodを999にする</p>
            </ul>
        </div>

        <h2>プログラム</h2>

        <p>前回紹介しなかった、タイマーの停止用関数を紹介します</p>

        <h3>TIMのスタート</h3>
        <p>指定したタイマーを停止するための関数</p>
        <pre><code className="language-cpp">{`HAL_TIM_Base_Stop_IT(&htim6);`}</code></pre>

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
                        <th>&htim</th>
                        <th>TIM_HandleTypeDef*</th>
                        <th>タイマーのポインタ（xはタイマーの番号）</th>
                    </tr>
                </tbody>
            </table>
        </div>  

        <h2>サンプルコード</h2>

        <p>1msごとに割り込みを発生させて、実行時間を測定するプログラムを作成した</p>

        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "tim.h"
#include "usart.h"
#include <string>

uint32_t count = 0;

void init(){

	HAL_TIM_Base_Start_IT(&htim6);

    //測定したい処理
    HAL_Delay(1000);

    HAL_TIM_Base_Stop_IT(&htim6);

    //データの出力（タイマーの処理時間があるので、1ms引いておこう）
    std::string str = "count = " + std::to_string(count - 1) + "\\n";
    HAL_UART_Transmit(&huart2, (uint8_t*)str.c_str(), str.size(), 1000);
}

void loop(){

}

//タイマーのカウントが最大値に達したときに呼び出される
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim){

	//TIM6 1msの割り込み
	if(htim == &htim6){

		count++;
	}
}`}</code></pre>

        <h2>終わりに</h2>
        <p>今回は、タイマー割り込みを使った実行時間測定をやってみました！</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={27} label="補足編2" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/supplement/01"><h3>・前のページ</h3></a>
        <a href="/supplement/03"><h3>・次のページ</h3></a>

    </main>
    <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
    </footer>
    </div>
  );
}

export default Supplement02ExecTime;
