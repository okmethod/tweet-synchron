deploy-app:
	export VITE_API_PROXY_TARGET=https://api-ydkdbw5xia-an.a.run.app
	cd skeleton-app && VITE_API_PROXY_TARGET=${VITE_API_PROXY_TARGET} npm run build
	firebase deploy --only hosting

deploy-functions-api:
	NODE_ENV=production firebase deploy --only functions:api

deploy-functions-scheduled:
	NODE_ENV=production firebase deploy --only functions:scheduled

deploy:
	make deploy-functions-api
	make deploy-app
