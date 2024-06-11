// import uuid from 'uuid';
import HelpRequestsDal from "./HelpRequests-dal";
import { HelpRequest } from "../utils/type";
export default class HelpRequestsService{
    constructor(private helpRequestsDal: HelpRequestsDal)
    {

    }
    public async getHelpRequests(filter:any):Promise<HelpRequest[]>{
        return this.helpRequestsDal.getHelpRequests(filter);
    }
}