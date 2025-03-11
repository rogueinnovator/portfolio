import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  // Check if user is authenticated
  const user = locals.user;
  
  if (!user) {
    // Redirect to sign in page if not authenticated
    throw redirect(302, '/signIn');
  }

  return {
    user
  };
}; 