import React, { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	Divider,
	Typography,
	Select,
	MenuItem,
} from '@mui/material';
import ChatbotSettingsSidebar from './ChatbotSettingsSidebar';

const ChatbotSettings = ({ chatbot }) => {
	const [activeSettingsTab, setActiveSettingsTab] = useState('General');
	return (
		<Box sx={{ display: 'flex', height: '100vh' }}>
			<ChatbotSettingsSidebar
				activeSettingsTab={activeSettingsTab}
				setActiveSettingsTab={setActiveSettingsTab}
			/>
			{activeSettingsTab === 'General' && (
				<Box sx={{ flex: 1, p: 3 }}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						General
					</Typography>
					<Divider />
					<Box sx={{ mt: 2 }}>
						<TextField
							fullWidth
							label="Chatbot ID"
							variant="outlined"
							defaultValue={chatbot._id.$oid}
							margin="normal"
							disabled
						/>
						<TextField
							fullWidth
							label="Name"
							variant="outlined"
							defaultValue={chatbot.name}
							margin="normal"
						/>
						<Button variant="contained" sx={{ mt: 2 }}>
							Save
						</Button>
					</Box>
				</Box>
			)}
			{activeSettingsTab === 'Model' && (
				<Box sx={{ flex: 1, p: 3 }}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Model
					</Typography>
					<Divider />
					<Box sx={{ mt: 2 }}>
						<TextField
							fullWidth
							label="Last Trained At"
							variant="outlined"
							defaultValue={chatbot.lastTrainedAt}
							margin="normal"
							disabled
						/>
						<Select
							fullWidth
							label="Model"
							variant="outlined"
							margin="normal"
							value={chatbot.model}>
							<MenuItem value={'gpt-3.5-turbo'}>gpt-3.5-turbo</MenuItem>
							<MenuItem value={'gpt-4'}>gpt-4</MenuItem>
							<MenuItem value={'gpt-4-turbo'}>gpt-4-turbo</MenuItem>
						</Select>
						<div className="mt-4">
							<Typography variant="body1">
								Temperature: {chatbot.temperature}
							</Typography>
							<input
								type="range"
								name="temperature"
								min="0"
								max="1"
								step="0.1"
								value={chatbot.temperature}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<Button variant="contained" sx={{ mt: 2 }}>
							Save
						</Button>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ChatbotSettings;
