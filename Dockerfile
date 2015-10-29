FROM node:0.12
RUN npm install -g nodemon forever
RUN mkdir /nhc
WORKDIR /nhc
EXPOSE 3000
