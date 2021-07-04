import { Router } from 'express';
import _ from 'lodash';
import { getFilesByUser, createFileByUser, deleteFileByUser, updateFileByUser } from '../services/files';
import { authRequired } from '../middleware/authentication';

const router = Router();

router.get('/files/:parentId', authRequired(), async (req, res, next) => {
  try {
    const { user } = req;
    const { parentId } = req.params;

    const files = await getFilesByUser(parentId, user);

    res.publish(true, 'Fetched all the files in the directory', { files });
  } catch (err) {
    logger.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

router.post('/files/:parentId', authRequired(), async (req, res, next) => {
  try {
    const { user } = req;
    const { parentId } = req.params;
    const { fileName, type } = req.body;

    const files = await createFileByUser(parentId, { fileName, type }, user);

    res.publish(true, 'Created new file', { files });
  } catch (err) {
    logger.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

router.put('/files/:parentId', authRequired(), async (req, res, next) => {
  try {
    const { user } = req;
    const { parentId } = req.params;
    const { fileName, childId } = req.body;

    const files = await updateFileByUser(fileName, parentId, childId, user);

    res.publish(true, 'Renamed the file successfully', { files });
  } catch (err) {
    console.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

router.delete('/files/:parentId', authRequired(), async (req, res, next) => {
  try {
    const { user } = req;
    const { parentId } = req.params;
    const { childId } = req.body;

    const files = await deleteFileByUser(parentId, childId, user);

    res.publish(true, 'Deleted the file successfully', { files });
  } catch (err) {
    console.error({ level: 'error', message: err.message || err.toString() });
    next(err);
  }
});

export default router;
