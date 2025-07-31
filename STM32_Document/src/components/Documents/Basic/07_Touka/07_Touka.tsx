import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic07Touka() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 7</h3>
        <h1>投下装置を作ってみよう</h1>
        <p>ここまで学んだことを使ってひこロボの物資投下ミッションで使う、投下装置を作ってみよう</p>

        <h2>今回やること</h2>
        <p>今回は、これから示す機能を持つコードと回路を作ってみよう</p>
        <p>ヒントも載せているので、困ったら前の資料やヒントを見て作ってみよう</p>
        <div className="note">
            <h3>投下装置</h3>
            <ul>
                <li>プロポの6chを動かすとサーボが開いて物資が落ちる</li>
            </ul>
        </div>

        <p>使ったことのないピンを使いたときは、下のリンク先を使って確認してね</p>

        <a href="https://os.mbed.com/platforms/ST-Nucleo-F446RE/" target="_blank" rel="noopener noreferrer">
          <h3>・ピン対応表のページ</h3>
        </a>

        <h2>ヒント</h2>

        <p>わからないところがあったら、その項目を開いてヒントを確認してみてね</p>

        <details>
            <summary>ピン設定</summary>

            <p>必要な機能からどのピンを割り当てるかを考えてみよう</p>

            <p>ピンは使ったことがあるものを選んでいるだけなので、違う番号でも大丈夫！</p>

            <ul>
              <li>SBUSを受信するためのピン・・・USART2 RX、TX</li>
              <li>サーボを動かすためのタイマー・・・TIM1 CH1</li>
            </ul>
        </details>

        <details>
            <summary>回路</summary>

            <p>必要な機能からどんな回路が必要か考えてみよう</p>

            <ul>
              <li>SBUSを受信するための回路・・・資料6の回路</li>
              <li>サーボを動かすための回路・・・資料4の回路</li>
            </ul>
        </details>

        <details>
            <summary>プログラム</summary>

            <p>SBUSを受信して、データに合わせてサーボを動かすプログラムが必要になる</p>

            <p>資料6の受信したSBUSを送信する部分を、値によってサーボを動かすプログラムに変更したらよさそう</p>

            <pre><code className="language-cpp">{`//6chのスイッチがONの時
if(sbus_data[6] > 1000){
            
    //サーボを開く
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 500);
            
}
//OFFのとき
else{
            
    //サーボを閉じる
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 1800);
}`}</code></pre>
        </details>

        <h2>終わりに</h2>

        <p>がんばったねおつかれさま！</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={12} label="基礎編7" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/06"><h3>・前のページ</h3></a>
        <a href="/basic/08"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic07Touka;
