import { checkSchema, validationResult } from "express-validator";

class InputValidation {
  validate = async (schema) => {
    return [
      checkSchema(schema),
      (req, res, next) => {
        try {
          const results = validationResult(req);

          if(!results.isEmpty()){
            throw {message: results.array()};
          }

          next()
        } catch (error) {
          return res.status(400).json({
            status: false,
            message: 'IINPUT_ERROR',
            error: error.message
          });
        }
      }
    ]
  }
}

//Add class
export default new InputValidation;
