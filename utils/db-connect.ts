import { MongoClient } from "mongodb";
const DB_PASSWORD='IkStmMvfyXtsgXJP';
//TODO
// const DB_URL='mongodb+srv:a0533190528:IkStmMvfyXtsgXJP@volunteercoordinationsy.h8gbwzo.mongodb.net/'
const DB_NAME='VolunteerCoordinationSystem';
//  'mongodb+srv://a0533190528:IkStmMvfyXtsgXJP@volunteercoordinationsy.h8gbwzo.mongodb.net/volunteerCoordinationSystem?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true';

const DB_URL =`mongodb+srv://a0533190528:${DB_PASSWORD}@volunteercoordinationsy.h8gbwzo.mongodb.net/?retryWrites=true&w=majority&appName=volunteercoordinationsy`;

// const DB_URL='mongodb+srv://a0533190528:IkStmMvfyXtsgXJP@volunteercoordinationsy.h8gbwzo.mongodb.net/?retryWrites=true&w=majority&appName=VolunteerCoordinationSystem';
// const DB_URL = 'mongodb+srv://a0533190528:IkStmMvfyXtsgXJP@volunteercoordinationsy.h8gbwzo.mongodb.net/VolunteerCoordinationSystem?retryWrites=true&w=majority';
export default class DBConnect{
    private dbConn:MongoClient;
    constructor(){
        this.dbConn = new MongoClient(DB_URL);
    }
    public async init(){
        const res=await this.dbConn.connect(); 
        console.log("DB is connected");
}
public getDB(dbName:string=DB_NAME)
{
    return this.dbConn.db(dbName);
}
public async terminate(){
    await this.dbConn.close();
    console.log("DB is closed");
}
}
