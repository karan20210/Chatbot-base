import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import Sidebar from '../../components/Sidebar';
import TextArea from '../../components/TextArea';
import WebsiteCrawler from '../../components/WebsiteCrawler';
import { toast } from 'react-toastify';
import Head from 'next/head';
import CreateChatbotModal from '@/components/CreateChatbotModal';

async function createChatbot(
	sourceId,
	dataType,
	chatbotName,
	userEmail,
	visibility,
	temperature
) {
	try {
		const requestBody = {
			name: chatbotName,
			dataType: dataType,
			sourceId: sourceId,
			userEmail: userEmail,
			status: 'Trained',
			model: 'gpt-3.5-turbo',
			visibility: visibility,
			temperature: temperature,
			lastTrainedAt: new Date().toLocaleString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			}),
		};

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/create-chatbot`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestBody),
			}
		);

		const data = await response.json();
		if (data.status_code === 200) {
			return { success: true };
		} else {
			return { success: false };
		}
	} catch (error) {
		console.error('Error creating chatbot:', error);
		return { success: false };
	}
}

async function fetchChatbots(userEmail) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/chatbots/${userEmail}`
		);
		const data = await response.json();
		return data.chatbots || [];
	} catch (error) {
		console.error('Error fetching chatbots:', error);
		return [];
	}
}

function createChatbotPage({ initialChatbots }) {
	const { data: session, status } = useSession();
	const [activeTab, setActiveTab] = useState('Text');
	const [text, setText] = useState('');
	const [url, setUrl] = useState('');
	const [sitemapUrl, setSitemapUrl] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [chatbotName, setChatbotName] = useState('');
	const [visibility, setVisibility] = useState('Public');
	const [temperature, setTemperature] = useState(0);

	const handleDataSubmission = async () => {
		try {
			let sourceId;
			let dataType = activeTab;

			if (dataType === 'Text') {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/add-text`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ text: text, userEmail: session.user.email }),
					}
				);
				const data = await response.json();
				sourceId = data.res.$oid;
			} else {
				sourceId = dataType === 'Files' ? files : url;
			}

			const { success } = await createChatbot(
				sourceId,
				dataType,
				chatbotName,
				session.user.email,
				visibility,
				temperature
			);
			if (success) {
				toast('Chatbot created successfully', { type: 'success' });
				setText('');
				setUrl('');
				setSitemapUrl('');
			} else {
				toast('Failed to create chatbot', { type: 'error' });
			}
		} catch (error) {
			console.error('Error submitting data:', error);
			toast('Failed to submit data', { type: 'error' });
		}
	};

	return (
		<div className="flex h-screen bg-white p-20 font-sans text-[16px]">
			<Head>
				<title>Create New Chatbot</title>
				<meta name="description" content="A custom ChatGPT for your website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="flex-1 mx-20 flex flex-col items-center">
				<h1 className="text-3xl font-bold mb-2 text-black font-sans text-center">
					Data Sources
				</h1>
				<p className="text-gray-600 mb-4 text-center">
					Add your data sources to train your chatbot
				</p>
				<hr className="border-gray-300 mb-4 w-full" />
				<div className="bg-white p-8 rounded shadow-md w-full relative">
					{activeTab === 'Text' && <TextArea text={text} setText={setText} />}
					{activeTab === 'URL' && (
						<WebsiteCrawler
							url={url}
							setUrl={setUrl}
							sitemapUrl={sitemapUrl}
							setSitemapUrl={setSitemapUrl}
						/>
					)}
				</div>
				<button
					// onClick={handleDataSubmission}
					onClick={() => {
						setIsOpen(true);
					}}
					className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 mt-6">
					Create Chatbot
				</button>
				<CreateChatbotModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					name={chatbotName}
					setName={setChatbotName}
					visibility={visibility}
					setVisibility={setVisibility}
					temperature={temperature}
					setTemperature={setTemperature}
					handleDataSubmission={handleDataSubmission}
				/>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	let initialChatbots = [];
	if (session) {
		initialChatbots = await fetchChatbots(session.user.email);
	}
	return {
		props: {
			initialChatbots,
		},
	};
}

export default createChatbotPage;
