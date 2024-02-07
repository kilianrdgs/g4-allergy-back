import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const User = require('../models/userModel');
import jwt from 'jsonwebtoken';


const createUser = async (req: Request, res: Response) => {
    const utilisateur = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
    try {
        await utilisateur.save()
           return res.status(201).json({ message: 'utilisateur créé' });
    } catch (error) {
        return res.status(401).json({ message: "impossible de créer un utilisateur" });
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

        const token = jwt.sign({ userId: user._id }, 'secret');

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

export { loginUser, createUser };
