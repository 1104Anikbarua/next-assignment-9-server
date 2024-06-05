# **Travel Buddy Matching**

### **Local Setup**

- Clone the repository.
- Install the required dependencies using `npm install`.
- Create a .env file at the root of the project.
- In the .env file, set up the following variables

  - **DATABASE_URL:** Assign your database URL to this variable.
  - **SALT:** Assign the value 10 to this variable.
  - **JWT_ACCESS_SECRET:** Assign a secret string to this variable. You can generate a secret string in Node.js using the command `require('crypto').randomBytes(64).toString('hex')`.
  - **JWT_EXPIRES_IN:** Assign the token’s expiration time to this variable (e.g., ‘1d’, ‘1h’, ‘30m’).

  - **JWT_REFRESH_SECRET:** Assign a secret string to this variable. You can generate a secret string in Node.js using the command `require('crypto').randomBytes(64).toString('hex')`.
  - **JWT_REFRESH_EXPIRES_IN:** Assign the token’s expiration time to this variable (e.g., ‘1d’, ‘1h’, ‘30m’).

  * Run the project using `npm run dev`.

### **Technology Used in Travel Buddy**

- **Programming language:** Typescript

* **Web Framework:** Express.js
* **Object Relational Mapping:** Prisma with postgreSQL
* **Authentication:** JWT(JSON WEB TOKEN)
* **Data Validation:** ZOD
* **Hash Password:** Bcrypt

## **Features:**

- **User Registration:**

  - Travel Buddy allows users to register and create a profile.
    Upon successful registration, the user’s data is stored securely in our database, and the user can start using the features of Travel Buddy.

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password"
  }
  ```

* **User Login:**

  - Travel Buddy provides a secure login feature for users. Here’s an example of the data a user can provide to log in:

  ```json
  {
    "email": "john@example.com",
    "password": "password"
  }
  ```

  - Upon successful login, users gain access to a variety of features:
    **Update User Profile:** Users can update their profile information to keep it current and accurate.
    **Create Trip:** Users can create new trips, specifying details such as the destination, duration, and preferences.
    **Request Buddy for a Trip:** Users can browse through other users’ profiles and send buddy requests for their trips.
    **Get Own Profile:** Users can view their own profile, including their bio, age, past trips, and more.

- **Create a trip:**

  - Authenticated users in Travel Buddy have the ability to create a new trip. Here’s an example of the data a user can provide to create a trip

  ```json
  {
    "destination": "Paris, France",
    "description": "A tourist attraction is a place of interest that tourists visit, typically for its inherent or an exhibited natural or cultural value, historical significance, natural or built beauty, offering leisure and amusement.",
    "photos": ["photo link"],
    "travelType": "ADVENTURE",
    "startDate": "2024-06-01",
    "endDate": "2024-06-07",
    "budget": 1500,
    "Location": ["Eiffel Tower visit", "Louvre Museum tour"],
    "activities": ["shopping", "meuseum"]
  }
  ```

  - Upon successful creation, the trip details are stored in our database, and the user can view their trip itinerary, update it, or share it with others.

  - **Edit a trip:**

  - Users can update their posted trip with necessary information.

  - **Delete a trip:**

  - Users can delete their posted trip.

  - **Change Password:**

  - User can change password.

- **Get Paginated and Filtered Trips:**

  - Travel Buddy offers a comprehensive search feature that allows users to find their ideal travel destination based on their preferences. Users can search for destinations within their budget and filter the results based on various parameters.

- **Send Travel Buddy Request:**

  - In Travel Buddy, users have the ability to send a Travel Buddy Request to other users. This feature allows users to connect with each other and plan trips together.

- **Get Potential Travel Buddies For a Specific Trip:**

  - Travel Buddy allows users to find potential travel buddies for a specific trip. Users can browse through the profiles of other users who are interested in the same destination and send them a Travel Buddy Request.

  <!-- - **Approve:** If the user approves the request, the two users become travel buddies and can start planning their trip together.
  - **Reject:** If the user rejects the request, the sender will be notified that their request has been declined.
  - **Ignore:** If the user chooses not to respond, the request will remain pending. -->

- **Get User Profile:**

  - Travel Buddy allows users to view their own profile. This feature provides users with access to their personal information and settings, allowing them to review and update their details as needed.

- **Update User Profile:**

  - Travel Buddy provides users with the ability to update their profile. Users can change their personal information and settings to keep their profile up-to-date. This feature ensures that the user’s information is always current and accurate.

    ```json
    {
      "name": "John Sina",
      "email": "john.doe@example.com"
    }
    ```

- **ADMIN:**

  **TRIPS:**

  - Admin can update trips

  - Admin can delete trips

  **User Management:**

  - Admin can block and unblock user

  - Admin can change User role

  - Admin can update profile

- **SUPERADMIN:**

  **User Management:**

  **TRIPS:**

  - Super Admin dmin can update trips

  - Super Admin dmin can delete trips

  **User Management:**

  - Super admin can create user super admin or admin

  - Super Admin can block and unblock user

  - Super Admin can change User role

  - Super Admin can update profile

### **Live Url Link:** **https://next-assignment-9-server.vercel.app/api/v1/**
