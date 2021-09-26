import dotenv from "dotenv"
import express from "express";
import logger from "morgan";
import cors from "cors";
import userRouter from "./server/routes/user.route"

dotenv.config();



const app = express();
const port = process.env.PORT || 2021;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', userRouter);

app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'A simple REST design for club management system',
}));

app.get('*', (req, res) => res.status(404).send({
  message: 'API not found',
}));



app.listen(port, () => console.log(`app started on port ${port}`))

export default app;