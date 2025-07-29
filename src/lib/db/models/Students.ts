import mongoose, { Document, Model } from 'mongoose';


interface ScoreQuiz {
    score: number;
    quizId: string;
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

const StudentSchema = new mongoose.Schema<IStudent>({
    id: { type: String, required: true},
    user_type: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
	firstname: { type: String, required: true},
    surname: { type: String, required: true},
    prefix: { type: String, required: true},
    roomId: { type: String, required: true }, // ✅ correct array syntax
    scores: [{
        quizId: { type: String, required: true },
        score: { type: Number, required: true }
    }]
    
});



export const Students = mongoose.models.Students || mongoose.model<IStudent>('Students', StudentSchema);