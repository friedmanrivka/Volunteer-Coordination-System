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
            // try {
            //     const id=req.body._id;
            //     const name = req.body.name;
            //     const email = req.body.email;
            //     const phone = req.body.phone;
            //     if (!name || !email || !phone) {
            //         return res.status(400).send('ID,Name, email, and phone are required');
            //     }
            //     const newVolunteer = await this.volunteersService.createVolunteer({ _id,name, email, phone });
            //     res.status(201).json(newVolunteer);
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