const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { OpenAI } = require('openai');
const { Document } = require("llamaindex");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'backend/uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
  },
});
const upload = multer({ storage: storage });

// Define a simple route to test the API
router.get('/', (req, res) => {
  res.send('Hello from the API!');
});

// POST /api/upload
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).send('No file uploaded.');
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('File URL:', fileUrl);

  try {
      // Convert the uploaded file to a LlamaIndex Document
      const document = new Document({
          text: fs.readFileSync(req.file.path, "utf8"),
          metadata: { file_path: req.file.path },
      });

    // [IMPORTANT] Store the document for later use in the /api/chat route.
    // Option 1: Store in a database (recommended for production)
    // Option 2: Store in a file (for simpler demos)
    // Option 3: Store in memory (only for very small PDFs and testing)

    // Example (Option 3 - In-memory storage - NOT recommended for large PDFs)
    req.llamaParsedDocuments = [document]; // Store as a single-element array

    console.log("LlamaParse output:", document);
    res.status(200).json({ message: 'File uploaded successfully!', pdfUrl: fileUrl });

  } catch (error) {
    console.error("LlamaParse error:", error);
    return res.status(500).json({ error: "Failed to process PDF with LlamaParse: " + error.message });
  }
});

// POST /api/chat
router.post('/chat', async (req, res) => {
  const { pdfUrl, message } = req.body;

  if (!pdfUrl || !message) {
    return res.status(400).json({ error: 'Missing PDF URL or message.' });
  }

  try {
    // [IMPORTANT] Retrieve the LlamaParse documents from where you stored them
    const documents = req.llamaParsedDocuments;

    if (!documents || documents.length === 0) {
      return res.status(400).json({ error: "No parsed PDF content found.  Make sure to upload a PDF first." });
    }

    // Concatenate all the Markdown content into a single string
    const pdfText = documents.map(doc => doc.pageContent).join("\n\n");

    const prompt = `You are a helpful assistant that answers questions about a PDF document. Use the following text from the PDF to answer the question. If the answer is not in the text, say you don't know.

        PDF Text:
        ${pdfText}

        Question: ${message}
        `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    const responseText = completion.choices[0].message.content;
    const citations = []; // Logic to extract citations (if applicable)

    res.status(200).json({ response: responseText, citations: citations });

  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ error: 'Failed to process chat request.' });
  }
});

module.exports = router;