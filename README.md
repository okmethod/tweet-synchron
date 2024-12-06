# tweet-synchron

Firebase Hosting で SPA を公開する。

## ローカルでの起動方法

- 各種クレデンシャル情報の設定

  ```sh
  export GEMINI_API_KEY=(Your API Key)
  echo "GEMINI_API_KEY=$GEMINI_API_KEY" >> functions/.env
  ```

- コンテナ起動

  ```sh
  docker compose up
  ```

- ブラウザでアクセス

  http://localhost:5173/

## インターネットへの公開方法

- firebaseデプロイ

  ```sh
  # 静的アセットのみ
  make deploy-app

  # Functionsのみ
  make deploy-functions

  # まとめて
  make deploy
  ```

- ブラウザでアクセス

  https://okmethod-tweet-synchron.web.app/
