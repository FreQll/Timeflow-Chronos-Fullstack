import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
    return res.send("Hello World");
});

app.listen(3000, "localhost", () => {
    console.log(`Server is alive on http://localhost:3000`);
})