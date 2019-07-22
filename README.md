# jc-server

Basic open-source implementation of a server for JustComments

The server is implemented in NodeJS. Required version is 8+;

## Features

- basic commenting
- single process
- file storage

## Not-included features

- reactions
- nested responses
- sorting
- social login
- email notifications
- push notifications
- reCaptcha
- higly-available & distributed storage

To have these features, please see the paid hosted version: [JustComments](https://just-comments)

## Server Setup

- Clone the repository and run `npm install`.
- Run `node server.js`

You should get a message `JustComments listening on port 3434!`. You can change the port in `config.js`.

## Frontend Setup

- Clone https://github.com/JustComments/jc-widget and run `npm install`.
- Adjust `API_ENDPOINT` variable in Webpack via CLI and or in the source to point to 3434.
- Run `npm start` and open `http://localhost:3333/`.

## Frontend Build

- Define URLs where you will host the frontend and backend in Webpack config or via CLI.
- Run `npm run build`.
- Copy files from the `dist` to your server.
