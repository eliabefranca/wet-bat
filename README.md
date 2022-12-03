## Wet Bat

This projects was built with NextJS and Prisma as an ORM.

#### Project structure

```
.
├── components
│   ├── ...
├── pages
│   ├── api
│   │   ├── quotes // REST API for quotes
│   ├── quotes
│   │   ├── [id].tsx // edit quotes
|   ├── _app.tsx
├── prisma
│   ├── migrations // migrations for the database
│   ├── schema.prisma // database schema
|   ├── ...
...
```



### Getting Started
#### Prerequisites
- NodeJS
- Yarn or NPM

#### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/eliabefranca/wet-bat
    ```
2. Install NPM packages
    ```sh
    yarn install
    ```

#### Running the project
1. Setting up the database
    ```sh
    yarn prisma migrate dev --name init
    ```
2. Running the project
    ```sh
    yarn dev
    ```

#### Building the project
1. Building the project
    ```sh
    yarn build
    ```
2. Running the project
    ```sh
    yarn start
    ```
#### Using docker-compose to run the project
1. Running the project
    ```sh
    docker-compose up
    ```

