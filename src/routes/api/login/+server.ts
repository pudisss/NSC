
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { User } from '$lib/db/models/User'
import '$lib/db/db';

export const POST = async ({ request }) => {
	const { email, password }: { email: string; password: string } = await request.json();

	const user = await User.findOne({ email });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return json({ error: 'Invalid email or password' }, { status: 401 });
	}

	return json({ message: 'Login successful' });
};