# Neo RPG

This repository is a result of [takehome assignment](./neo-financial-instructions.pdf) for a role at Neo Financial.
It utilizes:

- languages:
  - [JavaScript](https://javascript.info/)
  - [TypeScript](https://www.typescriptlang.org/)
- frameworks
  - [Nest.js](nestjs.com) because it has all the functionality we need, is fast, and well documented
- architecture:
  - [Domain-driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) to separate business logic from framework and libraries, improve readability, extendability and maintainability, and to enforce [SOLID principles](https://en.wikipedia.org/wiki/SOLID)
  - [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) for better code organizing (this goes hand in hand with DDD)
  - [Command and Query Responsibility Segregation (CQRS)](https://en.wikipedia.org/wiki/Command_Query_Responsibility_Segregation) to create clear interfaces to read and modify data
  - [Value Objects](https://en.wikipedia.org/wiki/Value_object) to enforce data integrity througout the application and provide easier means to add functionality and/or validation
- libraries:
  - [@nestjs/mongoose](https://www.npmjs.com/package/@nestjs/mongoose) and [mongoose](https://www.npmjs.com/package/mongoose) as an ODM for storing and retrieving data
  - [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger) to generate API documentation from the code
  - [class-validator](https://www.npmjs.com/package/class-validator) to validate requests/user inputs before the data goes to the controllers
  - [date-fns](https://www.npmjs.com/package/date-fns) to make work with dates easier
  - [purify-ts](https://www.npmjs.com/package/purify-ts) to provide a funcional (and more readable) way of handling and avoiding null values and nested conditions
  - [uuid](https://www.npmjs.com/package/uuid) to generate IDs and primary keys for entities, commands, events and queries
  - [Lodash](https://lodash.com/) to provide utility functions for easier coding
- command line utilities:
  - [Docker](https://www.docker.com/) for stable environment
  - [Task](https://taskfile.dev/) for easier command line usage

![App Screencast](./docs/swagger.png)

## Requirements

- install [Docker](https://docs.docker.com/engine/install/)
- install [Task](https://taskfile.dev/installation) (optional)
  - if you don't want to use Task, you will need to type docker commands and their arguments manually

## Start the project

- run `task up`
  - this will spin up all docker containers, imports database seed, runs `npm i`, so it might take a minute or two
  - if you wish to see the progess, run `taks logs` or tail logs of specific containers until everything is ready

## Usage

- run `task --list-all` to list all available commands
- run `task down up logs` to restart the project and start tailing logs from all containers
- run `task down && sudo rm -rf mongo/data && task up` to re-seed database and start the project
- run `task npm <your-arguments>` to execute npm command inside the `nest` container; examples:
  - `clear && task npm -- run test`
  - `task npm -- install -g thanks`

This is how the test output should look like (if you run the tests on the seeded database):

```bash
task: [npm] docker compose exec nest npm run test

> nest@0.0.1 test
> jest --config=test/jest.config.json

 PASS  test/e2e/modules/rpg/infrastructure/delivery/http/JobsControllerSpec.ts
  JobController
    ✓ /job (GET) 200 (152 ms)

 PASS  test/e2e/modules/rpg/infrastructure/delivery/http/BattleControllerSpec.ts
  BattleController
    ✓ /battle/:id (GET) 200 (172 ms)
    ✓ /battle/:id (GET) 400 (22 ms)
    ✓ /battle/:id (GET) 404 (19 ms)

 PASS  test/e2e/modules/rpg/infrastructure/delivery/http/CharacterControllerSpec.ts
  CharacterController
    ✓ /character (POST) 200 (176 ms)
    ✓ /character (POST) 400 (25 ms)
    ✓ /character (GET) 200 (22 ms)
    ✓ /character/:id (GET) 200 (25 ms)
    ✓ /character/:id (GET) 400 (15 ms)
    ✓ /character/:id (GET) 404 (18 ms)

Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        3.582 s, estimated 5 s
Ran all test suites.
```

### Endpoints & URLs

- Swagger API documentation [http://localhost:3001/api](http://localhost:3001/api)
- Mongo Express [http://localhost:8081](http://localhost:8081)

## TODO

### Must-haves in a real-world project

- (de)serialization of commands, events, queries and views
  - this is needed to get rid of incorrect serialization of value objects and also a prerequisite for asynchronous command and event processing
- asynchronous command and event processing (we are already using command bus and event bus)
- correlation and causation ids for requests, commands, queries, events and arbitrary log message contexts
- error handling (e.g. mongoose connection failures, more validations)
- fix leaky test teardown
  - I'm getting the following warning when running the tests: `A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.`
- separate seeded MongoDB schema / [in-memory MongoDB server](https://www.npmjs.com/package/mongodb-memory-server) for tests
  - we don't want to modify the development data and create clutter by running the tests multiple times

### Nice-to-haves

- rewrite `BattleProcess` to use [Sagas](https://docs.nestjs.com/recipes/cqrs#sagas) from `Nest.js`
- add video/gif of using the Swagger and Mongo Express
- fix cyclic serialization issue of `BattleHasEnded`
  - it would be good to have this event present in the battle log, although the data in that event are not required by frontend (everything FE needs is in the previous events)
- A character should be designed with some future features in mind, which don't need to be implemented at this point in the project:
  - A character will be able to level up, at which point their core attributes will change (health, strength, dexterity, and intelligence)
  - A character will be able to change their job, resulting in calculations involving their modifiers to reflect their new job (attack modifier and speed modifier)
- event sourcing (aggregates are already prepared for it)
- graphql (as an alterantive to REST API)
- websockets (for auto-updates after creating/updating/deleting a battle)

## Resources

- [https://www.domainlanguage.com/ddd/blue-book/](https://www.domainlanguage.com/ddd/blue-book/)
- [https://docs.nestjs.com/](https://docs.nestjs.com/)
- [https://dev.to/sairyss/domain-driven-hexagon-18g5](https://dev.to/sairyss/domain-driven-hexagon-18g5)

## Lessons learned

- I haven't realized how complicated it might be to write a working test for `BattleProcess` because of the `CQRS`. This is the first time I used `CQRS` with `Nest.js` and I overestimated the tests difficulty.
  - Next time, I would create a proof of concept with the test first and then decide how to proceed to be able to finish the assignment in time
  - I think it might have been easier if I used `Sagas` right from the beginning, because now I'm stuck with the following error:

```bash
task: [npm] docker compose exec nest npm run test test/e2e/modules/rpg/infrastructure/delivery/http/BattleControllerSpec.ts

> nest@0.0.1 test
> jest --config=test/jest.config.json test/e2e/modules/rpg/infrastructure/delivery/http/BattleControllerSpec.ts


 RUNS  test/e2e/modules/rpg/infrastructure/delivery/http/BattleControllerSpec.ts
/app/node_modules/mongodb/lib/operations/execute_operation.js:40
            throw new error_1.MongoNotConnectedError('Client must be connected before running operations');
                  ^

MongoNotConnectedError: Client must be connected before running operations
    at executeOperation (/app/node_modules/mongodb/src/operations/execute_operation.ts:84:13)
    at Collection.findOneAndUpdate (/app/node_modules/mongodb/src/collection.ts:947:34)
    at NativeCollection.<computed> [as findOneAndUpdate] (/app/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:243:33)
    at model.Query._findOneAndUpdate (/app/node_modules/mongoose/lib/query.js:3348:43)
    at model.Query.exec (/app/node_modules/mongoose/lib/query.js:4342:80)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at MongooseCharacters.update (/app/src/modules/rpg/infrastructure/domain/model/character/MongooseCharacters.ts:53:9)
    at PrepareCharacterForAttackCommandHandler.execute (/app/src/modules/rpg/application/handler/command/character/PrepareCharacterForAttackCommandHandler.ts:27:9)
    at BattleProcess.onBattleWasCreated (/app/src/modules/rpg/application/handler/event/battle/BattleProcess.ts:82:9) {
  [Symbol(errorLabels)]: Set(0) {}
}

Node.js v20.14.0
task: Failed to run task "npm": exit status 1
```

- I need to read the instructions better and do not forget what it says
  - I had MongoDB database in place and connected to everything, then I read the instructions again only to see I should have used in-memory storage
  - I hope this won't become an issue
- I went into an issue with class inheritance and types with `Character` class and it's children, resulting into using a union type for its child classes
  - Next time, I would try to use object literals, types and function constructors instead of classes
  - Object literals would also allow to use destructuring and spread operator for object manipulation
  - Lastly, code would probably become much more readable and usable by frontend devs that are used to work with React.js
