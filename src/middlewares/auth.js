import jwt from 'jsonwebtoken';
import AppError from '../utils/app-error';

const sign = function (password) {
  var token = jwt.sign(
    { password: password },
    process.env.JWT_SECRET,
    {
      expiresIn: Number(process.env.JWT_TIMESPAN),
    }
  );
  token = process.env.JWT_PREFIX + token;
  return {
    token: token,
    expiresIn: Number(process.env.JWT_TIMESPAN),
  };
};

const verify = async function (req, res, next) {
  if (req.path.startsWith('/auth')) {
    return next();
  }
  try {
    var token = req.headers.authorization.replace(
      process.env.JWT_PREFIX,
      ''
    );
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.password === process.env.MASTER_PASSWORD) {
      return next();
    }
  } catch {}
  next(new AppError('Unauthorized', 403));
};

export { sign };

export default verify;
