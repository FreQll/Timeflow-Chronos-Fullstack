# Timeflow

### What is it? | [TimeFlow in Action](https://youtu.be/NWO5AE3KszI?si=QXqBJjd8AXXdGT3v)

Introducing Uevent – Your Ultimate Event Management Calendar

TimeFlow is a cutting-edge event management calendar meticulously designed to streamline the scheduling process for events. 
Built with advanced technologies including React, Tailwind CSS, Shadcn/ui, and backend by the robust PostgreSQL database coupled with Prisma ORM and Express.js, 
TimeFlow offers an unparalleled experience in event coordination and organization.

----

### Setup

1. Firstly download project from this page, something like this and move to folder:

```bash
git clone https://github.com/FreQll/Timeflow-Chronos-Fullstack.git
cd chronos-api
```

2. Then you need to setup **backend part**, for this:
   
    - Go to backend folder and install packages for it
      ``` bash
      cd backend
      npm i
      ```
    - Install Postgres and confirgure it, also change settings that will work for you in .env file, [full instruction here](https://github.com/FreQll/Chronos-API/tree/main/backend)
    - Run server
      ```bash
      npm run start
      ```
      
3. Then you need to setup **frontend part**, for this:
   - In project folder install all packages
     ```bash
     npm i
     ```
   - Run React application
     ```bash
     npm run dev
     ```

----

### Technology Stack

- #### FrontEnd Part

    [![FrontEnd](https://skillicons.dev/icons?i=react,tailwind,redux,vite&perline=4)](https://skillicons.dev)

    *Shadcn/ui as component library, axios, react-router*

- #### BackEnd Part

    [![BackEnd](https://skillicons.dev/icons?i=js,nodejs,express,postgres,prisma&perline=4)](https://skillicons.dev)

    *And also JWT for authorization, Nodemailer (for emails) and Postman for testing API.*

----

### API Documentation 

Full Documentation for Chronos API you can find [here](https://github.com/FreQll/Chronos-API/tree/main/backend)
