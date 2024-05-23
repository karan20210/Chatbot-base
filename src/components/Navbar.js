import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
	const { data: session } = useSession();
	return (
		<nav className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-300">
			<Link href="/">
				<span className="font-semibold text-lg text-gray-800">
					Chatbot-Base
				</span>
			</Link>
			<div>
				{session ? (
					<>
						<span className="text-gray-600 mr-4">Hi, {session.user.name}</span>
						<button
							onClick={() => signOut()}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							Sign out
						</button>
					</>
				) : (
					<button
						onClick={() => signIn('google')}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Sign in with Google
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
