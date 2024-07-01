import { Router, Request, Response } from 'express';
import HelpRequestsService from './HelpRequests-service';
// import { extractLocation, extractStatus, extractPriority,validateHelpRequest } from './middlewares'
import { extractLocation, extractStatus, extractPriority } from './middlewares'
import { HelpRequest } from '../utils/type';
export default class HelpRequestApi {
    public router: Router;
    constructor(private helpRequsetsService: HelpRequestsService) {
        this.router = Router();
        this.setRoutes();
    }
    private setRoutes() {
        this.router.get('/', extractLocation, extractStatus, extractPriority, async (req: Request, res: Response) => {
            try {
                const filter: any = {};
                if (res.locals.location) filter.location = res.locals.location;
                if (res.locals.status) filter.status = res.locals.status;
                if (res.locals.priority) filter.priority = res.locals.priority;

                // const helpRequests = await this.helpRequestsService.getHelpRequests(filter);
                const helpRequests = await this.helpRequsetsService.getHelpRequests(filter);
                res.status(200).json(helpRequests);
            } catch (err: any) {
                res.status(500).send(err.message);
            }
        });
        this.router.get('/:id', async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const helpRequest = await this.helpRequsetsService.getHelpRequestById(id);
                if (!helpRequest) {
                    return res.status(404).send('The requested help request could not be found.');
                }

                res.status(200).json(helpRequest);
            } catch (err: any) {
                res.status(500).send(err.message);
            }
        });
        this.router.post('/helprequests', async (req: Request, res: Response) => {
            console.log('api');
            const { _id,title, description, location, priority,volunteerId,contactInfo } = req.body;
         const helpRequest: HelpRequest= {
            _id,
                title,
                description,
                location,
                status: 'open', 
                priority,
                volunteerId,
                contactInfo,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        
            try {
                const newHelpRequest=await this.helpRequsetsService.addHelpRequest(helpRequest)
             
                // const newHelpRequest = await helpRequestsService.addHelpRequest(helpRequest);
                res.status(201).json(newHelpRequest);
            } catch (err: any) {
                res.status(500).send(`Failed to create help request: ${err.message}`);
            }
        });
       
 this.router.put('/helprequests/:id/volunteer', async (req: Request, res: Response) => {
            const _id = req.params.id;
            const { volunteerId } = req.body;
        
            if (!volunteerId) {
                return res.status(400).send('Volunteer ID is required');
            }
        
            try {
                console.log(`Assigning volunteer ${volunteerId} to help request ${_id}`);
                const updatedHelpRequest = await this.helpRequsetsService.assignVolunteer(_id, volunteerId);
                if (!updatedHelpRequest) {
                    return res.status(404).send('The requested help request could not be found.');
                }
        
                res.status(200).json(updatedHelpRequest);
            } catch (err: any) {
                console.error('Failed to assign volunteer:', err.message);
                res.status(500).send(`Failed to assign volunteer: ${err.message}`);
            }
        });
        
        
  
     } }