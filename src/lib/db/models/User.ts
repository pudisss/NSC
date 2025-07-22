import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
	email: string;
    password: string;
    id: string;
    user_type: string;
}

const UserSchema = new mongoose.Schema<IUser>({
	email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    user_type: { type: String, required: false },
    id: { type: String, required: true, unique: true },
    
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);