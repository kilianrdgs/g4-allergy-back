import { Request, Response } from 'express';
const User = require('../models/userModel');
import jwt from 'jsonwebtoken';

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret');

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

export { loginUser };
