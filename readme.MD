# **Travel Buddy Matching**

### **Local Setup**

- Clone the repository.
- Install the required dependencies using npm install.
- Create a .env file at the root of the project.
- In the .env file, set up the following variables

* **DATABASE_URL:** Assign your database URL to this variable.
* **SALT:** Assign the value 10 to this variable.
* **JWT_ACCESS_SECRET:** Assign a secret string to this variable. You can generate a secret string in Node.js using the command `require('crypto').randomBytes(64).toString('hex')`.
* **JWT_EXPIRES_IN:** Assign the token’s expiration time to this variable (e.g., ‘1d’, ‘1h’, ‘30m’).

- Run the project using npm run dev.

### **Technology Used in Travel Buddy**

- **Programming language:** Typescript

* **Web Framework:** Express.js
* **Object Relational Mapping:** Prisma with postgreSQL
* **Authentication:** JWT(JSON WEB TOKEN)
* **Data Validation:** ZOD
* **Hash Password:** Bcrypt

## **Features:**

### **Live Url Link:** **http://locoalhost:5000/api/v1**
