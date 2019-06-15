FROM node:12.4 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json* .
RUN npm install -g nodemon && npm install

FROM node:12.4
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
