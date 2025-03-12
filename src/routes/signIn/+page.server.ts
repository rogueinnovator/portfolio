// import type { PageServerLoad } from './$types';
// import { adminAuth } from '$lib/config/firebase-admin';
// import { redirect } from '@sveltejs/kit';
// import type { Actions } from './$types';

// export const load: PageServerLoad = async () => {
//   return {
//     // You can add any server-side data needed for the sign-in page here
//   };
// };

// export const actions = {
//   default: async ({ request, cookies }) => {
//     try {
//       const data = await request.json();
//       const { idToken } = data;

//       if (!idToken) {
//         return { success: false };
//       }

//       // Create session cookie
//       const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
//       const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
      
//       // Set cookie
//       cookies.set('session', sessionCookie, {
//         path: '/',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: expiresIn
//       });

//       return { success: true };
//     } catch (error) {
//       console.error('Error creating session:', error);
//       return { success: false };
//     }
//   }
// } satisfies Actions; 