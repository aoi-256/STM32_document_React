# STM32 開発資料

作成したSTM32引き続きドキュメントにログインと進捗管理機能を追加しました

## ファイル構造

```
STM32_document_React/
├── GAS/
│   └── code.gs                           # ユーザー認証・進捗管理
├── STM32_Document/
│   ├── src/
│   │   ├── main.tsx                      # アプリエントリーポイント
│   │   ├── App.tsx                       # ルーティング設定
│   │   ├── index.css                     # グローバルスタイル
│   │   └── components/
│   │       ├── Home.tsx                  # ホームページ・教材一覧
│   │       ├── Login.tsx                 # ログインページ
│   │       ├── CompleteButton.tsx        # 完了ボタン機能
│   │       ├── Format.css                # 共通スタイル
│   │       └── Documents/
│   │           ├── Setup/                # 導入編（インストール・プロジェクト作成）
│   │           ├── Basic/                # 基礎編（LED・通信・PWM・ADC等）
│   │           ├── Advance/              # 応用編（I2C・SPI通信）
│   │           ├── Dev/                  # 発展編（構造体・クラス設計）
│   │           └── Supplement/           # 補足編（タイマー・printf等）
│   ├── package.json                      # 依存関係
│   └── vite.config.ts                    # ビルド設定
└── README.md                             # プロジェクト説明
```

## 使用言語など

- **フロントエンド**: React + TypeScript + Vite
- **認証**: Google Apps Script
- **スタイル**: CSS（VSCode Dark Modernテーマ）

## ローカル環境で使いたい場合

- このリポジトリをクローン
- [Vite (ヴィート) で1分環境構築【React + TypeScript】](https://zenn.dev/reasemi/articles/6869cebde469aa) のNode.jsの導入までを行う
- ターミナルにcd [プロジェクト名]を入力
- ターミナルで ```npm run dev```を実行
- [指定されたローカルホスト](http://localhost:5173/)にアクセス
- デバック用のユーザ userid: test_user1 pass: 1234
