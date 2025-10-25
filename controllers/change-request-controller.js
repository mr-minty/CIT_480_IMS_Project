const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({ region: 'us-east-1' });

async function createChangeRequestEntry(req, res) {

    console.log("test controller called");

    const { name, change, details, pages, date } = req.body;
    const data = { name, change, details, pages, date };

    console.log(JSON.stringify(data, null, 2));

    try {
        await s3.send(new PutObjectCommand({
            Bucket: "cit480-ims-changerequests",
            Key: `requests/${Date.now()}.json`,
            Body: JSON.stringify(data, null, 2),
            ContentType: "application/json"
        }));
        return res.status(201).json({ message: "Request sent successfully" });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
    
}

module.exports = createChangeRequestEntry;