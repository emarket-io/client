clean:
	rm -rf www

build:clean
	ionic cordova build android

prod:clean
	ionic cordova build android --prod

release:clean
	ionic cordova build android --prod --release