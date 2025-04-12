# tweet-synchron

Firebase Hosting で SPA を公開する。

## ローカルでの起動方法

- 各種クレデンシャル情報の設定

  ```ini
  # functions-api/.env

  export GEMINI_API_KEY=(sensitive)

  export TWITTER_API_KEY=(sensitive)
  export TWITTER_API_SECRET_KEY=(sensitive)
  export TWITTER_ACCESS_TOKEN=(sensitive)
  export TWITTER_ACCESS_TOKEN_SECRET=(sensitive)
  ```

  ```ini
  # functions-scheduled/.env

  API_BASE_URL=https://api-ydkdbw5xia-an.a.run.app
  LOCAL_API_BASE_URL=http://functions-api:3000
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

  # APIのみ
  make deploy-functions-api

  # 定期実行スクリプトのみ
  make deploy-functions-scheduled

  # まとめて
  make deploy
  ```

- ブラウザでアクセス

  https://okmethod-tweet-synchron.web.app/
