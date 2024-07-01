import VolunteersDal from "./volunteers-dal";
import { Volunteer } from "../utils/type";

export default class VolunteersService {
    constructor(private volunteersDal: VolunteersDal) {}
    public async createVolunteer(data: Volunteer): Promise<Volunteer> {
        console.log('service')
        return this.volunteersDal.createVolunteer(data);
    }
}
