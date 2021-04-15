# Project description

* This is an interview project. It uses:
* **Nest.js** - progressive typescript web framework for node.js
* **MongoDB** - document oriented NoSQL database
* **Mongoose** - ORM for Mongo
* **React** - frontend framework
* **Redux** - ?
* **MongoMemoryServer** - used for testing.

### Api code is located in the api/ folder, and the frontend is in app/ .
### Api contains 2 endpoints:
-  ```/users/sign-up``` - used for sign up. Returns generated confirmation code. The generated code is unique for each user, and is the **sha256 hash of his email**(hex encoded).
- ```/users/activate/{code}``` - used to activate account. Will only activate the account if it's currently **inactive**.

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

Because of the MongoMemoryServer, the duplicateUser test may fail once in 3-4-5 runs. Please run again if it fails on the first launch.
## License

Nest is [MIT licensed](LICENSE).
