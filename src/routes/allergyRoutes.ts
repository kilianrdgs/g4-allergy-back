import express from 'express';
const router = express.Router();

import allergyController from '../controllers/allergyController'
import authentication from "../middlewares/auth";

router.get('/list', allergyController.getAllergyList)

router.get('/list/:name', authentication, allergyController.getPersonalAllergyList)

router.delete("/:id", allergyController.deleteAllergy)

export default router