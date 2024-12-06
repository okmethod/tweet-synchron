deploy-app:
	export VITE_API_PROXY_TARGET=https://api-ydkdbw5xia-an.a.run.app
	cd skeleton-app && VITE_API_PROXY_TARGET=${VITE_API_PROXY_TARGET} npm run build
	firebase deploy --only hosting

deploy-functions:
	firebase deploy --only functions

deploy:
	make deploy-functions
	make deploy-app
