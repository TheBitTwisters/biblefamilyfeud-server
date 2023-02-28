import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';
import routes from './routes';

import AppError from './utils/app-error';
import ErrorHandler from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use('/lists', routes.list);
app.use('/list-items', routes.listItem);

app.all('*', (req, res, next) => {
  next(
    new AppError(`The URL ${req.originalUrl} does not exists`, 404)
  );
});
app.use(ErrorHandler);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log('Server listening on port ' + process.env.PORT)
  );
});
