
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import '$lib/db/db';
import { JWT_TOKEN } from "$env/static/private";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { Students } from '$lib/db/models/Students';
import { Teachers } from '$lib/db/models/Teacher';

export const POST = async ({ request }) => {
    const { email, password, firstname, surname, prefix, roomId}: { email: string, password: string, firstname: string, surname: string, prefix: string, roomId: string} = await request.json();


    const existingUser = await Teachers.findOne({ email });
    if (existingUser) {
        return json({ error: true, message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Student register");

    const userId = crypto.randomUUID();
	// Data student to the students collections
    await Students.create({ email: email, password: hashedPassword, id: userId, user_type: "student", firstname: firstname, surname: surname, prefix: prefix, roomId: roomId});

	// Add students to the student list in the teacher
	const teacher = await Teachers.findOne({ roomId: roomId })
	if (teacher) {
		await teacher.updateOne({ "$push": {students: userId}})
	} else {
		return json({ message: "There's no teacher with this room id registered", error: true})
	}

	// JWT token
	const token = jwt.sign({ userId: userId, email: email, user_type: "student" }, JWT_TOKEN, {
		expiresIn: '7d',
	});

	return new Response(JSON.stringify({ success: true, message: `Register successful.`,}), {
		status: 200,
		headers: {
			'Set-Cookie': serialize('token', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			}),
			'Content-Type': 'application/json',
		},
	});

    
};