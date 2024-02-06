import express from 'express';
const router = express.Router();

//route pour ajouter un user
router.post('/user', (req, res) => {
    const message:String = 'authentification';
    res.json(message);
    });

//route pour se connecter
router.post('/login', (req, res) => {
    const message:String = 'connexion';
    res.json(message);
    });


export default router;