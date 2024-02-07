import express, { Request, Response } from 'express'
const User = require('../models/userModel')
const Allergy = require('../models/allergyModel')

async function getAllergyList() {
    const allergyList = await Allergy.find({ isPrivate: false }, "name").populate("createdBy", "name")
    return allergyList
}

async function getPersonalAllergyList(req: Request) {
    const currentUser = await User.findOne({ name: req.params.name }, '_id')
    const allergyList = await Allergy.find({ createdBy: currentUser._id }, "name")
    return allergyList
}

export default { getAllergyList, getPersonalAllergyList }