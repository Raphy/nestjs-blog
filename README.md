Ashleigh's Blog made with nestJS
===

A simple MVC blog example build on [NestJS](https://github.com/nestjs/nest/), rendered with React, templated with jade.

## Install 

First clone this directory 

```bash
git clone git@github.com:bashleigh/nestjs-blog
```

copy the `ormconfig.json.dist` file

```bash
cp ormconfig.json.dist ormconfig.json
```

Start docker 

```bash
docker-composer up -d
```

Run yarn from inside the container for `bcrypt`.

```bash
yarn
```

## Database sync 

Sync the entities to the database from within the container

```bash
yarn schema:sync
```

