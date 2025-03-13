import React, { useState, useCallback } from 'react';
import './AddSourceModal.css';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../services/api';

function AddSourceModal({ onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.pdf'
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            try {
                const response = await uploadFile(selectedFile);
                console.log("File uploaded successfully:", response);
                alert("File uploaded successfully!");
                onClose(); // Close the modal after upload
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Error uploading file");
            }
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add sources</h2>
                    <button className="close-button" onClick={onClose}>
                        
                    </button>
                </div>
                <div className="modal-content">
                    <p>
                        Sources let NotebookLM base its responses on the information that
                        matters most to you. (Examples: marketing plans, course reading,
                        research notes, meeting transcripts, sales documents, etc.)
                    </p>

                    <div className="upload-section" {...getRootProps()}>
                        <input {...getInputProps()} onChange={handleFileChange} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <>
                                    <div className="upload-icon"></div>
                                    <p>Drag & drop or <a href="#choose-file">choose file</a> to upload</p>
                                    <p>Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)</p>
                                </>
                        }
                    </div>
                    <button onClick={handleUploadClick} disabled={!selectedFile}>Upload</button>

                    <div className="source-options">
                        <div className="source-option">
                            <div className="source-icon">Google Docs Icon</div>
                            <p>Google Docs</p>
                        </div>
                        <div className="source-option">
                            <div className="source-icon">Google Slides Icon</div>
                            <p>Google Slides</p>
                        </div>
                        <div className="source-option">
                            <div className="source-icon">Link Icon</div>
                            <p>Website</p>
                        </div>
                        <div className="source-option">
                            <div className="source-icon">YouTube Icon</div>
                            <p>YouTube</p>
                        </div>
                        <div className="source-option">
                            <div className="source-icon">Paste Text Icon</div>
                            <p>Copied text</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSourceModal;