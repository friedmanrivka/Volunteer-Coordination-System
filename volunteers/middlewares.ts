import {Volunteer} from '../utils/type'
 import { NextFunction, Request, Response } from 'express';


// export function extractName(req: Request, res: Response, next: NextFunction) {
//     if (req.body.name) {
//         res.locals.name = req.body.name;
//     }
//     next();
// }

// export function extractEmail(req: Request, res: Response, next: NextFunction) {
//     if (req.body.email) {
//         res.locals.email = req.body.email;
//     }
//     next();
// }

// export function extractPhone(req: Request, res: Response, next: NextFunction) {
//     if (req.body.phone) {
//         res.locals.phone = req.body.phone;
//     }
//     next();
// }import { NextFunction, Request, Response } from 'express';

// פונקציה לבדיקת אם אימייל חוקי
function isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

// פונקציה לבדיקת אם טלפון חוקי
function isValidPhone(phone: string): boolean {
    const re = /^\+?[0-9]{7,14}$/;
    return re.test(String(phone));
}

export function validateVolunteer(req: Request, res: Response, next: NextFunction) {
    const { _id, name, email, phone } = req.body as Volunteer;

    if (!name || !email || !phone) {
        return res.status(400).send('Name, email, and phone are required');
    }

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).send('Invalid name');
    }

    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email');
    }

    if (!isValidPhone(phone)) {
        return res.status(400).send('Invalid phone');
    }

    next();
}
