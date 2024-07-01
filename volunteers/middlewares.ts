import {} from '../utils/type'
import { NextFunction, Request, Response } from 'express';

export function extractName(req: Request, res: Response, next: NextFunction) {
    if (req.body.name) {
        res.locals.name = req.body.name;
    }
    next();
}

export function extractEmail(req: Request, res: Response, next: NextFunction) {
    if (req.body.email) {
        res.locals.email = req.body.email;
    }
    next();
}

export function extractPhone(req: Request, res: Response, next: NextFunction) {
    if (req.body.phone) {
        res.locals.phone = req.body.phone;
    }
    next();
}