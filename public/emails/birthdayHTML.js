import dotenv from "dotenv";
dotenv.config();

export const birthdayHTML = (recipient, name) => {
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
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="header">
          <h1>🥳 Birthday Reminder 🥳</h1>
        </div>
       
        <div class="content">
          <p>Hello ${recipient},</p>
          <h2>Today is ${name}'s birthday 🎂</h2>
          <p>Don't forget to congratulate ${name} properly 🎉</p>
        </div>
        <div class="footer">
          <p>Best regards,<br>✨ ${process.env.PROJECT_NAME} ✨</p>
        </div>
      </div>
    </body>
    
    </html>
    `;
};
