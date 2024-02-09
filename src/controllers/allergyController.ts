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

async function createAllergy(req: Request, res: Response) {
  try {

    // Créer une nouvelle instance de l'allergie avec les données du formulaire
    const allergy = new Allergy({
      name: req.body.name,
      createdBy: req.body.user._id,
      isPrivate: req.body.isPrivate
    });

    // Enregistrer l'allergie dans la base de données
    await allergy.save();

    return res.status(201).json({ message: 'Allergie créée avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Erreur lors de la création de l\'allergie' });
  }
};

export default { getAllergyList, getPersonalAllergyList, deleteAllergy, createAllergy }