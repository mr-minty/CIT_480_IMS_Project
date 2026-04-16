const ai = require("../ai/ai");

async function parseNewItem (prompt) {

    const input = [
          {"role": "system", 
           "content": `
           Extract inventory data from the user's text.

            Return valid JSON only.
            Use exactly these keys:
            "name", "category", "supplier", "price", "unit", "quantity"

            Rules:
            - The first letter of "name" MUST be capitalized
            - "category" must be one of: "Fruit", "Vegetable", "Bakery", "Beverage", "Meat", "Frozen", or "Nuts and Seeds"
            - Infer category from the product name, not the supplier
            - "supplier" is the company/vendor name mentioned in the text
            - "price" must be numeric only
            - "quantity" must be numeric only
            - If a value cannot be determined, use null
            - Do not include markdown
            - Do not include explanations
            - Units must be expressed as their common abbreviation, such as "pound"="lb", "ounce"="oz"
           `

          },
          {"role": "user", "content": prompt}
        ]

    return await ai.submitPrompt(input);
}

module.exports = { parseNewItem };