require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ndarray = require('ndarray');
const ops = require('ndarray-ops');
const cosineSimilarity = require('compute-cosine-similarity');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const natural = require('natural');
const tokenizer = new natural.SentenceTokenizer();


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

async function extractTextFromPDF(pdfFile) {
    const data = await pdf(pdfFile);
    return data.text.toString(); // Return the text as a string
}


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

async function SemanticSearch() {

    app.post("/file", upload.single('file'), async(req, res) => {

        const file = req.file; // The uploaded file is available in req.file
        const fileName = req.file.originalname;
        const { message } = JSON.parse(req.body.message);

        // // Set up OpenAI API key and model
        const MODEL_ENGINE = 'text-embedding-ada-002';

        async function createDocumentList(text, maxChars = 500) {
            // Split text into sentences
            const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);

            // Group sentences into documents
            const documents = [];
            for (const sentence of sentences) {
                if (sentence.length <= maxChars) {
                    documents.push(sentence.trim());
                }
            }
            return documents;
        }

        let text = await extractTextFromPDF('uploads/' + fileName);

        console.log(text);

        const documents = await createDocumentList(text);

        // Create document embeddings using OpenAI's text-embedding-ada-2 model
        const embeddings = [];
        for (const doc of documents) {
            const res = await openai.createEmbedding({
                model: MODEL_ENGINE,
                input: [doc]
            });
            embeddings.push(res);
        }

        // Define query to search for
        const query = message.toString();

        // Create embedding for query
        const queryRes = await openai.createEmbedding({
            model: MODEL_ENGINE,
            input: [query]
        });
        const queryEmbedding = ndarray(queryRes.data.data[0]);
        const queryEmbeddingArray = queryEmbedding.data.embedding;

        // Perform semantic search by calculating cosine similarity between query and document embeddings
        const rankedIndices = [];
        for (let i = 0; i < documents.length; i++) {
            const docEmbedding = embeddings[i].data.data[0].embedding;
            const similarity = cosineSimilarity(queryEmbeddingArray, docEmbedding);
            rankedIndices.push([i, similarity]);
        }
        rankedIndices.sort((a, b) => b[1] - a[1]);

        // Print top 5 search results
        const results = [];
        for (let i = 0; i < 5; i++) {
            const index = rankedIndices[i][0];
            results.push(documents[index]);
        }


        //Answer the question by passing the results to the davinci model
        async function answerQuestion(query, results) {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `i have a {text} and i would like you to only ansewr my {question} based on the content of that text. I would also like the ansewr to be in the same language as the question. If you dont find the ansewr in that text, say you cant find it in that document in the same language the question was asked. Text: ${results}  Question: ${query}  Svar: `,
                max_tokens: 1000,
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