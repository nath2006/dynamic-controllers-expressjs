import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from './src/models/Category.js';
import Product from './src/models/Product.js'
import dynamiCrud from './src/routes/api.js';
import CategoryMiddleware from './src/middlewares/Category.js';

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

// app.get('/', (req, res) => {
//   return res.json({Message: `Hello ${req.body.name}`});

// });

//middleware
app.use(CategoryMiddleware);

//call dyanamic crud
app.use('/categories', dynamiCrud(Category))
app.use('/products', dynamiCrud(Product))


app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
