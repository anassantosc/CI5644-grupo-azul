FROM node:18.17.0-alpine

WORKDIR /frontend

COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .

RUN npm install
COPY ./frontend .
EXPOSE 3000

CMD ["npm", "run", "dev"]
