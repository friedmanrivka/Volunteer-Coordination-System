import {HelpRequest} from '../utils/type';
import { Router,Request,Response } from 'express';

export default class HelpRequestApi{
    public router: Router;
    constructor(private helpRequsetsService: HelpRequsetsService){
        this.router = Router();
       this.setRoutes();
    }
    private setRoutes(){
    this.router.get('/')
    }
}