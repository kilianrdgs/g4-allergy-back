import { Request, Response } from 'express'; // Pour les types Request et Response
const Allergy = require('../models/allergyModel'); // Importer le modèle Allergy MongoDB

async function createAllergy(req: Request, res: Response) {
    try {
      const { name, createdBy, isPrivate } = req.body;
      
      // Créer une nouvelle instance de l'allergie avec les données du formulaire
      const newAllergy = new Allergy({ name, createdBy, isPrivate });

      // Enregistrer l'allergie dans la base de données
      const savedAllergy = await newAllergy.save();

      res.status(201).json(savedAllergy); // Renvoie la réponse avec l'allergie enregistrée
    } catch (error:any) {
      res.status(500).json({ message: error.message }); // En cas d'erreur, renvoie une erreur 500
    }
}

export default { createAllergy }