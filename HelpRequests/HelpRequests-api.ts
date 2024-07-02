import { Router, Request, Response } from 'express';
import HelpRequestsService from './HelpRequests-service';
// import { extractLocation, extractStatus, extractPriority,validateHelpRequest } from './middlewares'
import { extractLocation, extractStatus, extractPriority, validateHelpRequest } from './middlewares'
import { HelpRequest,HelpRequestPriority,HelpRequestStatus } from '../utils/type';
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
        this.router.get('/location/:location', async (req: Request, res: Response) => {
            try {
                const { location } = req.params;
                const helpRequests = await this.helpRequsetsService.getHelpRequestByLocation(location);
                if (!helpRequests) {
                    return res.status(404).send('The requested help request could not be found.');
                }
                res.status(200).json(helpRequests);
            } catch (err: any) {
                res.status(500).send(err.message);
            }
        });
        this.router.get('/', async (req: Request, res: Response) => {
            const priority = req.query.priority as HelpRequestPriority;
        
            if (priority && !['low', 'medium', 'high'].includes(priority)) {
                return res.status(400).send('Invalid priority value');
            }
        
            try {
                let helpRequests: HelpRequest[];
                if (priority) {
                    console.log(`Fetching help requests with priority ${priority}`);
                    helpRequests = await this.helpRequsetsService.getHelpRequestsByPriority(priority);
                } else {
                    console.log('Fetching all help requests');
                    helpRequests = await this.helpRequsetsService.getHelpRequests({});
                }
        
                if (!helpRequests || helpRequests.length === 0) {
                    return res.status(404).send('No help requests found.');
                }
        
                res.status(200).json(helpRequests);
            } catch (err: any) {
                console.error('Failed to get help requests:', err.message);
                res.status(500).send(`Failed to get help requests: ${err.message}`);
            }
        });
       this. router.get('/', async (req: Request, res: Response) => {
            const status = req.query.status as HelpRequestStatus;
        
            if (status && !['open', 'in progress', 'closed'].includes(status)) {
                return res.status(400).send('Invalid status value');
            }
        
            try {
                let helpRequests: HelpRequest[];
                if (status) {
                    console.log(`Fetching help requests with status ${status}`);
                    helpRequests = await this.helpRequsetsService.getHelpRequestsByStatus(status);
                } else {
                    console.log('Fetching all help requests');
                    helpRequests = await this.helpRequsetsService.getHelpRequests({});
                }
        
                if (!helpRequests || helpRequests.length === 0) {
                    return res.status(404).send('No help requests found.');
                }
        
                res.status(200).json(helpRequests);
            } catch (err: any) {
                console.error('Failed to get help requests:', err.message);
                res.status(500).send(`Failed to get help requests: ${err.message}`);
            }
        });
        
        this.router.post('/', validateHelpRequest, async (req: Request, res: Response) => {
            console.log('api');
            const { _id, title, description, location, priority, volunteerId, contactInfo } = req.body;
            const helpRequest: HelpRequest = {
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
                const newHelpRequest = await this.helpRequsetsService.addHelpRequest(helpRequest)

                // const newHelpRequest = await helpRequestsService.addHelpRequest(helpRequest);
                res.status(201).json(newHelpRequest);
            } catch (err: any) {
                res.status(500).send(`Failed to create help request: ${err.message}`);
            }
        });

        this.router.put('/:id/volunteer', async (req: Request, res: Response) => {
            const _id = req.params.id;
            const { volunteerId } = req.body;

            if (!volunteerId) {
                return res.status(400).send('Volunteer ID is required');
            }

            try {
                console.log(`Assigning volunteer ${volunteerId} to help request ${_id}`);
                const updatedHelpRequest = await this.helpRequsetsService.assignVolunteer(_id, volunteerId);
                if (!updatedHelpRequest) {
                    return res.status(404).send('The help request could not be found.');
                }

                res.status(200).json(updatedHelpRequest);
            } catch (err: any) {
                console.error('Failed to assign volunteer:', err.message);
                res.status(500).send(`Failed to assign volunteer: ${err.message}`);
            }
        });


        this.router.put('/:id/close', async (req: Request, res: Response) => {
            const _id = req.params.id;

            try {
                console.log(`Closing help request ${_id}`);
                const updatedHelpRequest = await this.helpRequsetsService.closeRequest(_id);
                if (!updatedHelpRequest) {
                    return res.status(404).send('The requested help request could not be found.');
                }

                res.status(200).json(updatedHelpRequest);
            } catch (err: any) {
                if (err.statusCode === 400) {
                    return res.status(400).send('The request is already closed.');
                }
                console.error('Failed to close help request:', err.message);
                res.status(500).send(`Failed to close help request: ${err.message}`);
            }
        });





    }
}