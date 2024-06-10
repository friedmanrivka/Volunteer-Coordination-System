import {HelpRequest} from '../utils/type';
import { Router,Request,Response } from 'express';
import HelpRequestsService from './HelpRequests-service';


export default class HelpRequestApi{
    public router: Router;
    constructor(private helpRequsetsService: HelpRequsetsService){
        this.router = Router();
       this.setRoutes();
    }
    private setRoutes(){
    this.router.get('/requests',validateFilters,extractLocation,extractStatus,extractPriority,this.getHelpRequests.bind(this));
    }
    private async getHelpRequests(req:Request,res:Response){
      try{
        const filter:any={};
        
      }
    }
}