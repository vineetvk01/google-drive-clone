import { makeDb } from '../src/data-access';
import dotenv from 'dotenv';
import logger from '../src/logger';
dotenv.config();

const dbLogger = logger('[ Initalizing : db.js ]');
(async function setupDb () {
  dbLogger.info('Setting up database for indexing...');
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  // const db = await makeDb();
  // const result = await db
  //   .collection('chats')
  //   .createIndexes([
  //     { key: { hash: 1, }, name: 'hash'}
  //   ]);
  // dbLogger.info(result);
  process.exit();
})();
