# Todo App

### Tech Stack

- NodeJS:14.18.1 or latest
- mongodb: latest
- typescript: latest
- express: latest
- jest: latest

### Project todos

- [ ] connect in db inside docker
- [ ] create missing endpoints

### Instalation

```bash
npm install
```

### Running App

To run app inside docker just run the following:

```bash
docker-compose up --build -d
```

to run tests inside docker container

```bash
docker exec -it <containerhash> /bin/bash
```

once inside container:

```bash
npm test
```
