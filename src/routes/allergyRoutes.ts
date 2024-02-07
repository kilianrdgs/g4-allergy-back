import express from 'express';
import allergyController from '../controllers/allergyController';
const router = express.Router();

//route pour le formulaire
router.post('/formulaire', allergyController.createAllergy);

export default router;