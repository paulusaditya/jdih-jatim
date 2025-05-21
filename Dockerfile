#1
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

#2
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
