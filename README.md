# NodeJS Final Project Assessment
## Volunteer Coordination System

### Project Description

This project is a fully functional Volunteer Coordination System developed with NodeJS and TypeScript. The system facilitates seamless communication and coordination between volunteers and individuals or organizations seeking assistance. It provides essential features such as managing help requests, allowing volunteers to respond to these requests, registering new volunteers, and updating request statuses as they are addressed.

### Requirements
#### Key Functionalities
1. **Retrieve Help Requests:**
   -  API endpoint to retrieve open help request.
   - Includes filters  by location, status, and priority level.

2. **View Request Details:**
   - An API endpoint provides detailed information about a specific help request.

3. **Volunteer Registration:**
   - API endpoint allowing new volunteers to register in the system,capturing essential details.

4. **Raise Help Request:**
   -  Users can create help requests by providing deatails such as title, description, location, and priority level.

5. **Volunteer for a Request:**
   - Volunteers can respond to help requests,updating the status "in progress" and associating the volunteer with the request.
6. **Close Request:**
   - Volunteers can mark requests as closed once resolved,and the system sendes a notification to update the volunteer on the closure.

7. **Email Notification:**
   - Send an automated email to the volunteer upon closure of the request,confirming the updates status.
### Technologies Used
**Language:**  NodeJS with TypeScript for enhanced type safety
<br>
**Database:** MongoDB for efficient data storage and retrieval
<br>
**Framework:** Express for creating a robust REST API.
<br>
**Email Service:** Nodemailer (or another email service) for sending email notifications upon closure of a request.

### API Endpoints

1. **GET `/api/requests`**
   - **Input:** 
     - **Query Params (optional):**
       - `location`: string (Filter by location)
       - `status`: string (Filter by status: "open", "in progress", "closed")
       - `priority`: string (Filter by priority: "low", "medium", "high")
   - **Output (Success):** 
     - **Status Code:** 200 OK 
     - **Body Schema (Success):**
       ```json
       [
           {
               "_id": "string",
               "title": "string",
               "description": "string",
               "location": "string",
               "status": "string", // Options: "open", "in progress", "closed"
               "priority": "string", // Options: "low", "medium", "high"
               "volunteerId": "string" // ID of the volunteer (if assigned)
           },
           ...
       ]
       ```
   - **Output (Failure - Not Found):**
     - **Status Code:** 404 Not Found 
     - **Reason for Failure:** The requested help requests could not be found.

2. **GET `/api/requests/:id`**
   - **Input:** 
     - **Router Params:**
       - `id`: string (ID of the help request)
   - **Output (Success):**
     - **Status Code:** 200 OK 
     - **Body Schema (Success):**
       ```json
       {
           "_id": "string",
           "title": "string",
           "description": "string",
           "location": "string",
           "status": "string", // Options: "open", "in progress", "closed"
           "priority": "string", // Options: "low", "medium", "high"
           "volunteerId": "string" // ID of the volunteer (if assigned)
       }
       ```
   - **Output (Failure - Not Found):**
     - **Status Code:** 404 Not Found 
     - **Reason for Failure:** The requested help request could not be found.

3. **POST `/api/requests`**
   - **Input:** 
     - **Body:**
       ```json
       {
           "title": "string",
           "description": "string",
           "location": "string",
           "priority": "string" // Options: "low", "medium", "high"
       }
       ```
   - **Output (Success):**
     - **Status Code:** 201 Created
   - **Output (Failure - Bad Request):**
     - **Status Code:** 400 Bad Request 
     - **Reason for Failure:** One or more input parameters are invalid.

4. **POST `/api/requests/:id/volunteer`**
   - **Input:** 
     - **Router Params:**
       - `id`: string (ID of the help request)
     - **Body:**
       ```json
       {
           "volunteerId": "string"
       }
       ```
   - **Output (Success):**
     - **Status Code:** 200 OK 
   - **Output (Failure - Not Found):**
     - **Status Code:** 404 Not Found 
     - **Reason for Failure:** The requested help request could not be found, or the volunteer does not exist.
   - **Output (Failure - Bad Request):**
     - **Status Code:** 400 Bad Request 
     - **Reason for Failure:** One or more input parameters are invalid.

5. **POST `/api/requests/:id/close`**
   - **Input:** 
     - **Router Params:**
       - `id`: string (ID of the help request)
   - **Output (Success):**
     - **Status Code:** 200 OK 
   - **Output (Failure - Not Found):**
     - **Status Code:** 404 Not Found 
     - **Reason for Failure:** The requested help request could not be found.
   - **Output (Failure - Bad Request):**
     - **Status Code:** 400 Bad Request 
     - **Reason for Failure:** The request is already closed.

6. **POST `/api/volunteers`**
   - **Input:** 
     - **Body:**
       ```json
       {
           "name": "string",
           "email": "string",
           "phone": "string"
       }
       ```
   - **Output (Success):**
     - **Status Code:** 201 Created
   - **Output (Failure - Bad Request):**
     - **Status Code:** 400 Bad Request 
     - **Reason for Failure:** One or more input parameters are invalid.

### Technologies

Write the project in `NodeJS` - preferably in `TypeScript`.

You're free to choose the database to use. I recommend using `MongoDB` as it's the most common database to work with NodeJS, but you can work with `SQL`, or even with `JSON` files if you prefer.

You're also free to choose the HTTP server framework. You can use `express` as we did in lessons, but feel free to investigate other packages that provide the same functionality.

### Contact Information
Feel free to reach out via email if you have questions or feedback on the project:
<br>
Email:rivka291@gmail.com

