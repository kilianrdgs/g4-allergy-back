import express, { Request, Response } from 'express'
const Allergy = require('../models/allergyModel')

async function getAllergyList() {
    const allergyList = await Allergy.find({ isPrivate: false }, "name").populate("createdBy", "name")
    return allergyList
}

export default { getAllergyList }