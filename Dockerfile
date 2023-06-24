FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM node:18-alpine AS final
WORKDIR /app

COPY --from=builder ./app/build ./build
COPY package*.json .

# If you are building your code for production
RUN npm ci --omit=dev

CMD [ "node", "build/index.js" ]