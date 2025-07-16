import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params, url }) => {
    const id = params.id;
    const score = url.searchParams.get("score");
    const questionLength = url.searchParams.get("questionLength");

    return {
        id,
        score,
        questionLength,
    }
}