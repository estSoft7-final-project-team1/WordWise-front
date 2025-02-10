FROM node:22-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html

