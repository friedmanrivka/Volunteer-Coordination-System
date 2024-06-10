import {NextFunction,Request,Response} from 'express'
import _ from 'lodash'

export function validateFilters(req: Request, res:Response,next:NextFunction){
    const {status,priority}=req.query;
    const validStatuses=['open','in progress','closed'];
    const validPriorities=['low','medium','high'];
    if(status&& !_.isString(status)){
        return res.status(400).send('Status filter should be a string');
    }
    if(status&& !validStatuses.includes(status as string)){
        return res.status(400).send('Invalid status');
    }
    if(priority&&!_.isString(priority)){
        return res.status(400).send('Priority filter should be a string');
    }
    if(priority&&!validPriorities.includes(priority as string)){
        return res.status(400).send('Invalid priority');
    }
    next();
}
export function extractPriority(req: Request, res: Response, next: NextFunction){
    if(req.query.priority){
        res.locals.priority = req.query.priority;
    }
    next();
}