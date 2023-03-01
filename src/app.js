import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';
import routes from './routes';

import AppError from './utils/app-error';
import ErrorHandler from './middlewares/error-handler';
import AuthVerify from './middlewares/auth';

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
app.use(AuthVerify);

// # basepaths
app.use('/lists', routes.list);
app.use('/list-items', routes.listItem);

// all other paths return 404
app.all('*', (req, res, next) => {
  next(
    new AppError(`The URL ${req.originalUrl} does not exists`, 404)
  );
});
// handle all error
app.use(ErrorHandler);

// connect to mongodb first
connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log('Server listening on port ' + process.env.PORT)
  );
});
