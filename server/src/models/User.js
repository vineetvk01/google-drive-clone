import mongoose from 'mongoose';
import driveDB from '../mongo';



const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
}, { timestamps: true });

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

userSchema.index({ username: 1 });

const UserModel = driveDB.model('user', userSchema);

export default UserModel;