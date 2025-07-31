import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Dev02ClassBasic() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        
        <h3>STM32資料 発展編2</h3>
        <h1>クラスを使ってみよう</h1>

        <p>発展編の目標である、センサーのライブラリ作成に不可欠なクラスという概念を勉強してみよう</p>

        <p>たくさんコードを書いてる人でも難しい部分があるので、こんな感じでやるんだな程度の理解で大丈夫</p>

        <h2>クラスとは</h2>

        <h3>構造体との違い</h3>

        <p>C++ではクラスは構造体とよく似ていて、<strong>初期のアクセス権がprivateな構造体</strong>である</p>

        <p>しかし、一般的には用途によって使い分けられていることが多く</p>

        <li><strong>構造体</strong>・・・データをまとめて管理する用途</li>
        <li><strong>クラス</strong>・・・複雑な機能を持つ集合体を管理する用途</li>

        <p>応用編で扱ったセンサーで例をあげると</p>

        <li><strong>センサーから取得したデータ・・・構造体</strong></li>
        <li><strong>データを取得するプログラム・・・クラス</strong></li>

        <p>のような使い分けになることが多い</p>

        <h2>ファイル構成</h2>

        <p>クラスを使うときは、<strong>ヘッダーファイル(.hpp)</strong>と<strong>ソースファイル(.cpp)</strong>の2つのファイルを作成する</p>
        <pre><code className="language-cpp">{`//2つのファイルを作成する
(ClassName).hpp
(ClassName).cpp`}</code></pre>        
        <p>ヘッダーファイルには、<strong>クラスの定義やメンバー変数、メンバー関数の宣言</strong>を記述する</p>
        <p>ソースファイルには、ヘッダーファイルで<strong>宣言したメンバ関数の中身</strong>を記述する</p>
        <p>このように分けることで、他のファイルからはヘッダーファイルをインクルードするだけで使用できるようになる</p>
        <pre><code className="language-cpp">{`//使うときはヘッダーファイルのみをインクルード
#include (ClassName).h`}</code></pre>     

        <p>中身が少ない場合は1つのファイルにまとめることもあるが、基本は2つに分けよう</p>

        <h2>ヘッダーファイル(.hpp)の書き方</h2>

        <p>ヘッダーファイルでは、クラスの宣言をおこなう</p>

        <p>publicはインクルードした時に使用者が使う部分になるので、わかりやすい命名を心がけよう</p>

        <p><strong>使用者は基本的に関数のみを使って操作し、その関数が変数を動かして中身の処理をする</strong>ので、</p>

        <p>publicに関数、privateに変数という書き方になることが多い（やりたいことによって例外あり）</p>

        <p>(GetSensorData()のようなわかりやすい名前だと使うとき嬉しいね)</p>
        <pre><code className="language-cpp">{`class ClassName{

    public:
            
        //Class名と同じ名前でなければOK（次回説明）
        void Function();
                
    private:
                
        //変数型はなんでもOK
        int value = 0;
};`}</code></pre>        
        
        <h2>ソースファイル(.cpp)の書き方</h2>

        <p>ClassName内の関数を実装する</p>

        <p>実装するときは(Class名)::(関数名)というように書く必要がある</p>

        <p>"::"をスコープ演算子といって、このクラスの中の関数のことだよという意味を示している</p>

        <p>また、メンバー変数はこの関数内では自由に使用することができる</p>

        <p>ある関数で値1を10倍して、ほかの関数で値1を1/2にするなど関数をまたいだ処理ができる</p>

        <p>(同じ名前で同じ型の変数は共通なので、この2つの関数を実行すると値1が元の5倍になる)</p>

        <pre><code className="language-cpp">{`#include "ClassName.h"

ClassName::Function(){
            
    //ここに関数の処理を書く
            
}`}</code></pre>

        <h2>クラスの呼び出し</h2>

        <p>クラスは構造体と同じで、クラス名 変数のような宣言をすることで実際に使えるようになる</p>

        <p>例えば応用編で使ったセンサーであるICM45686のクラス"ICM45686"を作ったとしよう</p>

        <p>その場合はこのように変数名のようなものをつけることで使えるようになる</p>

        <p>クラスではこの動作を<strong>インスタンス化</strong>と呼ぶ</p>

        <pre><code className="language-cpp">{`ICM45686 icm; //ICM4568クラスのインスタンスを作成`}</code></pre>

        <p>このようにして作ったインスタンスは、構造体と同じように中身を使うことができる</p>
        <p>例えば、ICM45686クラスのメンバ関数である"GetSensorData()"を使う場合はこのように書く</p>

        <pre><code className="language-cpp">{`icm.GetSensorData()`}</code></pre>

        <p>また同じセンサーを複数使う場合は</p>

        <pre><code className="language-cpp">{`ICM45686 icm1; //それぞれ中身の変数は独立に管理される
ICM45686 icm2;
ICM45686 icm3;`}</code></pre>

        <p>のように複数のインスタンスを作成でき、それぞれを別の設定で好きなタイミングで実行できる</p>

        <h2>コンストラクタ</h2>

        <p>クラスで便利な機能の1つにコンストラクタがある</p>

        <p>これは、インスタンス化する時に1度だけ実行されるものである</p>

        <p>今回は、STM32のどのピンを使っているかの情報を渡すのに利用する例を実際に紹介する</p>

        <h3>コンストラクタの定義</h3>

        <p>コンストラクタは<strong>クラス名と同じ名前の関数</strong>を作成することで定義できる</p>

        <p>普通の関数と同じように引数を渡すことができるので、ここではI2CのPin情報を持つ"I2C_HandleTypeDef*"を引数にした</p>

        <p>また、Pin情報を保存したいので同じ型のメンバー変数を定義した</p>

        <pre><code className="language-cpp">{`class ICM45686{

public:
ICM45686(I2C_HandleTypeDef* use_i2c_pin); //コンストラクタの定義
void GetSensorData(); //メンバ関数の宣言
    
private:
I2C_HandleTypeDef* i2c_pin; //I2Cのピン情報を格納するメンバ変数
}`}</code></pre>       

        <h3>コンストラクタの実装</h3>

        <p>コンストラクタもほかの関数と同じように実装できる</p>

        <p>ここでは、引数で受け取った値をメンバー変数に格納している</p>
        <pre><code className="language-cpp">{`#include "ICM45686.hpp" //ヘッダーファイルをインクルード

ICM45686(I2C_HandleTypeDef* use_i2c_pin){ //コンストラクタの実装

i2c_pin = use_i2c_pin; //引数で渡されたI2Cのピン情報をメンバ変数に格納
}

//実際にI2Cの関数を使うときは
//第1引数にi2c_pinを渡すことで、インスタンス化したときに渡したI2Cのピン情報を使うことができる
//例: HAL_I2C_Mem_Write(i2c_pin, address, reg_address, 1, buffer, len, 1);`}</code></pre>         

        <p>このようにすることで、インスタンス化する時にI2Cのピン情報を渡すことができる</p>
        <p>先ほどの例を使うと、異なるI2Cのピンにセンサーをそれぞれつなげるようになる</p>

        <p>これによって汎用性が上がるだけでなく、急な仕様変更にも対応しやすくなる</p>

        <pre><code className="language-cpp">{`ICM45686 icm1(&hi2c1); 
ICM45686 icm2(&hi2c2);
ICM45686 icm3(&hi2c3);`}</code></pre>

        <h2>終わりに</h2>

        <p>今回はクラスについて説明してみました</p>
        <p>クラスはかなり難しい部分が多いので、実際に書きながら慣れていこう</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={37} label="発展編2" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/dev/01"><h3>・前のページ</h3></a>
        <a href="/dev/03"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Dev02ClassBasic;
