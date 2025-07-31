import { useState } from 'react';

interface CompleteButtonProps {
  itemNumber: number; // GASで使用する項目番号（1-55）
  label: string; // ボタンに表示するテキスト
}

function CompleteButton({ itemNumber, label }: CompleteButtonProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState("");

  // GASのURL
  const gasUrl = "https://script.google.com/macros/s/AKfycbxhwRIE8b0BgwJiHynETd-1om3Wq_4wpw7d8laSaYG0E_wzwUr16yece2hOtuiiRdwM/exec";

  const handleComplete = async () => {
    // ログイン情報の確認
    const userId = localStorage.getItem("userId");
    const userPassword = localStorage.getItem("userPassword");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!userId || !userPassword || isLoggedIn !== "true") {
      setMessage("ログインが必要です");
      return;
    }

    setIsCompleting(true);
    setMessage("");

    try {
      const updateUrl = `${gasUrl}?action=state_update&name=${encodeURIComponent(userId)}&number=${itemNumber}&id=${encodeURIComponent(userId)}&password=${encodeURIComponent(userPassword)}`;
      
      const response = await fetch(updateUrl);
      const result = await response.json();

      if (result.success) {
        setIsCompleted(true);
        setMessage("完了しました！");
        
        // 3秒後にメッセージをクリア
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage(`エラー: ${result.error}`);
      }
    } catch (error) {
      console.error("完了処理エラー:", error);
      setMessage("通信エラーが発生しました");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div style={{ 
      margin: '20px 0', 
      padding: '15px', 
      border: '2px solid #464647', 
      borderRadius: '8px',
      backgroundColor: '#2d2d30',
      color: '#cccccc',
      textAlign: 'center'
    }}>
      <button
        onClick={handleComplete}
        disabled={isCompleting || isCompleted}
        style={{
          backgroundColor: isCompleted ? '#4ec9b0' : '#4fc1ff',
          color: '#000000',
          border: '1px solid #464647',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isCompleting || isCompleted ? 'not-allowed' : 'pointer',
          opacity: isCompleting ? 0.6 : 1,
          minWidth: '200px'
        }}
      >
        {isCompleting ? '処理中...' : isCompleted ? '✓ 完了済み' : `${label}を完了する`}
      </button>
      
      {message && (
        <div style={{
          marginTop: '10px',
          padding: '8px',
          borderRadius: '4px',
          backgroundColor: message.includes('エラー') ? '#2d1b1b' : '#0e2f21',
          color: message.includes('エラー') ? '#f85149' : '#4ec9b0',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default CompleteButton;
