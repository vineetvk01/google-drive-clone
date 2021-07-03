import mongoose from 'mongoose';
import driveDB from '../mongo';



const fileSystemSchema = mongoose.Schema({
    displayName: String,
    type: {
        type: String,
        enum: ['file', 'folder']
    },
    childId: String,
    parentId: String,
    ownerId: String
}, { timestamps: true });

fileSystemSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

fileSystemSchema.index({ownerId: 1, parentId: 1});

const FileSystemModel = driveDB.model('fileSystem', fileSystemSchema);

export default FileSystemModel;