import { Router, Request, Response } from 'express';
import VolunteersService from './volunteers-service'
import { extractName, extractEmail, extractPhone } from './middlewares';
import { Volunteer } from '../utils/type';

export default class volunteerApi{
    public router:Router;
    constructor(private volunteersService : VolunteersService ){
        this.router = Router();
        this.setRoutes();
    }
    private setRoutes() {
        this.router.post('/', async (req: Request, res: Response) => {

            console.log('api');

            try {
                const { name, email, phone, _id } = req.body as Volunteer; // Destructure the request body

                if (!name || !email || !phone) {
                    return res.status(400).send('Name, email, and phone are required');
                }

                const volunteerData: Volunteer = {
                    name,
                    email,
                    phone,
                    _id // Include _id if provided
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