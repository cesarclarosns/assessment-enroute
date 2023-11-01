# Assessment

![App](/media/images/app.gif)

Demo:

- https://assessment-enroute.cesarclarosns.com

This repository contains two folders with separate Node.js applications: an Express.js REST API and a Next.js app. Additionally, there is a Docker Compose file to easily run both applications together in a containerized environment.

## Folder Structure

- `server/`: Contains the Express.js REST API.
- `client/`: Contains the Next.js application.
- `compose.yml`: Docker Compose configuration file to orchestrate the containers, run a mongodb instance and seed the db using the file ./db/mongo-init.js.

## Getting Started

### Prerequisites

Before you can run the applications using Docker Compose, make sure you have the following software installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

### Running the Applications

Building images from source code

```
docker compose -f compose.yaml up -d
```

This command will build and start the Express.js API and Next.js app in separate containers, exposing them on the specified ports, run a mongodb instance and seed the db.

![Running app](/media/images/running_app.png)

Access the applications in your web browser:

- Express.js REST API: http://127.0.0.1:5000/api/health
- Next.js App: http://127.0.0.1:3000
- MongoDB: http://127.0.0.1:27017

You can use this connection string to connect to the db: "mongodb://admin:password@127.0.0.1:27017/enroute?retryWrites=true&w=majority&appName=AtlasApp"

![Database](/media/images/db.png)

To stop the containers and remove the volume and images, run:

```
docker compose -f .\compose.yaml down --rmi-all --volumes
```

### Working on the Applications

```
docker compose -f compose.dev.yaml up -d
```

This command only will run a mongodb instance and seed the db. The REST API will connect to this mongodb instance.

If you want to work on these applications individually, follow the instructions in each folder's README.md file.
