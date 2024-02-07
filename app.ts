import express, { Request, Response } from "express";
const app = express();
const port = 3001;
import main from './src/services/database';
import router from "./src/routes/userRoutes";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '');
//   res.header('Access-Control-Allow-Methods', '');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`serveur port: ${port}`);
});


main(); 