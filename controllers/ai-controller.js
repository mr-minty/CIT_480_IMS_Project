const aiService = require("../services/ai-service");

async function getNewItemValues (req, res) {
    const {prompt} = req.body;
    try {
        const values = await aiService.parseNewItem(prompt);
        return res.json(values);
    } catch (err) {
        console.log(err);
        throw(err);
    }
}

module.exports = { getNewItemValues };