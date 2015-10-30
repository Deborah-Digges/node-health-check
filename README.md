# node-health-check
A small application to check the status of a set of endpoints.

## Setup

1. Ensure mongodb is installed and mongod is running: `ps aux| grep mongod`
2. Install dependencies: `npm install`
3. `node server.js`
4. Go to: hostname:3000

# Using docker/compose

1. `cp .env.sample .env`
2. `docker-compose up -d web`


## Usage
![Demo](demo.gif)



