const Log = require('../models/logModel')
import { Response, Request, NextFunction } from "express";

function apiLogger(req: Request, res: Response, next: NextFunction) {
    const startTime: Date = new Date();

    res.on('finish', async () => {
        const endTime: Date = new Date();
        const responseTime = endTime.getTime() - startTime.getTime();

        const apiLog = new Log({
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            timestamp: startTime,
            responseTime: responseTime,
        });

        await apiLog.save();
    })

    next()
}

module.exports = apiLogger;