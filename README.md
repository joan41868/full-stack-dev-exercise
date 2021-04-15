# Project description

* This is an interview project. It uses:
* Nest.js - progressive typescript web framework for node.js
* MongoDB - document oriented NoSQL database
* Mongoose - ORM for Mongo
* React - frontend framework
* Redux - ?
* MongoMemoryServer - used for testing.
## Installation

```bash
$ npm install # in api/ and app/
```

## Running the api

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Running the whole project

```bash

# docker
$ docker-compose build && docker-compose up

```

## Test

```bash
# unit tests
$ npm run test
```

## Note

Because of the MongoMemoryServer, the duplicateUser test may fail once in 3-4-5 runs. Please re-run it it fails.
## License

Nest is [MIT licensed](LICENSE).
