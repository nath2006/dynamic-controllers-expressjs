import express from 'express';
import { checkSchema, validationResult } from 'express-validator';

const app = express();

//store 
app.post('/categories', 
        checkSchema({
          name: {notEmpty: true},
          status: {notEmpty: true}, 
      }),
      (req, res, next) => {
        const result = validationResult(req)
        if(result.isEmpty()){
          next();
        }else {
          res.json({
            errors: result.array()
          })
        }
      }
    )

export default app;
