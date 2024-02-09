import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const User = require('../models/userModel');
const secret_key: string = process.env.SECRET_KEY || '';

const createUser = async (req: Request, res: Response) => {
    const utilisateur = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
    try {
        await utilisateur.save()
        return res.status(201).json({ message: 'Utilisateur créé', status: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', status: false });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        const authToken = jwt.sign({ _id: user._id.toString() }, secret_key, { expiresIn: '1h' });

        res.json({ authToken });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Email ou Mot de passe incorrect' });
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

const logoutUser = async (req: Request, res: Response) => {
    try {
        req.body.user.authTokens = [];
        await req.body.user.save();
        res.json('Déconnexion réussie');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
};

export { loginUser, createUser, logoutUser };
