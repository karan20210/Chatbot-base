import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatInterface from '@/components/Chat';
import ChatbotInfo from '@/components/ChatbotInfo';
import ChatbotEditMenu from '@/components/ChatbotEditMenu';
import ChatbotSettings from '@/components/ChatbotSettings';

const ChatbotEdit = () => {
	const router = useRouter();
	const { id } = router.query;
	const [chatbot, setChatbot] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('Chatbot');

	useEffect(() => {
		if (id) {
			fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/chatbot/${id}`)
				.then((res) => res.json())
				.then((data) => {
					setChatbot(data.chatbot);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Failed to fetch chatbot data:', error);
					setLoading(false);
				});
		} else {
			setLoading(true);
		}
	}, [id]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<button
					type="button"
					className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
					Loading...
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<ChatbotEditMenu activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="flex flex-1 my-5">
				{activeTab === 'Chatbot' && (
					<>
						<ChatbotInfo chatbot={chatbot} />
						<ChatInterface />
					</>
				)}
				{activeTab === 'Settings' && <ChatbotSettings chatbot={chatbot} />}
			</div>
		</div>
	);
};

export default ChatbotEdit;
