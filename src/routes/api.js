import express from 'express'
import DynamicController from '../controllers/dynamicController.js'

const dynamiCrud = (model) => {
  const router = express.Router()
  const dynamicController = new DynamicController(model)

  router.get('/', dynamicController.index) //all rows
  router.get('/:id', dynamicController.show) //single rows
  router.post('/', dynamicController.store) //store data
  router.put('/:id', dynamicController.update) //update data
  router.delete('/:id', dynamicController.delete) // delete data

  return router
}

export default dynamiCrud
