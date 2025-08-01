import { json } from "@sveltejs/kit";
import Students from "$lib/db/models/Students";

export const POST = async({ request }) => {
    const { userId, quizId, pass }: { userId: string, quizId: string, pass: boolean } = await request.json();


    const user = Students.findOne({ id: userId })

    
    await Students.updateOne({ id: userId, "scores.quizId": quizId }, {
        $set: {
            "scores.$.pass": pass,
        }
    })

    if (pass) {
        return json({
            success: true,
            message: "Passed verify"
        })
    } else{
        return json({ 
            success: true,
            message: "Failed verify"
        })

    }

    
}