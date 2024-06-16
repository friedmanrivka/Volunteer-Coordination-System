import express, { Application } from "express";
import HelpRequestsDal from "./HelpRequests/HelpRequests-dal";
import HelpRequestsService from "./HelpRequests/HelpRequests-service";
import DBConnect from "./utils/db-connect";
import HelpRequestApi from "./HelpRequests/HelpRequests-api";
import VolunteersApi from './volunteers/volunteers-api'
import VolunteersService from './volunteers/volunteers-service'
import VolunteersDal from './volunteers/volunteers-dal'
const PORT = 8080;
const HELP_REQUESTS_API_ROUTE = '/api/requests';

export default class App {
    private dbConn?: DBConnect;
    private app?: Application;

    constructor() {}

    async init() {
        this.dbConn = new DBConnect();
        await this.dbConn.init();

        const helpRequestsDal = new HelpRequestsDal(this.dbConn);
        const helpRequestsService = new HelpRequestsService(helpRequestsDal);
     
        const helpRequestsApi=new HelpRequestApi(helpRequestsService);
        const volunteersDal = new VolunteersDal(this.dbConn);
        const volunteersService = new VolunteersService(volunteersDal);
        const volunteersApi = new VolunteersApi(volunteersService);

        this.app = express();
        this.app.use('/api/volunteers', volunteersApi.router);

        this.app.use(HELP_REQUESTS_API_ROUTE, helpRequestsApi.router);
        this.app.listen(PORT, () => {
            console.log("Server is up");
        });
    }

    // should be called on SIGINT
    public async terminate() {
        await this.dbConn?.terminate();
    }
}