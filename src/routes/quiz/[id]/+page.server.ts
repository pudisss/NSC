import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params, locals}) => {
    const id = params.id;

    return {
        id,
        user: locals.user,
    }
}