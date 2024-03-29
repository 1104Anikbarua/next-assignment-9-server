# **Travel Buddy Matching**

### **Use Travel Buddy Locally**

- Clone the repository

- Install required dependencies using npm install

* Create a `.env` variable at the root of the project

* In the `.env` variable create a variable name `DATABAE_URL` and assign the database url to the `DATABASE_URL` variable.Then create a variable name `SALT` and assign value=10 in salt variable.Then create a variable name `JWT_ACCESS_SECRET` and assign a secret string or create a secret using in node in terminal `require('crypto').randomBytes(64).toString('hex')`.Then create a variable called `JWT_EXPIRES_IN` and assign the expire time of the token.After that run the project using `npm run dev`

### **Technology Used in Travel Buddy**

- **Programming language:** Typescript

* **Web Framework:** Express.js
* **Object Relational Mapping:** Prisma with postgreSQL
* **Authentication:** JWT(JSON WEB TOKEN)
* **Data Validation:** ZOD
* **Hash Password:** Bcrypt

## **Features:**

# **Live Url Link:** **http://locoalhost:5000/api/v1**
