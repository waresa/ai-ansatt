require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ndarray = require('ndarray');
const cosineSimilarity = require('compute-cosine-similarity');
const multer = require('multer');
const pdf = require('pdf-parse');
const NodeCache = require('node-cache');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

// Create a new NodeCache instance to use as the cache for the document list and embeddings
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
const embeddingsCache = new Map(); // Create a new Map to use as the cache

//Function to cache the embeddings for the document to avoid having to calculate them every time
async function getEmbedding(document) {

    let embedding = []; // Create an empty array to store the embedding

    // Check if embedding for the document is already in the cache
    if (embeddingsCache.has(document)) {
        embedding = embeddingsCache.get(document);
    } else {
        // If embedding is not in the cache, calculate it and add it to the cache
        const embs = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: document
        });

        for (let i = 0; i < embs.data.data.length; i++) {
            embedding.push(embs.data.data[i].embedding);
        }
        embeddingsCache.set(document, embedding); // Store the calculated embedding in the cache
    }

    return embedding;
}

// Function to split the text into batches and cache the batches to avoid having to split the text every time
async function createDocumentList(text, maxChars = 500) {
    const cacheKey = `documentList:${text}`;
    let documents = cache.get(cacheKey);

    if (!documents) {
        const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
        documents = [];

        for (const sentence of sentences) {
            if (sentence.length <= maxChars) {
                documents.push(sentence.trim());
            }
        }

        cache.set(cacheKey, documents);
    }

    return documents;
}

// Function to extract text from a file
async function extractTextFromFile(filePath) {
    const fileExt = path.extname(filePath);

    if (fileExt === '.pdf') {
        const data = await pdf(fs.readFileSync(filePath));
        return data.text.toString();
    } else if (fileExt === '.docx') {
        const data = await mammoth.extractRawText({ path: filePath });
        return data.value.toString();
    } else if (fileExt === '.txt') {
        const data = fs.readFileSync(filePath, 'utf-8');
        return data;
    } else {
        throw new Error(`Unsupported file type: ${fileExt}`);
    }
}

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/') // change 'uploads/' to your desired upload directory
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})


const app = express();
const upload = multer({ storage: storage });


const configuration = new Configuration({
    organization: "org-sYYmLMY94sOW5iVo6SToprzN",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());


async function callApi() {

    app.post("/chat", upload.single('file'), async(req, res) => {
        const { message, ansatt, generator } = JSON.parse(req.body.message);

        // variable tool that is ansatt if ansatt is not empty string, and generator if generator is not empty string
        const tool = ansatt || generator;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Act as a(n) ${tool}. Ansewr in language asked, default to norwegian. Q: ${message}?`,
            max_tokens: 2000,
            temperature: 0.9,
        });
        res.json({
            message: response.data.choices[0].text
        })
        console.log(message);
        console.log(response.data.choices[0].text);
    });
}

// Function to perform semantic search on a document
async function SemanticSearch() {

    // post request to /file, which is the endpoint for uploading a file and performing semantic search
    app.post("/file", upload.single('file'), async(req, res) => {

        // Get the file name and the message from the request body
        const fileName = req.file.originalname;
        const { message } = JSON.parse(req.body.message);

        // Extract text from the PDF file
        let text = await extractTextFromFile('uploads/' + fileName);

        // split the text into batches and cache the batches to avoid having to split the text every time
        const documents = await createDocumentList(text);

        // Calculate the embeddings for the document batches and cache the embeddings to avoid having to calculate them every time
        const embeddings = await getEmbedding(documents);

        // Define query to search for
        const query = message.toString();

        // Create embedding for query
        const queryRes = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: [query]
        });
        const queryEmbedding = ndarray(queryRes.data.data[0]);
        const queryEmbeddingArray = queryEmbedding.data.embedding;

        // Perform semantic search by calculating cosine similarity between query and document embeddings
        const rankedIndices = [];
        for (let i = 0; i < documents.length; i++) {
            const docEmbedding = embeddings[i];
            const similarity = cosineSimilarity(queryEmbeddingArray, docEmbedding);
            rankedIndices.push([i, similarity]);
        }
        rankedIndices.sort((a, b) => b[1] - a[1]);

        // save the top 5 results in an array
        const results = [];
        for (let i = 0; i < 15; i++) {
            const index = rankedIndices[i][0];
            results.push(documents[index]);
        }

        console.log(results);


        //Answer the question by passing the results to the davinci model and asking it to answer the question
        async function answerQuestion(query, results) {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `i have a {text} which is embeddings with closest cosine to the question, and i would like you to ansewr my {question} detailed based on the content of that embeddings. I would also like the ansewr to be in the same language as the question. If you dont find the ansewr in that text, say you cant find it in that document in the same language the question was asked. Text: ${results}  Question: ${query}  Svar: `,
                max_tokens: 2000,
                temperature: 0.5
            });
            return response.data.choices[0].text;
        }
        const response = await answerQuestion(query, results);
        console.log(response);
        res.json({
            message: response
        })
    })
}

async function appFunction() {
    const port = 3080;
    await callApi();
    await SemanticSearch();
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}


appFunction();