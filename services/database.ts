import * as dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const URI: string = process.env.MONGO_URI || '';

const User = require('../models/userModel');

async function main(){
    
    mongoose.connect(URI)

//    await utilisateur.save().then(() => console.log('utilisateur enregistré'));
}

const utilisateur = new User({
    name: 'admin',
    email: 'test@gmail.com',
    password: 'azertyuiop',
    allergies: ['lait', 'gluten'],
    isAdmin: false
});




export default main;