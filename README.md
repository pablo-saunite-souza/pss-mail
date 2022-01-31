# Pablo Saunite de Souza Mail sender
A project of Pablo Saunite de Souza clients.

## Install
    npm install

## Run the app
    npm start

## Run the app with auto-reload
    npm run dev

## Run the tests
    npm run test

# REST API

The REST API to this app is described below.

## Authentication service

### Request

`POST /v1/auth`

    curl -i -X POST http://localhost:3000/v1/auth -H "Accept: application/json" -H "Content-Type: application/json" -d "{\"userName\":\"\",\"password\":\"\"}"

### Response

#### 201
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"token":"web-token-encoded","type":"type-web-token-encoded","success":"Auth success"}

#### 400
    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"error":"Error description"}

## Send new email

### Request

`POST /v1/email/send`

    curl -i -X POST http://localhost:3000/v1/email/send -H "Accept: application/json" -H "Content-Type: application/json" -d "{\"to\":\"example@example.com\",\"subject\":\"Subject of email\",\"text\":\"Sample text\",\"html\":\"<p>Sample html</p>\",\"cc\":\"examplecopy@example.com\"}"

### Responses

#### 201
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"success":"E-mail enviado com sucesso! Obrigado por utilizar nossos serviços!"}

#### 400
    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"error":"Error description"}