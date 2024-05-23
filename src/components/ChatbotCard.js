import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const ChatbotCard = ({ chatbot }) => {
	return (
		// Add hover effect to the card
		<div className="bg-white rounded-lg overflow-hidden shadow-md p-6 hover:shadow-xl">
			<div className="flex justify-center">
				{/* <FontAwesomeIcon icon={faComment} className="text-4xl text-blue-500" /> */}
				<ChatBubbleIcon className="text-blue-500" fontSize="large" />
			</div>
			<h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">
				{chatbot.name}
			</h2>
			<div className="mt-4 flex justify-center">
				<Link href={`/chatbot/${chatbot._id.$oid}`}>
					<button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
						{/* <FontAwesomeIcon icon={faEdit} className="text-sm" /> */}
						<EditIcon />
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ChatbotCard;
