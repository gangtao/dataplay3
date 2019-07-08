BIN_NAME ?= dataplay3
VERSION ?= 0.1-dev
IMAGE_NAME ?= $(BIN_NAME):$(VERSION)
DOCKER_ID_USER ?= naughtytao

docker: Dockerfile
	docker build --no-cache -t $(IMAGE_NAME) .

push:
	docker tag $(IMAGE_NAME) ${DOCKER_ID_USER}/$(BIN_NAME):$(VERSION)
	docker tag $(IMAGE_NAME) ${DOCKER_ID_USER}/$(BIN_NAME):latest
	docker push ${DOCKER_ID_USER}/$(BIN_NAME):$(VERSION)
	docker push ${DOCKER_ID_USER}/$(BIN_NAME):latest

run:
	docker run -p 8001:8000 $(IMAGE_NAME)

build:
	rm -r ./server/dataplay/static/
	mkdir ./server/dataplay/static/
	cd client; \
    npm install --silent; \
	npm run build
