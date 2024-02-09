import express from 'express';
import { loginUser, createUser, logoutUser } from '../controllers/userController';
const router = express.Router();
import authentication from "../middlewares/auth";

router.post('/user', createUser); 

router.post('/connexion', loginUser);

router.get('/isConnected', authentication, (req, res) => {
    res.json(true);
});

router.get('/user', authentication, (req, res) => {
    if (req.body.user) {
        res.send({"name": req.body.user.name, "_id": req.body.user._id, "isAdmin": req.body.user.isAdmin});
    } else {
        res.status(401).json({ message: 'Utilisateur non authentifié' });
    }
});

router.post('/deconnexion', authentication, logoutUser);

export default router;
