import * as dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const URI: string = process.env.MONGO_URI || '';

export default async function main(){
    try {
        mongoose.connect(URI)
    } catch (error) {
        console.error(`erreur lors de la  connexion : ${error}`);
    }
}
