import express from 'express';
import { loginUser, createUser } from '../controllers/userController';
const router = express.Router();

//route pour ajouter un user
router.post('/user', createUser);

//route pour se connecter
router.post('/connexion', loginUser);


export default router;