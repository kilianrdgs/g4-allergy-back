import { Request, Response } from 'express';
import mongoose from 'mongoose';
const Allergy = require('../models/allergyModel')

async function getAllergyList() {
    const allergyList = await Allergy.find({ isPrivate: false }, "name").populate("createdBy", "name")
    return allergyList
}

const createAllergy = async (req: Request, res: Response) => {

  const allergy = new Allergy({
      name: req.body.name,
      createdBy: new mongoose.Types.ObjectId(req.body.createdBy),
      isPrivate: req.body.isPrivate
  })
  try {
      await allergy.save()
         return res.status(201).json({ message: 'Allergie créée avec succès' });
  } catch (error) {
      return res.status(401).json({ message: 'Erreur lors de la création de l\'allergie' });
  }
  
};

export default { getAllergyList, createAllergy }