import express, { Request, Response } from "express";
const app = express();
const port = 3001;
import main from './services/database';

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`serveur port: ${port}`);
});


main(); 