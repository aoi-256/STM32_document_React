import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Dev01Struct() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        
        <h3>STM32資料 発展編1</h3>
        <h1>構造体を使ってみよう</h1>

        <p>発展編では、センサーのライブラリ作成を目標にしてもらいます</p>

        <p>そのためには、クラスという複雑な概念を少し理解してプログラムに組み込まなくてはなりません</p>

        <p>そこで、クラスの簡易版的なものである構造体から学んでみましょう</p>

        <h2>構造体とは</h2>

        <p>構造体は、複数の変数をまとめて保管できる型です</p>

        <p>具体例を見たほうがわかりやすいので、id、位置、速度、加速度のデータをまとめる<strong>Data</strong>という構造体を作ってみます</p>

        <h3>構造体の定義</h3>

        <pre><code className="language-cpp">{`struct Data{

    //どんな変数型でも定義可能
    uint8_t axis = "x"; //軸
    uint32_t time = 0; //測定時間
    float potision = 0.0; //位置
    float velocity = 0.0; //速度
    float acceleration = 0.0; //加速度
};`}</code></pre>

        <p>このように、構造体を使うことで変数をまとめて扱うことができる</p>

        <p>構造体の中に含まれている変数を<strong>メンバー変数</strong>というので覚えておこう</p>

        <h3>構造体の使い方</h3>

        <p>構造体は、intやfloatのような変数型と同じように扱われるため、変数を宣言する必要がある</p>

        <p>少しややこしい書き方ですが、<strong>Data型のdataという変数</strong>をこのように作成できる</p>

        <pre><code className="language-cpp">{`Data data; //構造体の変数を作成`}</code></pre>

        <p>そして、メンバー変数へアクセスするために、構造体の変数名の後に<strong>.(ドット)</strong>をつけて</p>

        <p><strong>構造体変数名.メンバー変数名</strong>と書く</p>

        <pre><code className="language-cpp">{`data.axis = "y"; //メンバー変数のaxisにyを代入
data.time = 100; //メンバー変数のtimeに100を代入
data.potision = 1.5; //メンバー変数のpotisionに1.5を代入
data.velocity = 3.2; //メンバー変数のvelocityに3.2を代入
data.acceleration = -1.2; //メンバー変数のaccelerationに-1.2を代入`}</code></pre>

        <p>これで、複数の変数をまとめて取り扱うことができる</p>

        <h2>構造体の配列</h2>

        <p>構造体も普通の変数と同じように配列にすることもできる</p>

        <pre><code className="language-cpp">{`Data data[3]; //構造体の配列を作成

//配列の使い方も普通の配列と同じ
data[0].axis = "x";
data[1].axis = "y";
data[2].axis = "z";`}</code></pre>

        <p>これで、複数のデータを管理することができるようになる</p>

        <h2>構造体のポインタ</h2>

        <p>構造体もポインタ型で保存することができる</p>

        <pre><code className="language-cpp">{`Data *data; //ポインタ型での構造体の宣言

//ポインタを使って構造体のメンバー変数へアクセスする場合は.(ドット)でなく->(アロー)を使う
data->axis = "x";
data->time = 100;
data->potision = 1.5;`}</code></pre>

        <p>ポインタの場合は少し書き方が変わるので注意しよう</p>

        <h2>構造体内に関数を入れる</h2>

        <p>構造体の中には、変数だけでなく関数も入れることができる</p>

        <p>構造体に含まれている関数を<strong>メンバー関数</strong>と呼ぶ</p>

        <p>そうすることで、構造体と関連のある操作をまとめることができる</p>

        <pre><code className="language-cpp">{`struct Data{

    uint8_t axis = "x"; //軸
    uint32_t time = 0; //測定時間
    float potision = 0.0; //位置
    float velocity = 0.0; //速度
    float acceleration = 0.0; //加速度

    //メンバー関数
    void Print(){

        printf("axis:%s time:%ld potision:%f velocity:%f acceleration:%f", axis, time, potision, velocity, acceleration);
    }
};`}</code></pre>

        <p>メンバー関数の使い方もメンバー変数と同じように<strong>.(ドット)</strong>を使ってアクセスできる</p>

        <pre><code className="language-cpp">{`Data data;

data.axis = "x";
//他の設定...

data.Print(); //メンバー変数を呼び出し`}</code></pre>

        <h2>アクセス権の指定</h2>

        <p>構造体には、外部からアクセスできる変数や関数を制限する機能がある</p>

        <p>この機能により、<strong>重要な変数へのアクセスを制限し、安全にプログラムを実行することができる</strong></p>

        <h3>public</h3>

        <p><strong>public:</strong>と書くことで、それより下で宣言された変数や関数は外部からアクセスできるようになる</p>

        <p>構造体では省略すると<strong>public</strong>になる</p>

        <h3>private</h3>

        <p><strong>private:</strong>と書くことで、それより下で宣言された変数や関数は外部からアクセスできなくなる</p>

        <p>ここで、0.0-1.0の範囲にしか値を入れたくないpotisionという変数を考えてみる</p>

        <p>potisionは外部からアクセスできないため、外部から値を取得するための</p>

        <p>GetPotision()関数も作成した</p>
        
        <pre><code className="language-cpp">{`struct Data{

    float velocity = 0.0; //速度
    float acceleration = 0.0; //加速度
            
    //Positonに値を代入
    void SetPotision(float Value){

        //値が範囲外のとき
        if(Value > 1.0 || Value < 0.0){
            
            //エラー
        }
        //値が範囲内のとき
        else{
        
            potision = Value; //値を代入   
        }
    }

    //Positonから値を取得
    float GetPotision(){
        return potision; //値を取得
    }

    private:

        float potision = 0.0; //位置
};`}</code></pre>

        <p>一見コードが長くなってわかりにくくなったように感じるかもしれないが、</p>
        <p>大きなプロジェクトでは、このアクセス権管理が安全性や管理のしやすさの向上のため大切な考え方になってくる</p>

        <h3>補足</h3>
        <p><strong>今回は説明のためにアクセス権を指定したが、今回の構造体であればアクセス権を定義しないで使っても全く問題はないので</strong></p>
        <p><strong>GetやSetの関数を書くことにこだわる必要はそんなにない</strong></p>

        <p>使う側が確認しなかったり、デバッグをせずに壊れる可能性がある使い方をするほうがよっぽど大問題</p>
        
        <h2>終わりに</h2>
        <p>今回は構造体について説明してみました</p>
        <p>次回以降の説明で大切になる要素を説明したので、わからなくなってしまったら見返してみてね</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={36} label="発展編1" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/dev/02"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Dev01Struct;
