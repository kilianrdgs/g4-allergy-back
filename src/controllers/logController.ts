import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from 'express'
const Log = require('../models/logModel')

export default async function addLog(req: Request, res: Response, next: NextFunction) {

    try {
        const log = new Log({
            method: req.method,
            url: req.url,
            statusCode: res.statusCode
        })
        console.log("save log")

        await log.save()

        next()
    }
    catch(e) {

    }

}