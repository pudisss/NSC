
import type { PageLoad } from './$types';
export const ssr = false;
export const load: PageLoad = ({ params }) => {
    const id = params.id;

    return {
        id
    }
}