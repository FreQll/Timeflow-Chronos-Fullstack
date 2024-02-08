import dotenv from "dotenv";
dotenv.config();

export const reminderHTML = (recipient, name, description, time) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <title>⏰ Reminder ⏰</title>
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
    
        .event-details p {
            color: #777;
        }
    
        .footer {
            color: white;
            padding: 10px;
            text-align: center;
        }
        </style>
    </head>
    
    <body>
        <div class="container">
        <div class="header">
            <h1>⏰ Reminder ⏰</h1>
        </div>
        
        <div class="content">
            <p>Hello ${recipient},</p>
            <p>We want to remind you about an upcoming event 📅</p>
            <h2>${name}</h2>
            <hr>
            <div class="event-details">
            <p><b>Date and Time:</b> ${time}</p>
            <p><strong>Description:</strong> ${description}</p>
            </div>
        </div>
        <div class="footer">
            <p>Best regards,<br>✨ ${process.env.PROJECT_NAME} ✨</p>
        </div>
        </div>
    </body>
    
    </html>
    `;
};
