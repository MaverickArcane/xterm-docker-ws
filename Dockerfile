FROM node:18-alpine3.18

ARG APP_DIR=/app

ENV BACKEND_PORT 6060

RUN apk add --no-cache python3 \
	make \
	g++ \
	bash

RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json ${APP_DIR}/
RUN npm install ./

COPY . ${APP_DIR}/

ENTRYPOINT ["npm","start"]
