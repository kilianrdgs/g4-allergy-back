import express, { Request, Response } from 'express';
const User = require('../models/userModel');
const Allergy = require('../models/allergyModel');
import mongoose from 'mongoose';

async function getAllergyList(req: Request, res: Response) {
    try {
        const allergyList = await Allergy.find({ isPrivate: false }, "name").populate("createdBy", "name isAdmin");
        res.send(allergyList);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getPersonalAllergyList(req: Request, res: Response) {
    try {
        const userId = req.body.user?._id; 
        if (!userId) {
            return res.status(404).json({ "message": "Utilisateur non authentifié" }); 
        }
        const allergyList = await Allergy.find({ createdBy: userId }, "name");
        res.send(allergyList);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteAllergy(req: Request, res: Response) {
    try {
        await Allergy.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
        res.status(204).send(); 
    } catch (error) {
        res.status(500).send(error);
    }
}

export default { getAllergyList, getPersonalAllergyList, deleteAllergy };
