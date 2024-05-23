import React from 'react';
import { Tabs, Tab, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatbotEditMenu = ({ activeTab, setActiveTab }) => {
	// Convert tab names to index for MUI Tabs
	const tabNameToIndex = {
		Chatbot: 0,
		Settings: 1,
		Dashboard: 2,
		Sources: 3,
	};

	const handleTabChange = (event, newValue) => {
		// Convert index back to tab name
		const tabName = Object.keys(tabNameToIndex).find(
			(key) => tabNameToIndex[key] === newValue
		);
		setActiveTab(tabName);
	};

	return (
		<Box sx={{ bgcolor: 'background.paper', py: 2 }}>
			<Tabs
				value={tabNameToIndex[activeTab]}
				onChange={handleTabChange}
				centered
				textColor="primary"
				indicatorColor="primary"
				aria-label="chatbot edit tabs">
				<Tab label="Chatbot" />
				<Tab label="Settings" />
				<Tab label="Dashboard" />
				<Tab label="Sources" />
				<IconButton
					aria-label="delete"
					color="error"
					onClick={() => alert('Delete?')}>
					<DeleteIcon />
				</IconButton>
			</Tabs>
		</Box>
	);
};

export default ChatbotEditMenu;
