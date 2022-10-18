FROM node:18-slim

# Make working directories
RUN  mkdir -p  /client
WORKDIR /client

COPY package*.json ./

RUN npm i

CMD ["npm", "run", "start"]
