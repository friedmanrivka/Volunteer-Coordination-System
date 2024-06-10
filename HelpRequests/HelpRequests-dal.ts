import { Collection } from "mongodb";
import DBConnect from "../utils/db-connect";
import { HelpRequest } from "../utils/type";
import HelpRequestsService from "./HelpRequests-service";

const HELPREQUESTS_COLLECTION_NAME = 'help-requests';
export default class HelpRequestsDal {
    private collection: Collection<HelpRequest>;
    constructor(dbConn: DBConnect) {
        this.collection = dbConn.getDB().collection(HELPREQUESTS_COLLECTION_NAME);
    }
    public async getHelpRequests(filter: Partial<HelpRequest>): Promise<HelpRequest[]> {
        try {
            return await this.collection.find(filter).toArray();
        }
        catch (err: any) {
            throw new Error(`Failed to get emails from DB: ${err}`);

        }

    }
}