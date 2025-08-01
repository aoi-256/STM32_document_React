import CompleteButton from '../../../CompleteButton';
import '../../../Format.css';

function Dev04ClassAdvance() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <main>
        
        <h3>STM32資料 発展編4</h3>
        <h1>便利な機能や書き方を使ってみよう</h1>

        <p>前回までの説明でクラスをかけるようになった</p>

        <p>クラスやライブラリを作成すると、自分以外の人が使う機会も増えるので</p>

        <p>読みやすさ（可読性）と使いやすさ（汎用性）の高いコードをかけるようになりたい</p>

        <p>そこで今回は、クラスで使える便利な機能たちを紹介します!</p>

        <h2>列挙型(enum)</h2>

        <p>クラスを作成することで、使用者は内部の処理を知らなくても動かすことができるようになった</p>

        <p>しかし、修正することもあるので内部の処理も分かりやすく書いた方がよい</p>

        <p>前回のクラスで書いたWIAの関数では"0x72"が急に出てきてなんのことかよくわからない</p>

        <p>そこで、WIAレジスタのアドレスであることを列挙型(enum)を使って分かりやすく書いてみよう</p>

        <pre><code className="language-cpp">{`//WIAを取得する関数
uint8_t ICM45686::WIA(){
        
    uint8_t read_value = 0; //WIAの値を格納する変数
        
    //0x72 という値のみが急に出てくるコードになる 
    Read(0x72, &read_value, 1);
        
    //WIAの値が正しいか確認する
    if(read_value != 0xE9){
        
        return 1; //正しくない場合は1を返す
    }
        
    return 0; //正しい場合は0を返す
}`}</code></pre>

        <h3>列挙型(enum)の定義</h3>

        <p>列挙型はこのように書くことができる</p>

        <p>変数名と値を1対1対応で書いていくことができる</p>

        <p>また、変数型をあらかじめ決めることができ、入力ミスにはコンパイルエラーを出してくれる </p>

        <pre><code className="language-cpp">{`//レジスタアドレスの列挙型
enum class REGISTER: uint8_t{
    
    ACCEL_DATA_X = 0x00,
    PWR_MGMT_0 = 0x0f,
    WIA = 0x72
};`}</code></pre>

        <p>実際に使用する際にはuint8_t型に明示的に変換した上で、REGISTERの中のWIAの値を使用すればよい</p>

        <pre><code className="language-cpp">{`//WIAを取得する関数
uint8_t ICM45686::WIA(){
            
    uint8_t read_value = 0; //WIAの値を格納する変数
            
    //WIAレジスタであることがわかりやすい 
    Read((uint8_t)ICM45686::REGISTER::WIA, &read_value, 1);
            
    //WIAの値が正しいか確認する
    if(read_value != 0xE9){
            
        return 1; //正しくない場合は1を返す
    }
            
    return 0; //正しい場合は0を返す
}`}</code></pre>

        <p>このように書くことで、引数が示していることを明確にすることができた</p>

        <p>実際にセンサーのライブラリを書く時には、この後説明する理由でヘッダーファイルのpublicに定義することが多い</p>

        <h2>クラスの継承について</h2>

        <p>クラスの継承は、すでにあるクラスに追加の機能を乗せた新しいクラスを作ることである</p>

        <p>このように聞くと最初から1つにまとめればいい気がするが、通信形式をI2CとSPIから選びたい場合など</p>

        <p>特定の部分（通信形式）のみが違い、他の部分（レジスタアドレスや操作）が共通の場合にとても役に立つ</p>

        <p>このような場合、共通部分のみを実装するクラス（親クラス）を作成し、異なる部分のみを実装するクラス（子クラス）で</p>

        <p>継承をすることで、子クラスを付け替える（インクルードで選べる）だけ通信形式を変更できる</p>

        <h3>継承のやり方</h3>

        <p>継承自体はとても簡単で、クラスを作成するときに継承したいクラス名を書くだけでよい</p>

        <p>ここでもpublicかprivateか選ぶことができるが、これは子クラスから親クラスへのアクセス制限の設定になっている</p>

        <p>publicにすると親クラスのメンバ変数や関数にアクセスできるようになる</p>

        <p>privateにすると親クラスのメンバ変数にアクセスできなくなる</p>

        <pre><code className="language-cpp">{`//子クラスの作成
class ICM45686_I2C: public ICM45686{
                        
    //あとはいつも通り

}`}</code></pre>

        <h2>仮想関数</h2>

        <p>ここからは、仮想関数を使って通信形式を簡単に変える方法を紹介する</p>

        <p>仮想関数は、関数の宣言のみをしておき後から実装をするというものである</p>

        <p>前回は、ヘッダーファイルで通信関数の定義をして、同じクラスのソースファイルですぐに実装をした</p>

        <p>仮想環境を使うことで、ヘッダーファイルで通信関数の定義をするが、継承した別のクラスでその中身を実装することができる</p>

        <h3>前回の関数宣言</h3>
        <pre><code className="language-cpp">{`//通信用の関数の定義

//書き込みと読み取りの関数
void Read(uint8_t reg, uint8_t* rx_buffer, uint8_t len); //Read関数の宣言
void Write(uint8_t reg, uint8_t* tx_buffer, uint8_t len); //Write関数の宣言`}</code></pre>

        <h3>仮想環境の関数宣言</h3>

        <p>仮想関数を定義するときはvirtualを先頭につける</p>

        <p>また、= 0をつけておくことで、実装を忘れたまま実行しようとした時にエラーがでるようになる</p>
        <pre><code className="language-cpp">{`//通信用の関数の定義

//書き込みと読み取りの関数
virtual void Read(uint8_t reg, uint8_t* rx_buffer, uint8_t len) = 0; //Read関数の宣言
virtual void Write(uint8_t reg, uint8_t* tx_buffer, uint8_t len) = 0; //Write関数の宣言`}</code></pre>

        <p>子クラスで実装するときは、これと同じ名前の関数を定義し、実装すると自動で上書き（オーバーライド）してくれる</p>
        <p>この時、引数は同じでなくてはいけない</p>
        
        <p>前回のクラスにRead/Write関数を作ってあるので、それを置き換えるだけで仮想関数の実装ができる（次回やります）</p>

        {/* 完了ボタン */}
        <CompleteButton itemNumber={39} label="発展編4" />

        <h2>リンク</h2>
        <a href="/home"><h3>・メインページ</h3></a>
        <a href="/dev/03"><h3>・前のページ</h3></a>
        <a href="/dev/05"><h3>・次のページ</h3></a>
      </main>

      <footer>
        <p>&copy; 2025 東京農工大学 航空研究会</p>
      </footer>
    </div>
  );
}

export default Dev04ClassAdvance;
