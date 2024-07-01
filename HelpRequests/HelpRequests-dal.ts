import { Collection} from "mongodb";
import DBConnect from "../utils/db-connect";
import { HelpRequest } from "../utils/type";


const HELPREQUESTS_COLLECTION_NAME = 'Help Requests';
export default class HelpRequestsDal {
    private collection: Collection<HelpRequest>;
    constructor(dbConn: DBConnect) {
        this.collection = dbConn.getDB().collection(HELPREQUESTS_COLLECTION_NAME);
    }
    public async getHelpRequests(filter: any): Promise<HelpRequest[]> {
        try {
            filter.status = { $ne: "closed" };
            return await this.collection.find(filter).toArray();
        }
        catch (err: any) {
            throw new Error(`Failed to get emails from DB: ${err}`);

        }

    }
    public async getHelpRequestById(id: string): Promise<HelpRequest | null> {
        try {
          
            const helpRequest = await this.collection.findOne({ _id: id });
            return helpRequest;
        } catch (err: any) {
            throw new Error(`Failed to get help request from DB: ${err}`);
        }
    }
   public async addHelpRequest(helpRequest: HelpRequest): Promise<HelpRequest> {
        console.log('dal')
        try {
            const result = await this.collection.insertOne(helpRequest);
            return { ...helpRequest, _id: result.insertedId.toString()};
        } catch (err: any) {
            throw new Error(`Failed to add help request to DB: ${err}`);
        }
    }
    public async assignVolunteer(_id: string, volunteerId: string): Promise<HelpRequest | null> {
        console.log('dal: assignVolunteer');
        try {
            console.log(`Updating help request with _id: ${_id} to assign volunteer: ${volunteerId}`);
            const existingHelpRequest = await this.collection.findOne({ _id: _id });
            if (!existingHelpRequest) {
                console.error(`No help request found with _id: ${_id}`);
                throw new Error('Failed to find help request');
            }
            console.log('Existing help request:', existingHelpRequest);
            const result = await this.collection.updateOne(
                { _id: _id },
                { $set: { status: 'in progress', volunteerId: volunteerId, updatedAt: new Date() } }
            );
           if (result.matchedCount === 0) {
                console.error(`No help request found with _id: ${_id} after update`);
                throw new Error('Failed to update help request');
            }
         const updatedHelpRequest = await this.collection.findOne({ _id: _id });
            if (!updatedHelpRequest) {
                console.error(`No help request found with _id: ${_id} after update`);
                throw new Error('Failed to retrieve updated help request');
            }
    
            console.log('Help request updated successfully:', updatedHelpRequest);
            return updatedHelpRequest;
        } catch (err: any) {
            console.error('Error in assignVolunteer:', err);
            throw new Error(`Failed to assign volunteer: ${err}`);
        }
    }
    public async closeRequest(_id: string): Promise<HelpRequest | null> {
        console.log('dal: closeRequest');
        try {
            console.log(`Closing help request with _id: ${_id}`);
           
            const existingHelpRequest = await this.collection.findOne({ _id: _id });
            if (!existingHelpRequest) {
                console.error(`No help request found with _id: ${_id}`);
                throw new Error('Failed to find help request');
            }
            console.log('Existing help request:', existingHelpRequest);
            
            const result = await this.collection.updateOne(
                { _id: _id },
                { $set: { status: 'closed', updatedAt: new Date() } }
            );
    
            if (result.matchedCount === 0) {
                console.error(`No help request found with _id: ${_id} after update`);
                throw new Error('Failed to update help request');
            }
    
           
            const updatedHelpRequest = await this.collection.findOne({ _id: _id });
            if (!updatedHelpRequest) {
                console.error(`No help request found with _id: ${_id} after update`);
                throw new Error('Failed to retrieve updated help request');
            }
    
            console.log('Help request closed successfully:', updatedHelpRequest);
            return updatedHelpRequest;
        } catch (err: any) {
            console.error('Error in closeRequest:', err);
            throw new Error(`Failed to close help request: ${err}`);
        }
    }
    
     
   
}