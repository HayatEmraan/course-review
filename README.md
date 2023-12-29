# L2-B2-Assignment-4

This assignment builds upon the foundation laid in Assignment 3, extending the system to include robust user authentication, authorization, and user-related information.

created a TypeScript-powered Node.js Express application that integrated MongoDB and Mongoose for user and admin administration of courses and reviews. Use Zod to validate data to guarantee its integrity.

## Technology Stack:

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Data Modeling (ODM) and Validation Library:** Mongoose for MongoDB

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-HayatEmraan

   ```

2. Navigate to the project directory:

   ```bash
   npm install
   # or
   yarn
   ```

3. First, run the development server:
   ```bash
   // locally deployment 
   npm run dev    
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev

   // producation deployment
    npm run build
    # then
    npm start
   ```

## DotENV Configuration
 ```bash
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017
   PORT=5000
   JWT_SECRET_TOKEN=require("crypto").randomBytes(32).toString("hex")
   BCRYPT_SALT=10
   ```



## API Reference
[view postman](https://documenter.getpostman.com/view/27606520/2s9YsDitkb)
