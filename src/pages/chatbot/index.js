import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import ChatbotCard from '@/components/ChatbotCard';
import Head from 'next/head';

async function fetchChatbots(session) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/chatbots/${session.user.email}`
		);
		const data = await response.json();
		return data.chatbots;
	} catch (error) {
		console.error('Error fetching chatbots:', error);
		return [];
	}
}

function App({ initialChatbots }) {
	const [chatbots, setChatbots] = useState(initialChatbots);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			fetchChatbots(session)
				.then((chatbots) => setChatbots(chatbots))
				.catch((error) => console.error('Error fetching chatbots:', error));
		}
	}, [session]);

	return (
		<div className="flex flex-col h-screen p-8 font-sans">
			<Head>
				<title>Chatbots</title>
			</Head>
			<div className="mb-4">
				<h1 className="text-3xl font-bold text-black">Chatbots</h1>
				<hr className="border-gray-300 my-4" />
			</div>
			<div className="mt-8 grid grid-cols-3 gap-4">
				{chatbots.map((chatbot) => (
					// <div
					// 	key={chatbot.id}
					// 	className="border border-gray-300 p-4 rounded-md">
					// 	<h2 className="text-lg font-semibold">{chatbot.name}</h2>
					// 	<p className="text-gray-600 mt-2">{chatbot.description}</p>
					// </div>
					<ChatbotCard key={chatbot._id.$oid} chatbot={chatbot} />
				))}
			</div>
			<div className="flex justify-center">
				<Link href="/chatbot/create">
					<button className="bg-black font-medium text-white px-4 py-2 rounded hover:bg-gray-800 text-[14px] my-5">
						New Chatbot
					</button>
				</Link>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	let initialChatbots = [];
	if (session) {
		initialChatbots = await fetchChatbots(session);
	}
	return {
		props: {
			initialChatbots,
		},
	};
}

export default App;
