import _ from 'lodash';
import jwt from 'jsonwebtoken';

const JWT_KEY = 'google-drive-clone';

export const USER = 'user';
export const JWT_COOKIE_NAME = 'auth_token';

export const signJWTData = (data) => jwt.sign(data, JWT_KEY);

export const authRequired = () => (req, res, next) => {
  if (!req.user) {
    next(new Error('Authentication is required for this request'));
  }

  next();
};

const fetchTokenValue = (request) => {
  const cookieArray = request.headers.cookie
    .split(';')
    .filter((cookie) => cookie.indexOf(JWT_COOKIE_NAME) !== -1);
  if (cookieArray.length < 1) {
    return '';
  }
  const value = cookieArray[0].split('=')[1];
  return value;
};

export const fetchAuthentication = (req, res, next) => {
  try {
    if (req.headers.cookie) {
      const tokenValue = fetchTokenValue(req);
      if (tokenValue) {
        const data = jwt.verify(tokenValue, JWT_KEY);
        req.user = data;
      }
    }else{
      console.log('\n\n\n NO COOKIE ATTACHED')
    }
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.clearCookie(JWT_COOKIE_NAME, {});
    }
    next();
  }
};

export default fetchAuthentication;

