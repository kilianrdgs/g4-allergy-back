import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const User = require('../models/userModel');

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
        if (!authToken) {
            throw new Error('Missing authorization token');
        }
        const decodedToken: any = jwt.verify(authToken, 'token'); // Assurez-vous de remplacer 'token' par votre clé secrète réelle
        const user = await User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
        if (!user) {
            throw new Error('User not found');
        }

      req.body.authToken = authToken;
      req.body.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed!' });
    }
};

export default authentication;
