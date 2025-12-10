FROM node:20 AS builder
WORKDIR /app
COPY ./Holly-front ./Holly-front
RUN cd Holly-front && npm ci && npm run build


FROM  node:20
WORKDIR /app/Holly-server
COPY ./Holly-server/package*.json ./
RUN npm ci --omit=dev
COPY ./Holly-server .


COPY --from=builder /app/Holly-front/dist ./Holly-server/dist
COPY .env . 
EXPOSE 3005
CMD ["node", "app.js", ]