# TO-DO TASK MANAGER

A to-do task manager application with functions to add, update, remove tasks. User login functionality has been implemented.
Login sessions based on [JWT (JSON Web Token)](https://jwt.io/) authentication strategy. Tokens are encrypted using RSA based private-public key mechanism.

#### Demo at [https://to-do-task-manager-1299.herokuapp.com/login](https://to-do-task-manager-1299.herokuapp.com/login)

## Features

 - Frontend static file server based on [express](https://expressjs.com/)
 - Server API based on [node.js](https://nodejs.org/en/) and [express.js](https://expressjs.com/)
 - Database based on [MongoDB](https://www.mongodb.com/) and accessed through [mongoose](https://mongoosejs.com/)
 - JWT based authentication based on [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
 - Server monitoring based on [nodemon](https://nodemon.io/)
 - Code linting and styling based on [eslint](https://eslint.org/) and [prettier](https://prettier.io/)

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/) (preferred) or [npm](https://www.npmjs.com/) to install the
required dependencies.

Clone the repository
```bash
git clone https://github.com/Vedant1202/to-do-task-manager.git
cd to-do-task-manager
```

#### For backend setup

To generate private-public keys:

- On a Linux/Mac:
You can choose to use [ssh-keygen](https://www.ssh.com/ssh/keygen/).

- For all OS:
You can use an online key pair generator like [this](https://travistidwell.com/jsencrypt/demo/).

- After generating keys, name then as `public.key` and `private.key` and copy the files in `backend/keys/`

To install backend dependencies

- Using yarn
```bash
cd backend
yarn install
```

- Using npm
```bash
cd backend
npm install
```

#### For frontend setup

To install frontend dependencies

 - Using yarn

```bash
cd backend
yarn install
```

 - Using npm

```bash
cd backend
npm install
```

## Usage

To start backend API

 - Using yarn

```bash
cd backend
yarn start
```

 - Using npm

```bash
cd backend
npm start
```

 - API is live on `http://localhost:4000/`


To start frontend static server

 - Using yarn

```bash
cd frontend
yarn start
```

 - Using npm

```bash
cd frontend
npm start
```

 - Go to `http://localhost:3000/login`


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update documentation as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)