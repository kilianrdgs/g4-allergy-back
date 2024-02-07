import express from 'express';
import { loginUser } from '../controllers/userController';
const router = express.Router();

//route pour ajouter un user
router.post('/user', (req, res) => {
    const message:String = 'authentification';
    res.json(message);
    });

//route pour se connecter
router.post('/connexion', loginUser);


export default router;