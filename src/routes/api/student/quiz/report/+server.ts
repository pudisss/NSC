import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import Students from "$lib/db/models/Students";


export const POST = async ({ request }) => {
    const { report, userId, quizId }: { report: string, userId: string, quizId: string} = await request.json();

    

    await Students.updateOne({ id: userId, "scores.quizId": quizId }, { $set: {
        "scores.$.report": report,
    }});

    return json({ success: true, message: "Add report success"});
}