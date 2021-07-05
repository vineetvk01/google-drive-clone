import { Router } from 'express';
import _ from 'lodash';
import { createUser, loginRequest } from '../services/users';
import config from '../config';
import { signJWTData, JWT_COOKIE_NAME, authRequired } from '../middleware/authentication';

const COOKIE_AGE_ONE_DAY = 60 * 60 * 24 * 1000;
const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const user = await createUser({ name, username, password });

    res.publish(true, 'User is registered successfully', { user });
  } catch (err) {
    console.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body; 

    const user = await loginRequest({ username, password });

    const signedToken = signJWTData(user);
    res.cookie(
      JWT_COOKIE_NAME,
      signedToken,
      {
        maxAge: COOKIE_AGE_ONE_DAY,
        httpOnly: true,
        secure: config.ENV === 'production',
        sameSite: config.ENV === 'production' ? 'none': 'lax',
      }
    );

    res.publish(true, 'LoggedIn Successfully', { user });
  } catch (err) {
    console.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

router.get('/session', async (req, res, next) => {
  try {
    const { user } = req; 
    if(!user){
      res.publish(false, 'Not Logged In', {});
      return;
    }
    res.publish(true, 'User Information fetched', user);
  } catch (err) {
    console.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

router.post('/logout', authRequired(), async (req, res, next) => {
  try {
    res.cookie(
      JWT_COOKIE_NAME,
      '',
      {
        maxAge: 10,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      }
    );
    res.publish(true, 'Logged Out Successfully');
  } catch (err) {
    console.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

export default router;
