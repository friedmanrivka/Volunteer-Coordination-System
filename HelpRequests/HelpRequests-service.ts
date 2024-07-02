// import uuid from 'uuid';
import HelpRequestsDal from "./HelpRequests-dal";
import { HelpRequest,HelpRequestPriority,HelpRequestStatus } from "../utils/type";
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
    public async getHelpRequestsByPriority(priority: HelpRequestPriority): Promise<HelpRequest[]> {
        console.log('service: getHelpRequestsByPriority');
        return this.helpRequestsDal.getHelpRequestsByPriority(priority);
    }
    public async getHelpRequestsByStatus(status: HelpRequestStatus): Promise<HelpRequest[]> {
        console.log('service: getHelpRequestsByStatus');
        return this.helpRequestsDal.getHelpRequestsByStatus(status);
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