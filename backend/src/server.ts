import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { startSearch } from './controllers/searchController';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../build')));

app.post('/api/search', startSearch);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT: number = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
