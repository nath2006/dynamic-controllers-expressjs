import express from 'express';
import InputValidation from '../libraries/inputValidation.js';

const app = express();

//store 
app.post('/categories', 
      await InputValidation.validate({
          name: {notEmpty: true},
          status: {notEmpty: true}, 
      }))

//update
app.put('/categories/:id', 
    await InputValidation.validate({
          name: {notEmpty: true},
          status: {notEmpty: true}, 
    }))

// //delete
// app.delete('/categories/:id', 
//         checkSchema({
//           id: {notEmpty:true, in: 'params'},
//       }), runValidation)


export default app;
