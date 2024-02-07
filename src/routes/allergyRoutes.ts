import express from 'express';
const router = express.Router();

import allergyController from '../controllers/allergyController'

router.get('/list', async (req, res) => {
    const list = await allergyController.getAllergyList()
    res.send(list)
})

router.get('/list/:name', async (req, res) => {
    const list = await allergyController.getPersonalAllergyList(req)
    res.send(list)
})

export default router