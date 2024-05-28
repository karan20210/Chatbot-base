// WebsiteCrawler.jsx
import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const WebsiteCrawler = ({ url, setUrl, sitemapUrl, setSitemapUrl }) => {
	const [urls, setUrls] = useState([]);
	const handleFetchLinks = async () => {
		try {
			console.log(`Fetching links for: ${url}`);
			const response = await fetch(
				`${
					process.env.NEXT_PUBLIC_BACKEND_API_URL
				}/api/fetch-links?url=${encodeURIComponent(url)}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			setUrls(data['url_list']);
			console.log('Fetch links response:', data);
		} catch (error) {
			console.error('Error fetching links:', error);
		}
	};

	const handleLoadSitemap = async () => {
		try {
			console.log(`Loading sitemap from: ${sitemapUrl}`);
			const response = await fetch(
				`${
					process.env.NEXT_PUBLIC_BACKEND_API_URL
				}/api/load-sitemap?url=${encodeURIComponent(sitemapUrl)}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log('Load sitemap response:', data);
		} catch (error) {
			console.error('Error loading sitemap:', error);
		}
	};

	const handleDelete = (index) => {
		const newLinks = urls.filter((_, i) => i !== index);
		setUrls(newLinks);
	};

	const handleUrlChange = (index, newValue) => {
		const newLinks = [...urls];
		newLinks[index] = newValue;
		setUrls(newLinks);
	};

	return (
		<div className="text-black">
			<h2 className="text-xl font-sans mb-4 text-black text-[20px] font-[550]">
				Website
			</h2>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Crawl</label>
				<div className="flex">
					<input
						type="text"
						className="flex-grow p-2 border border-gray-300 rounded-l"
						placeholder="https://www.example.com"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button
						onClick={handleFetchLinks}
						className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-700">
						Fetch links
					</button>
				</div>
				<p className="text-gray-500 mt-2">
					This will crawl all the links starting with the URL (not including
					files on the website).
				</p>
			</div>
			<div className="flex items-center justify-center mb-4">
				<hr className="border-gray-300 flex-grow" />
				<span className="mx-2 text-gray-500">OR</span>
				<hr className="border-gray-300 flex-grow" />
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Submit Sitemap</label>
				<div className="flex">
					<input
						type="text"
						className="flex-grow p-2 border border-gray-300 rounded-l"
						placeholder="https://www.example.com/sitemap.xml"
						value={sitemapUrl}
						onChange={(e) => setSitemapUrl(e.target.value)}
					/>
					<button
						onClick={handleLoadSitemap}
						className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-700">
						Load sitemap
					</button>
				</div>
			</div>
			<div className="flex items-center justify-center mb-4">
				<hr className="border-gray-300 flex-grow" />
				<span className="mx-2 text-gray-500">Included Links</span>
				<hr className="border-gray-300 flex-grow" />
			</div>
			<div className="space-y-4 p-4">
				{urls.map((link, index) => (
					<div key={index} className="flex items-center space-x-2">
						<TextField
							label="URL"
							variant="outlined"
							value={link}
							onChange={(e) => handleUrlChange(index, e.target.value)}
							fullWidth
							className="flex-grow"
						/>
						<IconButton onClick={() => handleDelete(index)} color="error">
							<DeleteIcon />
						</IconButton>
					</div>
				))}
			</div>
		</div>
	);
};

export default WebsiteCrawler;
