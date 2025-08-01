import { serialize } from "cookie";
import { json } from "@sveltejs/kit";

export const POST = async() => {
    return new Response(JSON.stringify({ success: true, message: "Logged out"}), {
        status: 200,
        headers: {
            "Set-Cookie": serialize('token', '', {
                path: "/",
                httpOnly: true,
                sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				expires: new Date(0), // Delete cookie by setting past date
            }),
            'Content-Type': 'application/json',
        }
    })
}