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
    
    public async getHelpRequestById(id: string): Promise<HelpRequest | null> {
        return this.helpRequestsDal.getHelpRequestById(id);
    }

    public async addHelpRequest(helpRequest: HelpRequest): Promise<HelpRequest> {
        console.log('service')
        return this.helpRequestsDal.addHelpRequest(helpRequest);
    }
    public async assignVolunteer(_id: string, volunteerId: string): Promise<HelpRequest | null> {
        console.log('service: assignVolunteer');
        return this.helpRequestsDal.assignVolunteer(_id, volunteerId);
    }
    public async closeRequest(_id: string): Promise<HelpRequest | null> {
        console.log('service: closeRequest');
        return this.helpRequestsDal.closeRequest(_id);
    }
    
    
}