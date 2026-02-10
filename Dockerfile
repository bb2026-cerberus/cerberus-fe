FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_PWA_DEV
ARG VITE_API_BASE_URL
ARG VITE_API_PROXY_TARGET

ENV VITE_PWA_DEV=$VITE_PWA_DEV
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_PROXY_TARGET=$VITE_API_PROXY_TARGET

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]