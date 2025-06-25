import express from 'express';
import InputValidation from '../libraries/inputValidation.js';

const app = express();

//store 
app.post('/products', 
        await InputValidation.validate({
              categoryId: {notEmpty: true},
              name: {notEmpty: true},
              status: {notEmpty: true}
          }))

//update
app.put('/products/:id', 
        await InputValidation.validate({
              id: {notEmpty:true, in: 'params'},
              categoryId: {notEmpty: true},
              name: {notEmpty: true},
              status: {notEmpty: true}, 
          }))

//delete
// app.delete('/products/:id', 
//         checkSchema({
//           id: {notEmpty:true, in: 'params'},
//       }), runValidation)


export default app;
