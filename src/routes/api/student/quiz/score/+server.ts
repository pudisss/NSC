import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import Students from "$lib/db/models/Students";


export const POST = async ({ request }) => {
    const { score, userId, labName, quizId }: {score: number, userId: string, labName: string, quizId: string,} = await request.json();

    const currentUser = await Students.findOne({ id: userId })
    
   
    if (currentUser?.scores[0].score <= score) { // It's always has a data cause the array always has one object. If it doesn't have an object it will be push in the condition above
        
        await Students.updateOne({ id: userId, "scores.quizId": quizId}, {
            $set: {
                "scores.$.score": score,
            }
        })
    } else {
        return json({
            success: false,
            message: "You score less than your last time. The system won't update your score."
        })
    }


    return json({
        success: true,
        message: "Save score success",
    })
}