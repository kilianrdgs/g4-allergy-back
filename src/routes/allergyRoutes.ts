import express from 'express';
const router = express.Router();

import allergyController from '../controllers/allergyController'

router.get('/list', allergyController.getAllergyList)

router.get('/list/:name', allergyController.getPersonalAllergyList)

router.delete("/:id", allergyController.deleteAllergy)

export default router