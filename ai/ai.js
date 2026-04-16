const OpenAI = require("openai");
const apiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI();

async function submitPrompt (userInput) {
    const response = await client.responses.create({
        model: "gpt-5.4-mini",
        input: userInput
    });

    return JSON.parse(response.output_text);
}

module.exports = { submitPrompt };