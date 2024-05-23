import React from 'react';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import ChatIcon from '@mui/icons-material/Chat';
import ModelIcon from '@mui/icons-material/Insights';


const ChatbotSettingsSidebar = ({
	activeSettingsTab,
	setActiveSettingsTab,
}) => {
	return (
		<Box sx={{ width: '250px', borderRight: '1px solid #ccc', boxShadow: 3 }}>
			<List>
				<ListItem disablePadding>
					<ListItemButton
						selected={activeSettingsTab === 'General'}
						onClick={() => setActiveSettingsTab('General')}>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="General" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						selected={activeSettingsTab === 'Model'}
						onClick={() => setActiveSettingsTab('Model')}>
						<ListItemIcon>
							<ModelIcon />
						</ListItemIcon>
						<ListItemText primary="Model" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						selected={activeSettingsTab === 'Chat Interface'}
						onClick={() => setActiveSettingsTab('Chat Interface')}>
						<ListItemIcon>
							<ChatIcon />
						</ListItemIcon>
						<ListItemText primary="Chat Interface" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						selected={activeSettingsTab === 'Security'}
						onClick={() => setActiveSettingsTab('Security')}>
						<ListItemIcon>
							<SecurityIcon />
						</ListItemIcon>
						<ListItemText primary="Security" />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
};

export default ChatbotSettingsSidebar;
