# tweet-synchron

Firebase Hosting で SPA を公開する。

## ローカルでの起動方法

- 各種クレデンシャル情報の設定

  ```sh
  export GEMINI_API_KEY=(Your Gemini API Key)
  echo "GEMINI_API_KEY=$GEMINI_API_KEY" >> functions/.env

  export TWITTER_API_KEY=(Your Twitter API Key)
  export TWITTER_API_SECRET_KEY=(Your Twitter API Secret Key)
  export TWITTER_ACCESS_TOKEN=(Your Twitter Access Token)
  export TWITTER_ACCESS_TOKEN_SECRET=(Your Twitter Access Token Secret)
  echo "TWITTER_API_KEY=$TWITTER_API_KEY" >> functions/.env
  echo "TWITTER_API_SECRET_KEY=$TWITTER_API_SECRET_KEY" >> functions/.env
  echo "TWITTER_ACCESS_TOKEN=$TWITTER_ACCESS_TOKEN" >> functions/.env
  echo "TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET" >> functions/.env
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
