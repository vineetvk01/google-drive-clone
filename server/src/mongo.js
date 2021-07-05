import mongoose from 'mongoose';
import config from './config';

const MONGO_URL = config.MONGO_URL;

console.log('[INFO] MONGODB URL:=>', MONGO_URL);

const drive = mongoose.createConnection(MONGO_URL, { server: { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 } });

export default drive;
