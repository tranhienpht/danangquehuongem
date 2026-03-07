const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.VITE_GOOGLE_API_KEY;
if (!apiKey) {
    console.error("No API key found in .env under VITE_GOOGLE_API_KEY");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Fetching available models...");
        // Although listModels is not fully supported in the latest @google/generative-ai SDK directly 
        // via getGenerativeModel, we can fetch it via REST if needed, or check common ones.
        // Using REST fetch for precision since SDK might abstract it.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("\n--- SUPPORTED MODELS ---");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
            console.log("------------------------");
        } else {
            console.log("Unexpected format:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
