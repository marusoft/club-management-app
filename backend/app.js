import express from "express";
import logger from "morgan";


const app = express();
const port = parseInt(process.env.PORT, 10) || 2021;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'A simple REST design for club management system',
}));

app.get('*', (req, res) => res.status(404).send({
  message: 'API not found',
}));



app.listen(port, () => console.log(`app started on port ${port}`))

export default app;