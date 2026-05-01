const OpenAI = require("openai");

async function submitPrompt (userInput) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("AI feature not configured");
    }
    const client = new OpenAI();
    const response = await client.responses.create({
        model: "gpt-5.4-mini",
        input: userInput
    });

    return JSON.parse(response.output_text);
}

module.exports = { submitPrompt };