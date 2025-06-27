import DynamicController from '../routes/DynamicController.js'  ;
import express from 'express';

const app = express();

//LOAD MODEL AND CREATE ROUTE

import Category from './Category.js';
app.use('/categories', DynamicController(Category));

import Product from './Product.js';
app.use('/products', DynamicController(Product));

export default app;
