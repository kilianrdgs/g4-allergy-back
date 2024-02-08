import express from 'express';
import { loginUser, createUser, logoutUser } from '../controllers/userController';
const router = express.Router();
import authentication from "../middlewares/auth";

//route pour ajouter un user
router.post('/user', createUser);

//route pour se connecter
router.post('/connexion', loginUser);

//verifier si l'utilisateur est connecté 
router.get('/isConnected', authentication , (req, res) => {
    res.json(true);
});

router.get('/user', authentication, (req, res) => {
    if(req.body.user){
        res.send({"name": req.body.user.name, "_id": req.body.user._id, "isAdmin": req.body.user.isAdmin})
    }
})

//route pour se deconnecter
router.post('/deconnexion', authentication , logoutUser);

export default router;