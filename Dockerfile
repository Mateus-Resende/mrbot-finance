FROM node:16.5 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json* .
RUN npm install -g nodemon && npm install

FROM node:16.5
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
