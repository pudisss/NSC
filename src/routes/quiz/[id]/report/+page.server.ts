import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({ params, locals }) => {
    const quizId = params.id;
    const user = locals.user;
    
    return {
        quizId: quizId,
        user: user,
    }
}