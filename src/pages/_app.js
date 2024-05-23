import '@/styles/globals.css';
import Navbar from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<Navbar />
			<Component {...pageProps} />
		</SessionProvider>
	);
}
