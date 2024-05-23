import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInterface = () => {
	const [messages, setMessages] = useState([
		{ text: 'Hi! What can I help you with?', sender: 'bot' },
	]);
	const [input, setInput] = useState('');

	const handleSendMessage = () => {
		if (input.trim() !== '') {
			setMessages([...messages, { text: input, sender: 'user' }]);
			setInput('');
			// Here you could add a function to process the user's message and generate a response
		}
	};

	const handleInput = (event) => {
		setInput(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<Box sx={{ maxWidth: 1000, margin: 'auto', p: 2 }}>
			<Paper sx={{ maxHeight: 100000, overflow: 'auto', p: 2 }}>
				{messages.map((message, index) => (
					<Box
						key={index}
						sx={{
							textAlign: message.sender === 'user' ? 'right' : 'left',
							p: 1,
						}}>
						<Paper
							sx={{
								display: 'inline-block',
								p: 1,
								bgcolor:
									message.sender === 'user' ? 'primary.main' : 'grey.300',
								color:
									message.sender === 'user' ? 'common.white' : 'text.primary',
								borderRadius: '20px',
							}}>
							<Typography variant="body1">{message.text}</Typography>
						</Paper>
					</Box>
				))}
			</Paper>
			<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
				<TextField
					fullWidth
					variant="outlined"
					value={input}
					onChange={handleInput}
					onKeyPress={handleKeyPress}
					placeholder="Message..."
				/>
				<Button
					sx={{ ml: 1 }}
					variant="contained"
					endIcon={<SendIcon />}
					onClick={handleSendMessage}>
					Send
				</Button>
			</Box>
		</Box>
	);
};

export default ChatInterface;
