export interface Volunteer {
    _id?: string; 
    name: string;
    email: string;
    phone: string;
}

export interface HelpRequest {
    _id?: string; 
    title: string;
    description: string;
    location: string;
    status: HelpRequestStatus; 
    priority: HelpRequestPriority; 
    volunteerId?: string; 
    contactInfo?: {
        phone?: string;
        email?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
export type HelpRequestStatus = 'open' | 'in progress' | 'closed';
export type HelpRequestPriority = 'low' | 'medium' | 'high';
