// Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFile,
	faAlignLeft,
	faLink,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activeTab, setActiveTab }) => {
	return (
		<div>
			<div className="flex flex-col space-y-4 my-4">
				{/* <button
					onClick={() => setActiveTab('Files')}
					className={`flex items-center ${
						activeTab === 'Files'
							? 'text-purple-600 font-bold'
							: 'text-gray-600'
					}`}>
					<FontAwesomeIcon icon={faFile} className="w-5 h-5 mr-2" />
					File
				</button> */}
				<button
					onClick={() => setActiveTab('Text')}
					className={`flex items-center ${
						activeTab === 'Text' ? 'text-purple-600 font-bold' : 'text-gray-600'
					}`}>
					<FontAwesomeIcon icon={faAlignLeft} className="w-5 h-5 mr-2" />
					Text
				</button>
				<button
					onClick={() => setActiveTab('URL')}
					className={`flex items-center ${
						activeTab === 'URL' ? 'text-purple-600 font-bold' : 'text-gray-600'
					}`}>
					<FontAwesomeIcon icon={faLink} className="w-5 h-5 mr-2" />
					URL
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
