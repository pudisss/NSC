import { json } from "@sveltejs/kit"
import bcrypt from 'bcryptjs';
import { Students } from '$lib/db/models/Students';
import '$lib/db/db';

export const POST = async ({ request }) => {
    const { userId }: { userId: string } = await request.json();

    const user = await Students.findOne({ id: userId })
    
    return json({
        user: user,
    })
}