FROM node:20-alpine AS build
WORKDIR /app

ENV VITE_PWA_DEV=true
ENV VITE_API_BASE_URL=/api
ENV VITE_API_PROXY_TARGET=https://api.seolberus.co.kr

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]