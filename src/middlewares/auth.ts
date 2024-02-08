import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const User = require('../models/userModel');
const secret_key: string = process.env.SECRET_KEY || '';

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const authToken: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
        console.log(authToken);
        if (!authToken) {
            throw new Error('Missing authorization token');
        }
        const decodedToken: any = jwt.verify(authToken, secret_key);
        console.log(decodedToken);
        const user = await User.findOne({ _id: decodedToken._id});
        console.log(user);
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
