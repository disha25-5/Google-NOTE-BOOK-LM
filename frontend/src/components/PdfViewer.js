import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Disable selection error

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pdfContainerRef = useRef(null);

    useEffect(() => {
        setPageNumber(1); // Reset to page 1 on new PDF load
    }, [pdfUrl]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const goToPrevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
    };

    const goToNextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
    };

    const goToPage = (page) => {
      setPageNumber(page);
    }

    return (
        <div ref={pdfContainerRef}>
            {pdfUrl ? (
                <div>
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
                    </Document>
                    <div>
                        <button onClick={goToPrevPage}>Prev</button>
                        <span>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</span>
                        <button onClick={goToNextPage}>Next</button>
                    </div>
                </div>
            ) : (
                <p>No PDF selected.</p>
            )}
        </div>
    );
};

export default PdfViewer;