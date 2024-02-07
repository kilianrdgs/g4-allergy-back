import * as dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const URI: string = process.env.MONGO_URI || '';

const User = require('../models/userModel');
const Allergy = require('../models/allergyModel');

async function main(){

    mongoose.connect(URI)

    // await utilisateur.save().then(() => console.log('utilisateur enregistré'));
    // await allergie.save().then(() => console.log('allergie enregistrée'));
}

const utilisateur = new User({
    name: 'admin2',
    email: 'test2@gmail.com',
    password: 'azertyuiop',
    isAdmin: false
});

const allergie = new Allergy({
    name: 'Pollen',
    createdBy: utilisateur._id,
    isPrivate: false
});




export default main;