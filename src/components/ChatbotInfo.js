import React from 'react';
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ChatbotInfo = ({ chatbot }) => {
	if (!chatbot) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h5" component="h2" fontWeight="bold">
					{chatbot.name}
				</Typography>
				<Box sx={{ my: 1 }}>
					<Grid container alignItems="center">
						<Typography variant="h6" fontWeight="bold">
							Chatbot ID
						</Typography>
						<IconButton
							size="small"
							sx={{ ml: 1 }}
							onClick={() => navigator.clipboard.writeText(chatbot._id.$oid)}
							aria-label="copy id">
							<ContentCopyIcon fontSize="small" />
						</IconButton>
					</Grid>
					<Typography color="textSecondary">{chatbot._id.$oid}</Typography>
				</Box>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={6} sm={3}>
					<Typography fontWeight="medium">Status</Typography>
					<Typography color="green">{chatbot.status}</Typography>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography fontWeight="medium">Model</Typography>
					<Typography>{chatbot.model}</Typography>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography fontWeight="medium">Visibility</Typography>
					<Typography>{chatbot.visibility}</Typography>
				</Grid>
				<Grid item xs={6} sm={3}>
					<Typography fontWeight="medium">Temperature</Typography>
					<Typography>{chatbot.temperature}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography fontWeight="medium">Last trained at</Typography>
					<Typography>{chatbot.lastTrainedAt}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default ChatbotInfo;
