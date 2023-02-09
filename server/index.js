require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

callApi();

//Create a simple express api that calls the function above and returns the response