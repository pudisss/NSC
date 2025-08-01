
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import '$lib/db/db';
import { JWT_TOKEN } from "$env/static/private";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import Teachers from '$lib/db/models/Teacher';
import Students from '$lib/db/models/Students';

export const POST = async ({ request }) => {
    const { email, password }: { email: string, password: string } = await request.json();


    const user = await Students.findOne({ email: email });

    if (!user) {
       
        return json({ error: 'User not found', success: false, process: "login" }, { status: 401 });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return json({ error: 'Invalid password', success: false, process: "login" }, { status: 401 });
    }

    
    console.log("Student Login");
    const token = jwt.sign({ userId: user.id, email: user.email, user_type: "student" }, JWT_TOKEN, {
        expiresIn: '7d',
    });
    return new Response(JSON.stringify({ success: true, message:"Login successful", process: "login" }), {
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