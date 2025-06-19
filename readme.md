
# Features

1. Sign UP
2. Login
3. Authorization using JWT
4. creating Goals & SubGoals
5. edit Goals in place
6. separate views for public and private goals
7. custom ordering + Drag (not Implemented yet)
8. delete Node (not implemented yet)

# Database

- DB structure 
    - **User Collection**
        ```Typescript
        {
            "_id": ObjectId,
            "name": String,
            "email": String,
            "password": String,  // hashed
            "createdAt": ISODate(),
            "updatedAt": ISODate(),
        }
        ```
            

    - **Goals Collection**
        ```Typescript
        {
            "_id": ObjectId,
            "title": String,
            "description": String,
            "deadline": ISODate(),
            "isPublic": Boolean,
            "order": Number,
            "ownerId": ObjectId(),
            "childGoals": [
                ObjectId(),
                ObjectId()
            ],
            "publicId": ObjectId()   
        }
        ```

- **Why Using MongoDb**
    - suits the free nested structure of the Goals

    - Mongo saves more space than SQL here because the data most of the time is sparse 
        , not all of the fields are populated in most cases

# How to use
    https://share.vidyard.com/watch/PB8ztZiuA1uAXGyChLQ9G9 

# How to Run the Project

1. **Node.js Version**  
   Both the frontend and backend require **Node.js v20**.

2. **Start MongoDB and Mongo Express**  
   Use Docker Compose to start MongoDb + Mongo Express:

   ```bash
   docker compose up -d
   ```

3. **Run Front End**

    - install dependencies
        ```bash
        npm i
        ```
   
    - run the application 
        ```bash
        npm run start
        ```

4. **Run Back End**
    
    - install dependencies
        ```bash
        npm i
        ```
   
    - run the application 
        ```bash
        npm run start
        ```

