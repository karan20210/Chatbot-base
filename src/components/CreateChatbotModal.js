import React from 'react';
import { Switch, FormGroup, FormControlLabel, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

function CreateChatbotModal({
	isOpen,
	setIsOpen,
	name,
	setName,
	visibility,
	setVisibility,
	temperature,
	setTemperature,
	handleDataSubmission,
}) {
	const handleVisibilityChange = (event) => {
		setVisibility(event.target.checked ? 'Public' : 'Private');
	};

	return (
		<div>
			{isOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
						<Typography
							variant="h6"
							component="h3"
							className="text-center mb-4">
							Enter details for your chatbot!
						</Typography>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border border-gray-300 rounded px-3 py-1.5 w-full my-3"
							placeholder="Name"
						/>
						<FormGroup className="mt-4">
							<FormControlLabel
								control={
									<Switch
										checked={visibility === 'Public'}
										onChange={handleVisibilityChange}
										color="primary"
										icon={<LockIcon />}
										checkedIcon={<PublicIcon />}
									/>
								}
								label={visibility}
								labelPlacement="start"
								className="justify-between"
							/>
						</FormGroup>
						<div className="mt-4">
							<Typography variant="body1">
								Temperature: {temperature}
							</Typography>
							<input
								type="range"
								name="temperature"
								min="0"
								max="1"
								step="0.1"
								value={temperature}
								onChange={(e) => setTemperature(e.target.value)}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<button
							className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
							onClick={async () => {
								await handleDataSubmission();
								setIsOpen(false);
							}}>
							Create Chatbot
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CreateChatbotModal;
