const baseURL = 'http://localhost:5009/api'; // Adjust if your backend is running elsewhere
async function uploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('pdfFile', file);

        const response = await fetch(`${baseURL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

export { uploadFile };