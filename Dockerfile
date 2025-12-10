FROM node:20 AS builder
WORKDIR /app
COPY ./Holly-front ./Holly-front
RUN cd Holly-front && npm ci && npm run build

FROM node:20
WORKDIR /app
COPY ./Holly-server/package*.json ./Holly-server/
RUN cd Holly-server && npm ci --omit=dev
COPY ./Holly-server ./Holly-server


COPY --from=builder /app/Holly-front/dist ./dist

COPY .env . 
EXPOSE 3005

WORKDIR /app/Holly-server
CMD ["npm", "start"]
