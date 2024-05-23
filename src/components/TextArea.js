import React, { useState } from 'react';

const TextArea = ({ text, setText }) => {
	return (
		<>
			<h2 className="text-xl font-sans text-black mb-4 text-[20px] font-[550]">
				Text
			</h2>
			<textarea
				className="w-full h-64 p-4 border-2 border-gray-300 rounded text-black"
				placeholder="Enter text here..."
				value={text}
				onChange={(e) => setText(e.target.value)}></textarea>
			<div className="text-right mt-2 text-gray-400">
				Characters: {text.length}/10,000
			</div>
		</>
	);
};

export default TextArea;
