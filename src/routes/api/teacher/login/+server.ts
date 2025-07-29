
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { Teachers } from '$lib/db/models/Teacher';
import '$lib/db/db';
import { JWT_TOKEN } from "$env/static/private";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const POST = async ({ request }) => {
	const { email, password }: { email: string; password: string } = await request.json();

	const user = await Teachers.findOne({ email });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return json({ error: 'Invalid email or password' }, { status: 401 });
	}
	console.log("Teacher Login")

	// JWT token
	const token = jwt.sign({ userId: user.id, email: user.email }, JWT_TOKEN, {
		expiresIn: '7d',
	});
	

	return new Response(JSON.stringify({ success: true, message:"Login successful" }), {
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