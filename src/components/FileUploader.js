import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUpFromBracket,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';

const FileUploader = ({
	files,
	handleFileChange,
	handleFileRemove,
	formatFileSize,
	uploadFiles,
}) => {
	return (
		<>
			<h2 className="text-xl font-sans mb-4 text-black text-[20px] font-[550]">
				Files
			</h2>
			<div className="border-2 border-dashed border-gray-300 p-8 text-center rounded relative">
				<div className="text-gray-500 mb-2">
					<FontAwesomeIcon
						icon={faArrowUpFromBracket}
						className="w-12 h-12 mx-auto mb-4"
					/>
				</div>
				<p className="text-gray-500 mb-2">
					Drag & drop files here, or click to select files
				</p>
				<p className="text-gray-400">
					Supported File Types: .pdf, .doc, .docx, .txt
				</p>
				<input
					type="file"
					multiple
					onChange={handleFileChange}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>
			</div>
			<p className="text-gray-500 mt-4 text-center">
				If you are uploading a PDF, make sure you can select/highlight the text.
			</p>
			{files.length > 0 && (
				<div className="mt-4 w-full font-sans text-black">
					<hr className="border-gray-300 mb-4" />
					<h3 className="text-lg mb-2 text-center">Attached Files</h3>
					<ul className="list-none p-0">
						{files.map((file, index) => (
							<li
								key={index}
								className="flex justify-between items-center mb-2">
								<div>
									<span className="font-medium">{file.name}</span>{' '}
									<span className="text-gray-500 text-sm">
										({formatFileSize(file.size)})
									</span>
								</div>
								<button
									onClick={() => handleFileRemove(index)}
									className="text-red-500 hover:text-red-700">
									<FontAwesomeIcon icon={faTrash} />
								</button>
							</li>
						))}
					</ul>
					<button
						onClick={uploadFiles}
						className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 mt-6">
						Upload Files
					</button>
				</div>
			)}
		</>
	);
};

export default FileUploader;
