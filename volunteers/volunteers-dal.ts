import { Collection } from "mongodb";
import DBConnect from "../utils/db-connect";
import { Volunteer } from "../utils/type";

const VOLUNTEERS_COLLECTION_NAME = 'Volunteers';
export default class VolunteersDal {
    private collection: Collection<Volunteer>;

    constructor(dbConn: DBConnect) {
        this.collection = dbConn.getDB().collection(VOLUNTEERS_COLLECTION_NAME);
    }

    public async createVolunteer(data: Volunteer): Promise<Volunteer> {
        console.log('dal')
        try {
            const result = await this.collection.insertOne(data);
            if (!result.acknowledged) {
                throw new Error('Failed to insert volunteer');
            }
            const insertedVolunteer = await this.collection.findOne({ _id: result.insertedId });
            if (!insertedVolunteer) {
                throw new Error('Failed to fetch inserted volunteer');
            }
            return insertedVolunteer;

        } catch (err: any) {
            throw new Error(`Failed to create volunteer: ${err}`);
        }
    }
}