export interface Volunteer {
    _id?: string; // ID של המתנדב, אופציונלי כי הוא נוצר אוטומטית ב-MongoDB
    name: string;
    email: string;
    phone: string;
}

export interface HelpRequest {
    _id?: string; // ID של הבקשה, אופציונלי כי הוא נוצר אוטומטית ב-MongoDB
    title: string;
    description: string;
    location: string;
    status: HelpRequestStatus; // "open", "in progress", "closed"
    priority: HelpRequestPriority; // "low", "medium", "high"
    volunteerId?: string; // ID של המתנדב אם הוקצה


}
export type HelpRequestStatus = 'open' | 'in progress' | 'closed';
export type HelpRequestPriority = 'low' | 'medium' | 'high';
