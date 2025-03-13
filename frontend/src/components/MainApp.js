import React, { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import './MainApp.css';
import AddSourceModal from './AddSourceModal';
import PdfViewer from './PdfViewer';
import ChatInterface from './ChatInterface';
import { uploadFile } from '../services/api';


const MainApp = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const pdfViewerRef = useRef(null); // Ref for PdfViewer

  const handleUpload = async (file) => {
    console.log("handleUpload called with file:", file);
    if (!file) {
      alert('Please select a file.');
      return;
    }
    try {
      const response = await uploadFile(file);
      console.log("uploadFile response:", response);
      console.log("uploadFile response url:", response.pdfUrl);
      setPdfUrl(response.pdfUrl); // Set the PDF URL
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Error uploading file");
    }
  };

  const handleAddSourceClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    const goToPage = (page) => {
        // Access the PdfViewer component through the ref and call its goToPage function
        if (pdfViewerRef.current && pdfViewerRef.current.goToPage) {
            pdfViewerRef.current.goToPage(page);
        }
    };


  useImperativeHandle(ref, () => ({
    goToPage: goToPage, // Expose goToPage function
  }));

  return (
    <div className="main-app">
      <header className="app-header">
        <div className="app-logo">Untitled Notebook</div>
        <div className="app-actions">
          <button className="share-button">Share</button>
          <button className="settings-button">Settings</button>
        </div>
      </header>

      <main className="app-content">
        <section className="sources">
          <h2>Sources</h2>
          <button className="add-source-button" onClick={handleAddSourceClick}>
            + Add source
          </button>
          {/* Saved sources will appear here */}
        </section>

        <section className="chat">
          <h2>Chat</h2>
          <div className="empty-chat">
            <p>Add a source to get started</p>
            <button className="upload-source-button" onClick={handleAddSourceClick}>
              Upload a source
            </button>
              {pdfUrl && ( // Only render ChatInterface when a PDF is uploaded
                  <ChatInterface pdfUrl={pdfUrl} goToPage={goToPage} />
              )}
          </div>
        </section>

        <section className="studio">
          <h2>Studio</h2>
          <div className="audio-overview">
            <h3>Audio Overview</h3>
            {/* Audio overview content */}
          </div>
          <div className="notes">
            <h3>Notes</h3>
            {/* Notes content */}
          </div>
        </section>

          {pdfUrl && (
              <section className="pdf-viewer">
                  <h2>PDF Viewer</h2>
                  <PdfViewer pdfUrl={pdfUrl} ref={pdfViewerRef} /> {/* Use the ref */}
              </section>
          )}

        {showModal && (
          <AddSourceModal
            onClose={handleCloseModal}
            onUpload={handleUpload} // Pass the upload handler to the modal
          />
        )}
      </main>

    </div>
  );
});

export default MainApp;