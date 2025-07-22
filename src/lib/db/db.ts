import mongoose from "mongoose";
import { PUBLIC_MONGO_URL } from "$env/static/public";


if (!mongoose.connection.readyState) {
	await mongoose.connect(PUBLIC_MONGO_URL, {
		dbName: 'user'
	});
}

export default mongoose;