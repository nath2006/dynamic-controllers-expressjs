import express from 'express';
import ModuleController from '../controllers/ModuleController.js';

const router = express.Router();

router.post('/system/modules', ModuleController.createModule); //generate model and load models

export default router;
