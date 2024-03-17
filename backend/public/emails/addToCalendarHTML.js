import dotenv from "dotenv";
dotenv.config();

export const addToCalendarHTML = (
  recipient,
  calendarOwner,
  calendarName,
  link
) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
      <title>🥳 Birthday Reminder 🥳</title>
      <style>
        * {
          font-family: "Montserrat", sans-serif;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
        }
    
        .header {
          padding: 20px;
          text-align: center;
        }
    
        .content {
          padding: 20px;
          text-align: center;
          border: 2px dashed black;
        }
    
        p {
          color: #555;
          line-height: 1.6;
          font-size: 20px;
        }
    
        .footer {
          color: white;
          padding: 10px;
          text-align: center;
        }
        
        .cta-button {
          display: inline-block;
          border: dashed 1px;
          color: black;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 10px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="header">
          <h1>🗓️ ${calendarOwner} wants to add you to the calendar 🗓️</h1>
        </div>
       
        <div class="content">
          <p>Hello ${recipient},</p>
          <p>${calendarOwner} wants to add you to the calendar "${calendarName}". If you want to confirm this, click the button below 👇</p>
          <a href="${link}" class="cta-button">Add to calendar</a>
          <hr>
          <p class="reminder">This link is valid for 1 hour and can be used only once.</p>
        </div>
        <div class="footer">
          <p>Best regards,<br>✨ ${process.env.PROJECT_NAME} ✨</p>
        </div>
      </div>
    </body>
    
    </html>
    `;
};
