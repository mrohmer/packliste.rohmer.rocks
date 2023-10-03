import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/server/db';
import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import Google from '@auth/core/providers/google';
export const doAuth = SvelteKitAuth(async (event) => ({
	adapter: PrismaAdapter(prisma),
	providers: [Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_SECRET })],
	secret: env.AUTH_SECRET,
	trustHost: true,
	session: {
		strategy: 'jwt'
	},
	jwt: {
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 60 * 60 * 24 * 356
	},
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				(session.user as any).id = token.uid;
			}
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.uid = user.id;
			}
			return token;
		}
	}
})) satisfies Handle;
