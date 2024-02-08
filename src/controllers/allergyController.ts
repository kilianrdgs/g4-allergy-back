import express, { Request, Response } from 'express'
const User = require('../models/userModel')
const Allergy = require('../models/allergyModel')
import mongoose from 'mongoose'

async function getAllergyList(req: Request, res: Response) {
    const allergyList = await Allergy.find({ isPrivate: false }, "name").populate("createdBy", "name isAdmin")
    res.send(allergyList)
}

async function getPersonalAllergyList(req: Request, res: Response) {
    const currentUser = await User.findOne({ name: req.params.name }, '_id')
    const allergyList = await Allergy.find({ createdBy: currentUser._id }, "name")
    res.send(allergyList)
}

async function deleteAllergy(req: Request, res: Response) {
    try {
        await Allergy.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))
        res.status(204)
    }
    catch (e) {
        res.status(404).send(e)
    }
}

export default { getAllergyList, getPersonalAllergyList, deleteAllergy }