import express from 'express';
import { loginUser, createUser, logoutUser } from '../controllers/userController';
const router = express.Router();
import authentication from "../middlewares/auth";

//route pour ajouter un user
router.post('/user', createUser);

//route pour se connecter
router.post('/connexion', loginUser);

//route pour se deconnecter
router.post('/deconnexion', authentication , logoutUser);

export default router;