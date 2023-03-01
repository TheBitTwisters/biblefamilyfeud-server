import jwt from 'jsonwebtoken';
import AppError from '../utils/app-error';

const sign = function (password) {
  var token = jwt.sign(password, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_TIMESPAN),
  });
  token = process.env.JWT_PREFIX + token;
  return {
    token: token,
    expiresIn: Number(process.env.JWT_TIMESPAN),
  };
};

const verify = function (req, res, next) {
  if (req.baseUrl === '/auth') {
    next();
  }
  try {
    var token = req.headers.authorization.replace(
      process.env.JWT_PREFIX,
      ''
    );
    var token_password = jwt.verify(token, process.env.JWT_SECRET);
    if (token_password === process.env.MASTER_PASSWORD) {
      next();
    }
  } catch {}
  next(new AppError('Unauthorized', 403));
};

export { sign };

export default verify;
