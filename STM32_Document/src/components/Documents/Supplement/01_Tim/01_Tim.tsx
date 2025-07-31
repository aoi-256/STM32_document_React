import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Supplement01Tim() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 補足編1</h3>
        <h1>タイマー割り込みをやってみよう</h1>
        <p>タイマー機能を使って一定時間ごとに割り込み処理を発生させてみよう</p>
        <p>定期的に実行したい時間にシビアなタスクの管理や、実行時間の測定にとっても使える</p>

        <h2>今回やること</h2>
        <p>少し新しい関数は出てくるけど、基本はDMAとPWMの足し算みたいな内容です</p>
        <p>割り込み処理で1秒ごとにLEDを点滅させるプログラムを書いてみます</p>
        <div className="note">
            <h3>作業の流れ</h3>
            <ul>
                <li>ピンを割り当てて、割り込みの設定をする</li>
                <li>wrapper.cppにコードを書き込む</li>
                <li>STM32にプログラムを書き込み実行する</li>
                <li>PCでデータを受信する</li>
            </ul>
        </div>

        <h2>ピンの割り当て</h2>
        <p>今回はUSARTと内部タイマーであるTIM6を使う</p>
        <p>TIM6はピンがないので、図のように選んで有効化してみよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Supplement/01_Tim/Pin.png" alt="Pin Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>タイマーの設定</h2>
        <p>タイマーの設定をしてみよう</p>
        <p>今回は1秒ごとに割り込みを起こしたいので、以下のような設定にする</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Supplement/01_Tim/Config.png" alt="Timer Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <div className="note">
            <h3>設定の説明</h3>
            <p><strong>Prescaler:</strong> 84000-1 = 83999</p>
            <p><strong>Counter Period:</strong> 1000-1 = 999</p>
            <p>この設定により、84MHzのクロックを84000で分周し、1000カウントで1秒になる</p>
        </div>

        <h2>割り込みの設定</h2>
        <p>NVICの設定で割り込みを有効にする</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Supplement/01_Tim/NVIC.png" alt="NVIC Configuration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>プログラム</h2>

        <h3>タイマー割り込みを開始する関数</h3>
        <p>タイマーの割り込みを開始するためにこの関数を使う</p>

        <pre><code className="language-cpp">{`HAL_TIM_Base_Start_IT(&htim6);`}</code></pre>

        <div className="note">
            <h3>この関数の引数</h3>
            <p><strong>&htim6:</strong> TIM6のハンドラ（設定で作成されたもの）</p>
        </div>

        <h3>タイマー割り込みのコールバック関数</h3>
        <p>タイマーの割り込みが発生したときに自動で呼び出される関数</p>

        <pre><code className="language-cpp">{`void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim){
    //TIM6の割り込みかどうかをチェック
    if(htim == &htim6){
        //ここに割り込み時に実行したい処理を書く
    }
}`}</code></pre>

        <div className="note">
            <h3>この関数について</h3>
            <p>この関数は自動で呼び出されるので、wrapper.cppには含めない</p>
            <p>main.cppに直接書くか、別のファイルに書いてインクルードする</p>
        </div>

        <h2>実装例</h2>

        <h3>wrapper.cpp</h3>
        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "tim.h"
#include "gpio.h"

void init(){
    // タイマー割り込みを開始
    HAL_TIM_Base_Start_IT(&htim6);
}

void loop(){
    HAL_Delay(1000);
}`}</code></pre>

        <h3>main.cppに追加</h3>
        <pre><code className="language-cpp">{`//タイマーのカウントが最大値に達したときに呼び出される
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim){
    //TIM6 1sの割り込み
    if(htim == &htim6){
        HAL_GPIO_TogglePin(GPIOA,GPIO_PIN_5);
    }
}`}</code></pre>

        <h2>終わりに</h2>
        <p>今回は、タイマーを使った割り込みをやってました！</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={26} label="補足編1" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/supplement/02"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Supplement01Tim;
