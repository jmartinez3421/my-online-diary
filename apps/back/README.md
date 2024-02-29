# My Online Diary - Server


## Description

In this project we will store the code from the server of the app. 

It will be a REST server created with Node - Express - Mongoose.

## Schemas
In this server we will have two Schemas: <b>Users</b> and <b>Pages</b>.

### Users
In the User schema we will save the information relative to the users: 


- The presentation will be displayed in the first page if they export the diary.

- They will be able to Sign In with Google.

- They can delete their own account, but for security it will only be deactivated changing the status to false.

- Each user will have a safe question to recover his password in the case that he forget it. The answer to this question will be encrypted as if it was a password.
````typescript
class User {
    name: string;
    email: string;
    password: string;
    safeQuestion: {
        question: string;
        answer: string;
    };
    presentation: string;
    google: boolean;
    status: boolean
}
````

### Pages
In the Pages schema we will save the data that the users writes in his Diary:
- The user will only be able to change the main content on the day it belongs to the Diary's page.

- Every page will have a notes attribute that can be modified at any time.

- Every page will have a feeling, which will correspond to how the user feels that day.

- They will also have a music attribute were they will be able to save the url of a song that reminds them of that day.

- Of course every page will have the date it was written and will belong to a user that will be the only one able to read it.

- The main content of the page will be encrypted using <i>crypto -js</i>

- The pages can be disabled so that they don't appear in the app.

````typescript
class Page {
    date: Date;
    feeling: ['happy', 'normal', 'sad'];
    main: string;
    notes: string;
    music: string;
    status: boolean;
}
````

## Routes
The routes of the server will be the next ones:

### Users - <small><i>/api/users</i></small>

### Auth - <small><i>/api/auth</i></small>

### Pages - <small><i>/api/pages</i></small>

### Search - <small><i>/api/search</i></small>


## Packages
We will need the following libraries to develop the server:
- bcryptjs

- cors

- crypto-js

- dotenv

- express

- express-validator

- google-auth-library

- jsonwebtoken

- mongoose

