const aiService = require("../services/ai-service");

async function getNewItemValues (req, res) {
    const {prompt} = req.body;
    try {
        const values = await aiService.parseNewItem(prompt);
        return res.json(values);
    } catch (err) {
        if (err.message === "AI feature not configured") {
            return res.status(400).json({
                success: false,
                error: "AI feature is not configured."
            });
        }
        console.log(err);
        throw(err);
    }
}

module.exports = { getNewItemValues };