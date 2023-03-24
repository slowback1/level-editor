#Level Editor Backend

##How To Run Locally
Spin up a postgres database using the docker-compose file in the docker directory of this repository

Run the following commands in the backend directory to run migrations on the database:
```
npm install
npx prisma migrate dev
```

Make a `.env` file in the backend directory using `example.env` as a template

Run the following command to start the server:
```
npm start
```