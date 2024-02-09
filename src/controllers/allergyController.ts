import express, { Request, Response } from 'express'
const User = require('../models/userModel')
const Allergy = require('../models/allergyModel')
import mongoose from 'mongoose'

async function getAllergyList(req: Request, res: Response) {
    const allergyList = await Allergy.find({ isPrivate: false }, "name").populate("createdBy", "name isAdmin")
    res.send(allergyList)
}

async function getPersonalAllergyList(req: Request, res: Response) {
    try {
        const userId = req.body.user._id
        if(!userId) {
            res.status(404).json({"message": "Utilisateur non trouvé"})
        }
        const allergyList = await Allergy.find({ createdBy: userId }, "name")
        res.send(allergyList)
    }
    catch (e) {
        res.status(500).send(e)
    }
}

async function deleteAllergy(req: Request, res: Response) {
    try {
        await Allergy.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
        res.status(204)
    }
    catch (e) {
        res.status(500).send(e)
    }
}

async function createAllergy(req: Request, res: Response) {
  try {

    // Créer une nouvelle instance de l'allergie avec les données du formulaire
    const allergy = new Allergy({
      name: req.body.name,
      createdBy: req.body.user._id,
      isPrivate: req.body.isPrivate == "private"
    });

    // Enregistrer l'allergie dans la base de données
    await allergy.save();

    return res.status(201).json({ message: 'Allergie créée avec succès' });
  } catch (error) {
    return res.status(400).json({ message: 'Erreur lors de la création de l\'allergie' });
  }
};

export default { getAllergyList, getPersonalAllergyList, deleteAllergy, createAllergy }