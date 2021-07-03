const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.dtsta.mongodb.net/drive';

console.log('[INFO] MONGODB URL:=>', MONGO_URL);

const drive = mongoose.createConnection(MONGO_URL, { server: { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 } });

export default drive;
