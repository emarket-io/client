SERVICE=pwa
IMG_HUB?=docker.io/jmzwcn
TAG?=${shell date "+%Y%m%d-%H%M"}

clean:
	rm -rf www
#	-cp resources/sign/* platforms/android

build:clean
	ionic build --prod

push:build
	docker build -t $(IMG_HUB)/$(SERVICE):$(TAG) .
	docker push $(IMG_HUB)/$(SERVICE):$(TAG)

resource:
	ionic cordova resources android