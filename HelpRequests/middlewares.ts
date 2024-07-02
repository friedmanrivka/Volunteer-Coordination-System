// import {NextFunction,Request,Response} from 'express'
// import _ from 'lodash'

// export function validateFilters(req: Request, res:Response,next:NextFunction){
//     const {status,priority}=req.query;
//     const validStatuses=['open','in progress','closed'];
//     const validPriorities=['low','medium','high'];
//     if(status&& !_.isString(status)){
//         return res.status(400).send('Status filter should be a string');
//     }
//     if(status&& !validStatuses.includes(status as string)){
//         return res.status(400).send('Invalid status');
//     }
//     if(priority&&!_.isString(priority)){
//         return res.status(400).send('Priority filter should be a string');
//     }
//     if(priority&&!validPriorities.includes(priority as string)){
//         return res.status(400).send('Invalid priority');
//     }
//     next();
// }
// export function extractPriority(req: Request, res: Response, next: NextFunction){
//     if(req.query.priority){
//         res.locals.priority = req.query.priority;
//     }
//     next();
// }

import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

export function extractLocation(req: Request, res: Response, next: NextFunction) {
    if (req.query.location) {
        res.locals.location = String(req.query.location);
    }
    next();
}

export function extractStatus(req: Request, res: Response, next: NextFunction) {
    if (req.query.status) {
        res.locals.status = String(req.query.status);
    }
    next();
}

export function extractPriority(req: Request, res: Response, next: NextFunction) {
    if (req.query.priority) {
        res.locals.priority = String(req.query.priority);
    }
    next();
}


export function validateHelpRequest(req: Request, res: Response, next: NextFunction) {
    const { _id, title, description, location, priority, volunteerId, contactInfo } = req.body;

    if (!_id || typeof _id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing _id' });
    }

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing title' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing description' });
    }

    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing location' });
    }

    if (!priority || typeof priority !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing priority' });
    }

    // if (!volunteerId || typeof volunteerId !== 'string') {
    //     return res.status(400).json({ error: 'Invalid or missing volunteerId' });
    // }

    if (!contactInfo || typeof contactInfo !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing contactInfo' });
    }

    next();
}

// export function validateHelpRequest(req: Request, res: Response, next: NextFunction) {
//     const { title, description, location, priority } = req.body;

//     if (!title || typeof title !== 'string') {
//         return res.status(400).send('Invalid or missing title');
//     }

//     if (!description || typeof description !== 'string') {
//         return res.status(400).send('Invalid or missing description');
//     }

//     if (!location || typeof location !== 'string') {
//         return res.status(400).send('Invalid or missing location');
//     }

//     const validPriorities = ['low', 'medium', 'high'];
//     if (!priority || !validPriorities.includes(priority)) {
//         return res.status(400).send('Invalid or missing priority');
//     }

//     next();
// }