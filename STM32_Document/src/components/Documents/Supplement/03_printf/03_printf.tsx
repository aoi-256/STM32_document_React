import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Supplement03Printf() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 補足編3</h3>
        <h1>Printfをしてみよう</h1>

        <p>いつも使っているHAL_UART_Transmit()では整数8桁しか送ることができず</p>

        <p>小数や大きな数を送るときにはめんどくさい工夫が必要になってしまう</p>

        <p>そこで、C言語でよく使うprintf()を使ってみよう</p>

        <h2>printfとは</h2>

        <p>C言語で結果の出力などによく使う関数</p>

        <p>1つ目の引数で出力する文字と変数の位置(%dや%3.3lfなど)を定義し</p>

        <p>2つ目の引数で出力する変数を指定する</p>
        <pre><code className="language-cpp">{`printf("number[%d] = %3.3lf", id, value[id]);`}</code></pre>

        <p>今回はこれをHAL_UART_Transmit()送る方法を説明する</p>

        <h2>printfの使い方</h2>

        <p>printfを使うためには、"stdio.h"のインクルードとmain.cでの定義が必要になる</p>

        <h3>インクルード</h3>

        <p>main.cのインクルードのところをこのようにしよう</p>

        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "stdio.h"`}</code></pre>

        <h3>printfの定義</h3>

        <p>main.cの/* USER CODE BEGIN 0 */の下にこのコードを書こう</p>

        <pre><code className="language-cpp">{`#ifdef __GNUC__
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif
PUTCHAR_PROTOTYPE{
    
    HAL_UART_Transmit(&huart2, (uint8_t *)&ch, 1, HAL_MAX_DELAY);
                
    return ch;
}`}</code></pre>

        <h2>実際に使ってみよう</h2>

        <p>今回はfloatの値を送信するコードを書いてみた</p>

        <p>このように自由に値などを送ることができるので、ぜひ使ってね</p>

        <pre><code className="language-cpp">{`#include "wrapper.hpp"
#include "stdio.h"

void init(){

    float value = 0.123456789;
    int id = 1;
    printf("number[%d] = %3.3lf\\n", id, value);
}

void loop(){

}`}</code></pre>

        <h2>終わりに</h2>
        <p>今回はprintfを使ってみました</p>
        <p>これを使うことで、デバッグがやりやすくなると思うので頑張ってみてね</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={28} label="補足編3" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/supplement/02"><h3>・前のページ</h3></a>
    </main>
    <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
    </footer>
    </div>
  );
}

export default Supplement03Printf;
