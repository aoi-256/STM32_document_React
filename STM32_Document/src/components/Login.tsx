import React, {useState} from "react"; 
import { useNavigate } from "react-router-dom";

function Login() {

    // 使用する変数の宣言
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ用のstate
    const navigate = useNavigate();

    // UserIDを取得して変数に保存
    function handleUserIdChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserId(event.target.value);
        setErrorMessage(""); // 入力時にエラーメッセージをクリア
    }

    // UserPasswordを取得して変数に保存
    function handleUserPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserPassword(event.target.value);
        setErrorMessage(""); // 入力時にエラーメッセージをクリア
    }

    // GASを使ったログイン判定
    async function handleLogin() {
        
        // ローディング状態にする
        setIsLoading(true);

        // ログイン開始時にエラーメッセージをクリア
        setErrorMessage(""); 

        const gasUrl = "https://script.google.com/macros/s/AKfycbxhwRIE8b0BgwJiHynETd-1om3Wq_4wpw7d8laSaYG0E_wzwUr16yece2hOtuiiRdwM/exec"
        const url = `${gasUrl}?action=login&id=${encodeURIComponent(userId)}&password=${encodeURIComponent(userPassword)}`

        try{

            // GASにIDとパスワードを送信してログイン判定をする
            const response = await fetch(url);
            const result = await response.json();

            console.log("GASからの応答:", result); // デバッグ用

            // ログイン成功時の処理
            if(result.success) {

                //IDとパスワードをローカルストレージに保存
                localStorage.setItem("userId", userId);
                localStorage.setItem("user", "true");

                navigate('/home'); 
            }
            // ログイン失敗時の処理
            else{

                // エラーメッセージを設定
                setErrorMessage("ログインに失敗しました。IDとパスワードを確認してください。");
            }
        }
        // 通信エラーなどの例外処理
        catch (error) {

            console.error("ネットワークエラー", error);// デバッグ用
            setErrorMessage("ネットワークエラーが発生しました。しばらくしてから再度お試しください。");
        } 
        // ローディングを解除
        finally {

            setIsLoading(false);
        }
    }

    // 画面処理
    let content;
    
    // ログイン中の画面
    if (isLoading) {

        content = <h2>ログイン中 少し待っててね</h2>;
    } 

    // ログイン受付時の画面
    else {
        content = (
            <div>
                <h1>ログイン</h1>
                
                {/* エラーメッセージ表示 */}
                {errorMessage && (
                    <div style={{ 
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '12px',
                        marginBottom: '20px',
                        border: '1px solid #f5c6cb',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}>
                        ⚠️ {errorMessage}
                    </div>
                )}
                
                {/* ID入力フォーム */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    ユーザーID:
                    </label>
                    <input
                    type="text"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="IDを入力"
                    style={{ 
                        width: '100%',
                        padding: '12px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                />
                </div>
            
                {/* パスワード入力フォーム */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    パスワード:
                    </label>
                    <input
                    type="password"
                    value={userPassword}
                    onChange={handleUserPasswordChange}
                    placeholder="パスワードを入力"
                    style={{ 
                        width: '100%',
                        padding: '12px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                />
                </div>

                {/* ログインボタン */}
                <button 
                    onClick={handleLogin}
                    style={{ 
                        width: '100%', 
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    ログイン
                </button>
            </div>
        );
    }

    // 条件ごとの画面を返す（表示）
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            {content}
        </div>
    )
}

export default Login;