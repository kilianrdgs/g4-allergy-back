import express from 'express';
const router = express.Router();

import allergyController from '../controllers/allergyController'

router.get('/list', async (req, res) => {
    const list = await allergyController.getAllergyList()
    res.send(list)
})

router.post('/formulaire', async (req, res) => {
    allergyController.createAllergy(req, res)
});

export default router