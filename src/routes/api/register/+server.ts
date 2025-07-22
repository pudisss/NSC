
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { User } from '$lib/db/models/User';
import '$lib/db/db';


export const POST  = async ({ request }) => {
	const { email, password, user_type }: { email: string; password: string, user_type: string } = await request.json();

	
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return json({ error: 'User already exists' }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashedPassword);
	await User.create({ email: email, password: hashedPassword, id: crypto.randomUUID(), user_type: user_type });

	return json({ message: 'User registered successfully' });
};