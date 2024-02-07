import express, { Request, Response } from "express";
const app = express();
const port = 3001;
import main from './src/services/database';
import userRouter from "./src/routes/userRoutes";
import allergyRouter from "./src/routes/allergyRoutes";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter)
app.use(allergyRouter)

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`serveur port: ${port}`);
});


main(); 