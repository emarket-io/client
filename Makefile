clean:
	rm -rf www
	-cp resources/sign/* platforms/android

build:clean
	ionic cordova build android

prod:clean
	ionic cordova build android --prod

release:clean
	ionic cordova build android --prod --release

resource:
	ionic cordova resources android