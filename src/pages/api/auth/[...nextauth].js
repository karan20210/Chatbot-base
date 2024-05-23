import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		signIn: async (user) => {
			if (
				user.account.provider === 'google' &&
				user.profile.email_verified === true
			) {
				fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: user.user.email,
						name: user.user.name,
						image: user.user.image,
					}),
				})
					.then((response) => response.json())
					.then((data) => console.log(data))
					.catch((error) => {
						console.error('Error:', error);
						return false;
					});
			}
			return true;
		},
	},
});
