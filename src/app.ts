import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// main route
app.use("/api/users", UserRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello assignment!')
};

app.get("/", getController);

export default app;