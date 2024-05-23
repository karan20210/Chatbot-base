import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const LandingPage = () => {
	return (
		<div className="text-center mt-16 bg-white text-black">
			<Head>
				<title>ChatBot-Base</title>
				<meta name="description" content="A custom ChatGPT for your website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-4xl font-bold mb-4">Welcome to ChatBot-Base</h1>
			<p className="text-lg text-gray-700">A custom ChatGPT for your website</p>
			<Link href="/chatbot">
				<button className="bg-black font-medium my-5 text-white px-4 py-2 rounded hover:bg-gray-800 text-[14px]">
					Build Your Chatbot
				</button>
			</Link>
		</div>
	);
};

export default LandingPage;
