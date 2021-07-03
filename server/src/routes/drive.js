import { Router } from 'express';
import _ from 'lodash';
import { authRequired } from '../middleware/authentication';

const router = Router();

router.get('/files/:parentId', authRequired(), async (req, res, next) => {
  try {
    const { user } = req;
    const { parentId } = req.params;

    // const requests = await getFiles(parentId);

    res.publish(true, 'All new call requests', { requests });
  } catch (err) {
    logger.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

export default router;
