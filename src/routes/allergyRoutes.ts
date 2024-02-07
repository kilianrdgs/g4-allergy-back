import express from 'express';
const router = express.Router();

import allergyController from '../controllers/allergyController'

router.get('/list', async (req, res) => {
    const list = await allergyController.getAllergyList()
    // const list = [
    //     {name: "Bastien",
    //     allergies: [
    //     {name: "Pollen", isPrivate: true},
    //     {name: "Cacahuètes", isPrivate: false}
    //     ]},
    //     {name: "Julien",
    //     allergies: [
    //     {name: "Gluten", isPrivate: true},
    //     {name: "Connards", isPrivate: false}
    //     ]}
    // ]
    res.send(list)
})

export default router