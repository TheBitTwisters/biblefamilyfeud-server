import { Router } from 'express';
import { sign } from '../middlewares/auth';
import AppError from '../utils/app-error';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    if (req.body.password === process.env.MASTER_PASSWORD) {
      var signed = sign(req.body.password);
      return res.status(200).json({
        token: signed.token,
        expiresIn: signed.expiresIn,
      });
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
});

export default router;
