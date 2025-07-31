import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Basic08ToukaZidou() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 基礎編 8</h3>
        <h1>投下装置を自動化してみよう</h1>

        <p>前回作った投下装置は、頑張って飛ばしながら投下のスイッチを入れなくてはならなかった</p>
        <p>実際の大会では、投下する箱の中に赤外線投光器が入っているので、赤外線を検知することで投下の自動化ができる</p>

        <h2>今回やること</h2>
        <p>今回は、これから示す機能を持つコードと回路を作ってみよう</p>
        <p>ヒントも載せているので、困ったら前の資料やヒントを見て作ってみよう</p>
        <div className="note">
            <h3>投下装置</h3>
            <ul>
                <li>一定以上の赤外線を検知すると自動で投下装置が作動する</li>
                <li>5chのスイッチで自動投下のオンオフを切り替えることができる</li>
                <li>いつでも6chの手動投下はできる状態にする</li>
            </ul>
        </div>

        <h2>ヒント</h2>

        <p>わからないところがあったら、その項目を開いてヒントを確認してみてね</p>

        <details>
            <summary>ピン設定</summary>

            <p>細かい機能はプログラムで実装できるので、赤外線を検知の部分を追加しよう</p>

            <p>ピンは使ったことがあるものを選んでいるだけなので、違う番号でも大丈夫！</p>

            <div className="note">
                <ul>
                    <li>ADCのためのピン・・・ADC IN0</li>
                </ul>
            </div>
        </details>

        <details>
            <summary>回路</summary>
            
            <p>今回新しく追加するAD変換の回路を追加しよう（資料5を見てね）</p>
        </details>

        <details>
            <summary>プログラム</summary>

            <p>今回は、6チャンネルのスイッチが押されているときか</p>
            <p>5チャンネルのスイッチが押されている時に、赤外線を検知した時にサーボを動かせばよい</p>

            <p>if文は "||" でOR、"&&"でANDとすることができるので、条件を頑張って作ってみよう</p>

            <pre><code className="language-cpp">{`//6chのスイッチがON or スイッチがONかつADCの値が一定以上である時
if(sbus_data[6] > 1000 || (sbus_data[5] > 1000 && ADC_Value > 2000)){

    //サーボを開く
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1,500);
}
//OFFのとき
else{

    //サーボを閉じる
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 1800);
}`}</code></pre>
        </details>

        <h2>終わりに</h2>

        <p>これで基礎編は終わりです！</p>
        <p>がんばったねおつかれさま！</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={13} label="基礎編8" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/basic/07"><h3>・前のページ</h3></a>
        <a href="/advance/01"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Basic08ToukaZidou;
