import mongoose, { Document, Model } from 'mongoose';


interface ScoreQuiz {
    score: number;
    quizId: string;
    labName: string;
    report: string;
    pass: boolean;
}
interface IStudent extends Document {
    id: string;
    email: string;
    password: string;
	firstname: string;
    surname: string;
    prefix: string;
    user_type: string;
    roomId: string;
    scores: ScoreQuiz[];


}

const ScoreSchema = new mongoose.Schema({
    quizId: { type: String, required: true },
    score: { type: Number, required: true },
    labName: { type: String, required: true },
    report: { type: String, required: false },
    pass: { type: Boolean, required: true },
}, { _id: false });

const StudentSchema = new mongoose.Schema<IStudent>({
    id: { type: String, required: true},
    user_type: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
	firstname: { type: String, required: true},
    surname: { type: String, required: true},
    prefix: { type: String, required: true},
    roomId: { type: String, required: true }, // ✅ correct array syntax
    scores: [ScoreSchema]
    
});



if (mongoose.models.Students) {
	delete mongoose.models.Students;
}

const Students: Model<IStudent> = mongoose.model<IStudent>('Students', StudentSchema);
export default Students;