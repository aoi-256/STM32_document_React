import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Setup02Project() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        <h3>STM32資料 導入 2</h3>
        <h1>STM32の初期設定を済ませよう</h1>

        <h2>今回やること</h2>
        <p>今回は、STM32CubeIDEの初期設定をやります</p>
        <div className="note">        
          <ul>
            <li>STM32CubeIDEのバージョンによっては、設定の位置が違うので困ったら先輩に聞いてね</li>
          </ul>
        </div>

        <h2>ワークスペースの作成</h2>
        <p>プロジェクトを保存するフォルダになるものです</p>
        <p>アルファベットと数字で好きな名前をつけてね（初期のままでも大丈夫）</p>

        <h2>ログイン</h2>
        <h3>バージョン1.17.0以降の場合</h3>
        <p>上のメニューのHelp → STM32Cube updates → connectionMySTを選択しログインしよう</p>

        <h3>バージョン1.16.1以前の場合</h3>
        <p>上のメニューのMySTを選択しログインしよう</p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Setup/02_Project/Login.png" alt="Login" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>プロジェクトの作成</h2>
        <p>手順が多そうに見えるけど、意外とすぐに終わるので頑張ってね</p>

        <div className="note">        
          <ul>
            <li>Start new STM32 Projectのボタンか右上のFlie → New → STM32 Projectを押そう</li>
            <li>出てきた画面の左側上の"Board"を選択し、検索ボックスに"F446"と入力しよう</li>
            <li>NUCLEO-F446REを選択し、右下のnextのボタンを押そう</li>
            <li>Project Nameにプロジェクト名を入力して、Targeted LanguageをC++にしよう</li>
            <li>Finishを押してプロジェクトを作成!</li>
          </ul>
        </div>

        <p>ボードの選択（お気に入りをしておくといいかも）</p>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Setup/02_Project/Board.png" alt="Board Selection" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <p>プロジェクトの設定（名前は好きに決めて大丈夫）</p>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Setup/02_Project/Setup.png" alt="Project Setup" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>プロジェクトの設定</h2>
        <p>必要なコードを自動生成してくれる機能の設定です</p>

        <div className="note">        
          <ul>
            <li>(Project名).iocを選択し、Project Managerを開こう</li>
            <li>Code Generatorを選択し、Generate Pripheral・・・のチェックを入れよう</li>
            <li>Ctrl + Sを押して保存しよう</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Setup/02_Project/Setting.png" alt="Settings" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>ファイルの設定</h2>
        <p>ここでは2つのファイルの追加と1つのファイルの加筆を行います</p>
        <p>作業量は多くても基本はコピペなので大丈夫です！</p>

        <div className="note">        
          <ul>
            <li>Core → Inc に"wrapper.hpp"というファイルを作成し、下のコードをコピペしよう</li>
            
            <details>
              <summary>wrapper.hppの中身</summary>
              <pre><code className="language-cpp">{`#ifndef INC_WRAPPER_HPP_
#define INC_WRAPPER_HPP_

#ifdef __cplusplus
extern "C" {
#endif

void init(void);
void loop(void);

#ifdef __cplusplus
};
#endif

#endif /* INC_WRAPPER_HPP_ */`}</code></pre>
            </details>
            
            <li>Core → Srcに"wrapper.cpp"を作成し、下のコードをコピペしよう</li>
            
            <details>
              <summary>wrapper.cppの中身</summary>
              <pre><code className="language-cpp">{`#include "wrapper.hpp"

void init(){

//起動時に1度だけ実行される

}
void loop(){

//一度の実行が終了後、無限に繰り返される

}`}</code></pre>
            </details>
            
            <li>Core → Srcに"main.c"の中身を書き足そう</li>

            <details>
              <summary>main.c書き換えの中身</summary>
              <p>・25行目付近(#include "wrapper.hpp"の追加)</p>
              <pre><code className="language-cpp">{`/* USER CODE BEGIN Includes */
#include "wrapper.hpp"
/* USER CODE END Includes */`}</code></pre>

              <p>・97行目付近(init();とloop();の追加)</p>
              <pre><code className="language-cpp">{`    /* USER CODE BEGIN 2 */
    init();
    /* USER CODE END 2 */

    /* Infinite loop */
    /* USER CODE BEGIN WHILE */
    while (1)
    {
      /* USER CODE END WHILE */

      /* USER CODE BEGIN 3 */
        loop();
    }
    /* USER CODE END 3 */`}</code></pre>
            </details>
          </ul>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src="/src/components/Documents/Setup/02_Project/Flie.png" alt="File Structure" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        <h2>終わりに</h2>
        <p>今回の説明したプロジェクト作成の作業は、毎回やることになるので忘れちゃったら見返してね</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={2} label="導入編2" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/setup/01"><h3>・前のページ</h3></a>
        <a href="/basic/01"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Setup02Project;
