FROM node:0.12
RUN npm install -g nodemon forever && mkdir /nhc && apt-get update && apt-get -y install libkrb5-dev
COPY package.json /
RUN cd / && npm install && rm package.json
COPY . /nhc/
WORKDIR /nhc
EXPOSE 3000
