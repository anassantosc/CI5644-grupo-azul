FROM node:18.17.0-alpine

WORKDIR /frontend
ARG ENV_FILE
ENV NODE_ENV=production
COPY $ENV_FILE .env
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

RUN npm install

COPY ./frontend .
EXPOSE 3000

CMD ["npm", "run", "dev"]
