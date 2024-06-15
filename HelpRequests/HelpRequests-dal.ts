import { Collection,ObjectId} from "mongodb";
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
            return await this.collection.find(filter).toArray();
        }
        catch (err: any) {
            throw new Error(`Failed to get emails from DB: ${err}`);

        }

    }
    // public async getHelpRequestById(id: string): Promise<HelpRequest | null> {
    //     try {
    //         const objectId = new ObjectId(id);
    //         return await this.collection.findOne({ _id: objectId });
    //     } catch (err: any) {
    //         throw new Error(`Failed to get help request from DB: ${err}`);
    //    }
    public async getHelpRequestById(id: string): Promise<HelpRequest | null> {
        try {
            // Using string ID directly in the query
            const helpRequest = await this.collection.findOne({ _id: id });
            return helpRequest;
        } catch (err: any) {
            throw new Error(`Failed to get help request from DB: ${err}`);
        }
    }
   
}