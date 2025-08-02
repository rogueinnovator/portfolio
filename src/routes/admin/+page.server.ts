import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
//IF USER ISNT AUTHENTICATED RETURN TO THE SIGNIN page
export const load: PageServerLoad = async ({ locals }) => {
	console.log(locals?.user, 'local user ');

	if (!locals.user) {
		throw redirect(302, '/signIn');
	}
	return locals.user;
};
