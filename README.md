# 一般常識クイズアプリ

## 概要

Next.js、TypeScript、Firebaseで開発した一般常識を学べるクイズアプリケーションです。

🔗 **デモ**: [https://quiz20-a466c.web.app/](https://quiz20-a466c.web.app/)

### 主な機能

- 一般常識クイズ(20問)
- 時事問題から一般教養まで幅広い出題
- 制限時間なし・いつでも中断可能
- リアルタイムの採点・フィードバック 
- 解説表示
- スコアの保存と順位表示
- レスポンシブ対応

## 使用技術

### フロントエンド
- Next.js 15.1.0
- TypeScript 5.7.2
- React 19.0.0
- TailwindCSS 3.4.1

### バックエンド
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

## 工夫した点

- スムーズなアニメーションとUI/UX
- 解説による学習効果の向上
- TypeScriptによる型安全性の確保
- コンポーネントの再利用性を考慮した設計

## 今後の展望

- クイズカテゴリーの追加
- SNSシェア機能
- プログレス保存機能
- オフライン対応

## セットアップ

```bash
# リポジトリのクローン
git clone [リポジトリURL]

# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000)でアプリケーションが起動します。

## 環境変数の設定

`.env.local`ファイルをプロジェクトルートに作成し、以下の環境変数を設定してください：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_keyd
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## デプロイ

```bash
# ビルドとデプロイ
npm run deploy
```

Firebase Hostingへ自動的にデプロイされます。
