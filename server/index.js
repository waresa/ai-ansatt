require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ndarray = require('ndarray');
const ops = require('ndarray-ops');
const cosineSimilarity = require('compute-cosine-similarity');


const configuration = new Configuration({
    organization: "org-sYYmLMY94sOW5iVo6SToprzN",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);




async function callApi() {

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const port = 3080;

    app.post("/", async(req, res) => {

        const { message } = req.body;
        const { ansatt } = req.body;
        const { generator } = req.body;

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
        console.log();
        console.log(response.data.choices[0].text);
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });

}

async function test() {
    // Set up OpenAI API key and model
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

    const text = "Med to bom på fem ståendeskudd, skjøt Tandrevold seg ut av både gull- og medaljekampen og helt ned til en 14.-plass på VM-sprinten i Oberhof. Det er bare to dager siden Tandrevold skjøt fire bom på stående skyting da Norge tok VM-gull på blandet stafett onsdag, hun erkjenner at hun tok med seg litt av den følelsen inn i første individuelle øvelse.– Det hjelper jo ikke på selvtilliten akkurat. Jeg skulle gjerne hatt noen bedre serier i det siste, men samtidig kan jeg ikke gjøre noe med det jeg gjorde i dag. Det er som det er og det blir som det blir. – Jeg har veldig lyst å få fullt hus, for jeg er så lei av å stå og hele tiden måtte svare for meg. Det er ikke sånn man bygger selvtillit. Jeg skulle veldig gjerne fått ned minst en blink til i dag, og det er jeg veldig motivert til å få til på (jaktstarten) søndag, sier 26-åringen til VG. Spurt om hvordan hun jobber for å snu trenden, er svaret kontant: – Jeg føler ikke det er noe å snu.I sporet er formen upåklagelig, hun hadde fjerde beste langrennstid og var «bare» 19,7 sekunder bak tidligere langrennsløper og fredagens sprintvinner Denise Herrmann-Wick i langrennsdelen. Det tyske håpet Denise Herrmann-Wick vant etter et realt drama mot svenske Hanna Öberg. Marte Olsbu Røiseland kjempet lenge om en bronsemedalje, men svenske Linn Persson kom bakfra og spolerte den muligheten. For Tandrevold er det ingen tvil om hvor skoen trykker. Hun er mer treffsikker enn noen gang på liggende skyting (95,8 i treffprosent) denne sesongen, mens stående har treffprosenten falt med mer enn fire prosentpoeng fra forrige sesong (fra 81,6 til 77,5 prosent) ifølge statistikksiden Real Biathlon. – Jeg er mer usikker enn jeg har vært tidligere i år, sier Fossum-løperen på spørsmål om hvordan det er å skyte stående om dagen.";
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
    const query = "Hva heter treneren til Tandrevold?";

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


    // Answer the question by passing the results to the davinci model
    async function answerQuestion(query, results) {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Act as an assistant and answer the question in detail. Question: ${query} Context: ${results} Answer: `,
            max_tokens: 1000,
            temperature: 0.5
        });
        return response.data.choices[0].text;
    }

    const response = await answerQuestion(query, results);
    console.log(response);
}

test();
// callApi();

//Create a simple express api that calls the function above and returns the response