import mongoose, { Document, Model } from 'mongoose';

interface ITeacher extends Document {
    email: string;
    password: string;
    id: string;
    user_type: string;
    students: [];
    roomId: string;

}

const TeachersSchema = new mongoose.Schema<ITeacher>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    user_type: { type: String, required: false },
    id: { type: String, required: true, unique: true },
    students: { type: [], required: true},
    roomId: { type: String, required: true, unique: true},
    
});


export const Teachers: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>('Teachers', TeachersSchema);