# Todo App

This is a minimal project using NodeJS, Typescript, Express from scratch.
It uses all good pratices of a professional application including Prettier, Linters, automated tests and more.

It use Husky to run scripts before commit and push to repository.

It uses docker to run the application inside a container and docker-compose to run al lservices needed in a development environment.

The erros are handled in a centralized midleware so it's not necessary to use try catchs.

### Tech Stack

- NodeJS:14.18.1 or latest
- mongodb: latest
- typescript: latest
- express: latest
- jest: latest

### Project todos

- [x] connect in db inside docker
- [ ] create missing endpoints
- [ ] pre-push husky configure
- [ ] install inmemory mongo and .github/workflows
- [ ] set commit-lint to standardize commit msgs
- [ ] adjust module alias

### Instalation

```bash
npm install
```

### Running App

To run app inside docker just run the following:

```bash
docker-compose up --build -d
```

### Running Automated Tests

to run tests inside docker container

```bash
docker exec -it <containerhash> /bin/bash
```

once inside container:

```bash
npm test
```
