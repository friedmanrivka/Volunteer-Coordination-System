
import { Router, Request, Response } from 'express';
import HelpRequestsService from './HelpRequests-service';
import { extractLocation, extractStatus, extractPriority } from './middlewares'


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


    }
}