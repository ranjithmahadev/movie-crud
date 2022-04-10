/**
 * @author Ranjith Kumar
 * @description Node application to perform CRUD operation
 * @version 1.0.0
 */

import express from 'express';
import cors from 'cors';
import { pool } from './config/db';
import movieRoute from './routes/movie.routes';

const PORT = process.env.PORT || 3000;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// for cross origin requests
app.use(cors());

app.use('/api/', movieRoute);

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
// eslint-disable-next-line consistent-return
pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('DB Connection successful');
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

module.exports = app;
