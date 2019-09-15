
prod:
	rm -rf www
	ionic cordova build android --prod

release:
	rm -rf www
	ionic cordova build android --prod --release