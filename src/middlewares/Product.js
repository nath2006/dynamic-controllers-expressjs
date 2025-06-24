import express from 'express';
import runValidation from '../libraries/runValidation.js';
import { checkSchema} from 'express-validator';

const app = express();

//store 
app.post('/products', 
        checkSchema({
          categoryId: {notEmpty: true},
          name: {notEmpty: true},
          status: {notEmpty: true}, 
      }), runValidation)

//update
app.put('/products/:id', 
        checkSchema({
          id: {notEmpty:true, in: 'params'},
          categoryId: {notEmpty: true},
          name: {notEmpty: true},
          status: {notEmpty: true}, 
      }), runValidation)

//delete
app.delete('/products/:id', 
        checkSchema({
          id: {notEmpty:true, in: 'params'},
      }), runValidation)


export default app;
