import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import LoadMiddlewares from './src/middlewares/LoadMiddlewares.js';
import LoadModels from './src/models/LoadModels.js';

const app = express();
const env = dotenv.config().parsed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DATABASE CONNECTION
mongoose.connect(`mongodb://localhost:27017/${env.DB_NAME}`, {
  'authSource': "admin",
  'user': env.DB_USER,
  'pass': env.DB_PASSWORD
});

const db = mongoose.connection;
  db.on('error', (error) => {
    console.error('Database connection error:', error);
  });
  db.once('open', () => {
    console.log(`Database ${env.DB_NAME} connected successfully`);
  });

//middleware
app.use(LoadMiddlewares);

//Models & Route
app.use(LoadModels);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
