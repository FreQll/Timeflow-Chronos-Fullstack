# Chronos-API documentation

### Endpoints:

[Auth Module](#Auth-Module)

[User Module](#User-Module)
 
[Calendar Module](#Calendar-Module)
 
[Event Module](#Event-Module)

----

### How to run

To run API on your computer, firstly download my solution to your PC,
then navigate to project folder (backend) and then run command ```npm install```
to install all packages, then you need to create manually PostgreSQL (or by your choice, then you will need to change some settings in .env file) database and then by running
command  ```npx prisma migrate dev --name init``` , then
you can run application by simply executing   ```npm run start```

> Also you can see database in your browser by running ```npm run studio```

# Auth Module

<details open>
  <summary>Register</summary>

  <br>

  > **POST** `http://localhost:3000/api/auth/register`<br>
  **Body parameters:**
  - email
  - password
  - full_name

  Creates a new user and default calendar for them.
</details>

<details>
  <summary>Login</summary>

  <br>

  > **POST** `http://localhost:3000/api/auth/login`<br>
  **Body parameters:**
  - email
  - password

  Logs in the user and provides an authentication token.
</details>

<details>
  <summary>Logout</summary>

  <br>

  > **POST** `http://localhost:3000/api/auth/logout`<br>
  Logs out the user and clears the authentication token.
</details>

<details>
  <summary>Reset Password</summary>

  <br>

  > **POST** `http://localhost:3000/api/auth/reset-password`<br>
  **Body parameters:**
  - email

  Sends a reset link to the user's email address for password recovery.
</details>

<details>
  <summary>Confirm Reset Password</summary>

  <br>

  > **POST** `http://localhost:3000/api/auth/reset-password/confirm`<br>
  **Body parameters:**
  - newPassword
  - code
  - email

  Confirms the password reset and updates the user's password.
</details>

# User Module

<details open>
  <summary>Get All Users</summary>

  <br>

  > **GET** `http://localhost:3000/api/users/`

  Retrieves information for all users.

</details>

<details>
  <summary>Get User by ID</summary>

  <br>

  > **GET** `http://localhost:3000/api/users/:id`

  Retrieves information for a specific user by ID.

</details>

<details>
  <summary>Create User</summary>

  <br>

  > **POST** `http://localhost:3000/api/users/`

  **Body parameters:**
  - email
  - password
  - full_name

  Creates a new user.

</details>

<details>
  <summary>Update User</summary>

  <br>

  > **PATCH** `http://localhost:3000/api/users/:id`

  **Body parameters:**
  - login
  - email
  - password
  - full_name

  Updates information for a specific user by ID.

</details>

<details>
  <summary>Delete User</summary>

  <br>

  > **DELETE** `http://localhost:3000/api/users/:id`

  Deletes a user by ID.

</details>

<details>
  <summary>Get User Avatar</summary>

  <br>

  > **GET** `http://localhost:3000/api/users/avatar/:login`

  Retrieves the avatar for a user by login.

</details>

<details>
  <summary>Update User Avatar</summary>

  <br>

  > **PATCH** `http://localhost:3000/api/users/avatar/:userId`

  **File parameter:**
  - avatar (upload a file)

  Updates the avatar for a user by ID.

</details>

# Calendar Module

<details open>
  <summary>Get User Calendars</summary>

  <br>

  > **GET** `http://localhost:3000/api/calendars/:id`

  Retrieves calendars for a specific user by ID.

</details>

<details>
  <summary>Get Calendar by ID</summary>

  <br>

  > **GET** `http://localhost:3000/api/calendars/calendarInfo/:calendarId`

  Retrieves information for a specific calendar by ID.

</details>

<details>
  <summary>Get All Calendar Events</summary>

  <br>

  > **GET** `http://localhost:3000/api/calendars/allEvents/:id`

  Retrieves all events associated with a specific calendar by ID.

</details>

<details>
  <summary>Get Calendar Events by Time</summary>

  <br>

  > **GET** `http://localhost:3000/api/calendars/getEventsByTime/:id`

  **Query parameters:**
  - startDate
  - endDate

  Retrieves calendar events for a specific time range in format "DD-MM-YYYY".

</details>

<details>
  <summary>Confirm Adding User to Calendar</summary>

  <br>

  > **GET** `http://localhost:3000/api/calendars/addUserToCalendar/:id/:token`

  Confirms the user's addition to a calendar.

</details>

<details>
  <summary>Create Calendar</summary>

  <br>

  > **POST** `http://localhost:3000/api/calendars/`

  **Body parameters:**
  - name
  - color
  - description
  - userId

  Creates a new calendar.

</details>

<details>
  <summary>Update Calendar</summary>

  <br>

  > **PATCH** `http://localhost:3000/api/calendars/:id`

  **Body parameters:**
  - name
  - color
  - description

  Updates information for a specific calendar by ID.

</details>

<details>
  <summary>Delete Calendar</summary>

  <br>

  > **DELETE** `http://localhost:3000/api/calendars/:id`

  Deletes a calendar by ID.

</details>

<details>
  <summary>Add User to Calendar</summary>

  <br>

  > **POST** `http://localhost:3000/api/calendars/addUserToCalendar`

  **Body parameters:**
  - email
  - ownerId
  - calendarId
  - role

  Adds a user to a calendar and sends a confirmation email.

</details>

# Event Module

<details open>
  <summary>Get All Events</summary>

  <br>

  > **GET** `http://localhost:3000/api/events/`

  Retrieves information for all events.

</details>

<details>
  <summary>Get Event by ID</summary>

  <br>

  > **GET** `http://localhost:3000/api/events/eventInfo/:eventId`

  Retrieves information for a specific event by ID.

</details>

<details>
  <summary>Get User Events</summary>

  <br>

  > **GET** `http://localhost:3000/api/events/:id`

  Retrieves events for a specific user by ID.

</details>

<details>
  <summary>Confirm Adding User to Event</summary>

  <br>

  > **GET** `http://localhost:3000/api/events/addUserToEvent/:id/:token`

  Confirms the user's addition to an event.

</details>

<details>
  <summary>Create Event</summary>

  <br>

  > **POST** `http://localhost:3000/api/events/`

  **Body parameters:**
  - name
  - color
  - content
  - start
  - end
  - type
  - userId
  - calendarId
  - remindDelay - if it is reminder type event, also by default it equals 15 min. before event start

  Creates a new event.

</details>

<details>
  <summary>Update Event</summary>

  <br>

  > **PATCH** `http://localhost:3000/api/events/:id`

  **Body parameters:**
  - name
  - color
  - content
  - start
  - end
  - type

  Updates information for a specific event by ID.

</details>

<details>
  <summary>Delete Event</summary>

  <br>

  > **DELETE** `http://localhost:3000/api/events/:id`

  Deletes an event by ID.

</details>

<details>
  <summary>Add User to Event</summary>

  <br>

  > **POST** `http://localhost:3000/api/events/addUserToEvent`

  **Body parameters:**
  - email
  - ownerId
  - role
  - eventId

  Adds a user to an event and sends a confirmation email.

</details>

