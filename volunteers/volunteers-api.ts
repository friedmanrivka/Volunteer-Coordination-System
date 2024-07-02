import { Router, Request, Response } from 'express';
import VolunteersService from './volunteers-service'
import { validateVolunteer } from './middlewares';
import { Volunteer } from '../utils/type';

export default class volunteerApi{
    public router:Router;
    constructor(private volunteersService : VolunteersService ){
        this.router = Router();
        this.setRoutes();
    }
    private setRoutes() {
        this.router.post('/', validateVolunteer,async (req: Request, res: Response) => {
            console.log('api');
            try {
                const {  _id,name, email, phone} = req.body as Volunteer; // Destructure the request body

                if (!name || !email || !phone) {
                    return res.status(400).send('Name, email, and phone are required');
                }

                const volunteerData: Volunteer = {
                    _id ,
                    name,
                    email,
                    phone,
                 
                };

                const newVolunteer = await this.volunteersService.createVolunteer(volunteerData);
                res.status(201).json(newVolunteer);
            } catch (err: any) {
                res.status(500).send(err.message);
            }
}
)
}
}