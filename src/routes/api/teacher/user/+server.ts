import { json } from "@sveltejs/kit"
import bcrypt from 'bcryptjs';
import Students from "$lib/db/models/Students";
import Teachers from "$lib/db/models/Teacher";
import '$lib/db/db';

export const POST = async ({ request }) => {
    const { userId }: { userId: string } = await request.json();

    const teacher = await Teachers.findOne({ id: userId })
    
    return json({ 
        user: teacher,
    })
}