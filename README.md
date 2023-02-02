<!-- PROJECT LOGO -->
<br />
<p align="center">
  <img src="https://michaelnavs-readme.s3.us-east-2.amazonaws.com/todoapp.png" alt="Logo" width="200">

  <h3 align="center">Todo App</h3>

  <p align="center">
  Another silly todo app
  </p>
</p>

## About Todo App

Used this project to learn the basics of NodeJS, Express with TypeScript, and Prisma.

## Run From Source Code

### Clone the repo locally

1. Clone the repo and cd into the root directory of the project

```sh
git clone https://github.com/navazjm/todoapp && cd todoapp
```

### Run using Docker

1. Change directory to server

```sh
cd path/to/todoapp/todoapp-api
```

2. copy .env.sample to .env

```sh
cp .env.sample .env
```

3. Change directory back to project root

```sh
cd ..
```

4. Docker compose up \
   _Note: navigate to http://localhost:8888_

```sh
docker-compose --env-file=./todoapp-api/.env up -d
```

5. Stop the system

```sh
docker-compose down
```

6. If you need to stop and remove all containers, networks, and all images used by any service in docker-compose.yml file, use the command

```sh
docker-compose down --rmi all
```

### Run the project locally

#### Run the client app

1. [Install NodeJS 16.15 or later](https://nodejs.org/en/)

2. Change directory to client

```sh
cd path/to/todoapp/todoapp-client
```

3. Install node modules

```sh
npm i
```

4. Run the dev server \
   _Note: Remember what port the client app is running on_

```sh
npm run dev
```

#### Run the backend api server

1. [Install PosgreSQL](https://www.postgresql.org/download/)

2. Change directory to server

```sh
cd path/to/todoapp/todoapp-api
```

3. copy .env.sample to .env

```sh
cp .env.sample .env
```

4. Install node modules

```sh
npm i
```

5. Run db migrations

```sh
npx prisma migrate dev
```

6. Run the dev server \
   _Note: Will start the server at port 8080_

```sh
npm run dev
```

## Contribute

All contributions are welcome! Just open a pull request. Please read [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## Contact

Michael Navarro - [@navazjm](https://twitter.com/navazjm) michaelnavs@gmail.com

Project Link: [https://github.com/navazjm/todoapp](https://github.com/navazjm/todoapp)
