// グローバル設定
const SPREADSHEET_ID = "1sqluO_fV4ByGaWXie0JjRSUO7B-f4OsDjHqmLoaXySE"; // 実際のスプレッドシートIDに変更してください

function doGet(e) {
  try {
    
    let action = e.parameter.action;
    
    if (action === "login") {

      // ログイン認証に必要なパラメータを取得
      let id = e.parameter.id;
      let password = e.parameter.password;
      return handleLogin(id, password);
    } 
    else if( action === "state_update") {

      // 作業更新に必要なパラメータを取得
      let name = e.parameter.name;
      let number = e.parameter.number;
      let id = e.parameter.id;
      let password = e.parameter.password;
      
      // まず認証を実行
      let authResult = handleLogin(id, password);
      let authData = JSON.parse(authResult.getContent());
      
      if (!authData.success) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "認証に失敗しました: " + authData.error
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // 認証成功後、作業更新を実行
      return handleUpdate(name, number);
    }
    else if (action === "get_progress") {
      
      // 進捗取得に必要なパラメータを取得
      let id = e.parameter.id;
      let password = e.parameter.password;
      
      // まず認証を実行
      let authResult = handleLogin(id, password);
      let authData = JSON.parse(authResult.getContent());
      
      if (!authData.success) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "認証に失敗しました: " + authData.error
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      // 認証成功後、進捗データを取得
      return handleGetProgress(id);
    }
    
  } 
  catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: "エラーが発生しました: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 作業更新を処理する関数
function handleUpdate(name, number) {
  // パラメータのチェック
  if (!name || !number) {
    return ContentService.createTextOutput(JSON.stringify({
      error: "nameとnumberパラメータが必要です"
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    // スプレッドシートを開く
    let spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getActiveSheet();
    
    // データの範囲を取得（1行目はヘッダー）
    let dataRange = sheet.getDataRange();
    let values = dataRange.getValues();
    
    // nameが一致する行を検索
    let nameColumnIndex = 0; // A列（name列）
    let lastUpdateColumnIndex = 1; // B列（最終更新列）
    let targetRowIndex = -1;
    
    for (let i = 1; i < values.length; i++) { // 1から始める（ヘッダーをスキップ）
      if (values[i][nameColumnIndex] === name) {
        targetRowIndex = i;
        break;
      }
    }
    
    // 一致する名前が見つからない場合
    if (targetRowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        error: `名前 "${name}" が見つかりませんでした`
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 現在のタイムスタンプを取得
    let timestamp = new Date();
    
    // 最終更新列を更新（B列）
    sheet.getRange(targetRowIndex + 1, lastUpdateColumnIndex + 1).setValue(timestamp);
    
    // number列を1に更新（C列以降の数字列から該当する列を探す）
    // numberはitemMappingのインデックス番号（0-based）として扱い、handleGetProgressと同じ計算を使用
    let itemIndex = parseInt(number); // CompleteButtonから渡されるitemNumber
    let numberColumnIndex = itemIndex + 2; // C列から開始なので+2（handleGetProgressと同じ計算）
    if (itemIndex >= 0 && itemIndex < 55) { // 0〜54の範囲チェック（itemMappingの範囲）
      sheet.getRange(targetRowIndex + 1, numberColumnIndex + 1).setValue(1);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        error: "itemNumberは0〜54の範囲で指定してください"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 成功レスポンス
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: `名前 "${name}" の ${number} 列を1に更新し、最終更新時刻を設定しました`,
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: "作業更新エラー: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 進捗取得を処理する関数
function handleGetProgress(userId) {
  try {
    // スプレッドシートを開く
    let spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getActiveSheet();
    
    // データの範囲を取得
    let dataRange = sheet.getDataRange();
    let values = dataRange.getValues();
    
    // userIdが一致する行を検索
    let nameColumnIndex = 0; // A列（name列）
    let targetRowIndex = -1;
    
    for (let i = 1; i < values.length; i++) { // 1から始める（ヘッダーをスキップ）
      if (values[i][nameColumnIndex] === userId) {
        targetRowIndex = i;
        break;
      }
    }
    
    // 一致するユーザーが見つからない場合
    if (targetRowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: `ユーザー "${userId}" が見つかりませんでした`
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 進捗データを構築（MainPageのitemIdに対応）
    let progressData = {};
    let userRow = values[targetRowIndex];
    
    // 項目IDと列のマッピング（C列=2から開始、1が完了、それ以外は未完了）
    let itemMapping = [
      // Setup 1-5 (C-G列, インデックス2-6)
      'setup_01', 'setup_02', 'setup_03', 'setup_04', 'setup_05',
      
      // Basic 1-10 (H-Q列, インデックス7-16) 
      'basic_01', 'basic_02', 'basic_03', 'basic_04', 'basic_05',
      'basic_06', 'basic_07', 'basic_08', 'basic_09', 'basic_10',
      
      // Advance 1-10 (R-AA列, インデックス17-26)
      'advance_01', 'advance_02', 'advance_03', 'advance_04', 'advance_05',
      'advance_06', 'advance_07', 'advance_08', 'advance_09', 'advance_10',
      
      // Supplement 1-10 (AB-AK列, インデックス27-36)
      'supplement_01', 'supplement_02', 'supplement_03', 'supplement_04', 'supplement_05',
      'supplement_06', 'supplement_07', 'supplement_08', 'supplement_09', 'supplement_10',
      
      // Dev 1-10 (AL-AU列, インデックス37-46)
      'dev_01', 'dev_02', 'dev_03', 'dev_04', 'dev_05',
      'dev_06', 'dev_07', 'dev_08', 'dev_09', 'dev_10',
      
      // Task 1-10 (AV-BE列, インデックス47-56)
      'task_01', 'task_02', 'task_03', 'task_04', 'task_05',
      'task_06', 'task_07', 'task_08', 'task_09', 'task_10'
    ];
    
    // 各項目の進捗状態をチェック
    for (let i = 0; i < itemMapping.length; i++) {
      let columnIndex = i + 2; // C列から開始なので+2
      let itemId = itemMapping[i];
      
      // 列の値が1なら完了、それ以外は未完了
      if (columnIndex < userRow.length) {
        progressData[itemId] = (userRow[columnIndex] === 1);
      } else {
        progressData[itemId] = false;
      }
    }
    
    // 成功レスポンス
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      progress: progressData,
      userId: userId,
      message: "進捗データを取得しました"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "進捗取得エラー: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ログイン認証を処理する関数
function handleLogin(id, password) {
  if (!id || !password) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "IDとパスワードが必要です"
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    // スプレッドシートを開く
    let spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Loginシートを取得（存在しない場合は作成）
    let loginSheet;
    try {
      loginSheet = spreadsheet.getSheetByName("Login");
    } catch (e) {
      // Loginシートが存在しない場合は作成
      loginSheet = spreadsheet.insertSheet("Login");
      // ヘッダーを設定
      loginSheet.getRange(1, 1).setValue("ID");
      loginSheet.getRange(1, 2).setValue("Pass");
    }
    
    // ログインデータを取得
    let loginData = loginSheet.getDataRange().getValues();
    
    // ID列とPass列を検索（1行目はヘッダー）
    for (let i = 1; i < loginData.length; i++) {
      let storedId = loginData[i][0]; // A列（ID）
      let storedPassword = loginData[i][1]; // B列（Pass）
      
      // IDとパスワードが一致するかチェック
      if (String(storedId).toLowerCase().trim() === String(id).toLowerCase().trim() && 
    String(storedPassword).trim() === String(password).trim()){
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: "ログイン成功",
          userId: id
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // 一致するユーザーが見つからない場合
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "IDまたはパスワードが間違っています"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "認証エラー: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
