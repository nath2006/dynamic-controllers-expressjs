import express from 'express';
import Category from './Category.js';
import Product from './Product.js';

const app = express();

app.use('/', Category);
app.use('/', Product);

export default app;
