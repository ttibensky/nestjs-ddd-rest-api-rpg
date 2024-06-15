# Neo RPG

This repository is a takehome assignment for a role at Neo Financial.

## Requirements

- install [Docker](https://docs.docker.com/engine/install/)
- install [Task](https://taskfile.dev/installation) (optional)
  - if you don't want to use Task, you will need to type docker commands and their arguments manually

## Start the project

- run `task up`
  - this will spin up all docker containers, imports database seed, runs `npm i`, so it might take a minute or two
  - if you wish to see the progess, run `taks logs` or tail logs of specific containers until everything is ready

## Usage

- run `task down up logs` to restart the project and start tailing logs from all containers

### Endpoints & URLs

- Swagger API documentation [http://localhost:3001/api](http://localhost:3001/api)
- Mongo Express [http://localhost:8081](http://localhost:8081)

## TODO

- use custom errors instead of the build-in Error

## Resources

- [https://www.domainlanguage.com/ddd/blue-book/](https://www.domainlanguage.com/ddd/blue-book/)
- [https://docs.nestjs.com/](https://docs.nestjs.com/)
- [https://dev.to/sairyss/domain-driven-hexagon-18g5](https://dev.to/sairyss/domain-driven-hexagon-18g5)
