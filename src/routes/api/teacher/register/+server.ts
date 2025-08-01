
import bcrypt from 'bcryptjs';
import Teachers from '$lib/db/models/Teacher';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { json } from '@sveltejs/kit';
import '$lib/db/db';
import { JWT_TOKEN } from "$env/static/private";


export const POST  = async ({ request }) => {
	const { email, password, roomIdGen }: { email: string; password: string; roomIdGen: number } = await request.json();

	
	const existingUser = await Teachers.findOne({ email });
	if (existingUser) {
		return json({ error: 'User already exists', success: false, process:"register" }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashedPassword);

	const userId = crypto.randomUUID();
	await Teachers.create({ email: email, password: hashedPassword, id: userId, user_type: "teacher", students: [], roomId: roomIdGen.toString()});
	console.log("Teacher register")
	// JWT token
	const token = jwt.sign({ userId: userId, email: email }, JWT_TOKEN, {
		expiresIn: '7d',
	});

	return new Response(JSON.stringify({ success: true, message: `Register successful.`, roomId: roomIdGen, process: "register" }), {
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