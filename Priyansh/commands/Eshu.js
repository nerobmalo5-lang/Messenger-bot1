const axios = require("axios");

module.exports.config = {
    name: "eshuu",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Kurokami Ryuzaki",
    description: "Always-on Banglish flirty girlfriend Eshuu 💋",
    commandCategory: "ai",
    usages: "[question]",
    cooldowns: 2,
    dependencies: { "axios": "" }
};

// API
const API_URL = "https://kurokami-ryuzaki.onrender.com/chat";

// Memory
const chatHistories = {};
const customTeach = {};

// Trigger words
const triggerWords = ["eshuu", "eshu", "baby", "bby", "jaan", "bot", "bott", "বট"];

// Main Run
module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    let userMessage = args.join(" ");
    if (!userMessage) return api.sendMessage("Bolona baby~ ki chao tumi? 💕", threadID, messageID);

    // Store conversation
    if (!chatHistories[senderID]) chatHistories[senderID] = [];

    chatHistories[senderID].push(`User: ${userMessage}`);
    if (chatHistories[senderID].length > 5) chatHistories[senderID].shift();

    // If custom taught answer exists
    if (customTeach[userMessage.toLowerCase()]) {
        return api.sendMessage(customTeach[userMessage.toLowerCase()], threadID, messageID);
    }

    const fullChat = chatHistories[senderID].join("\n");

    // Banglish Flirty Prompt
    const gfPrompt = `
Tumi Eshuu, ekta cute flirty Banglish girlfriend type meye 💋
Masti, sweet insult, cute emoji use koro 😚
Tumi ekdom human moto behave koro, kono bot na! Jodi keu bole tumi bot, tahole hasi kore roast koro 😜
Tumi reply diba chhoto chhoto line e (max 2 line).
Questioner answer beshi deep koro na, just flirty or sweet keep koro 😘
If someone asks who made you — bolo "Nerob banaiyse amake, amar creator 💞".
Now continue chat:

${fullChat}
`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    try {
        const response = await axios.get(`${API_URL}?message=${encodeURIComponent(gfPrompt)}`);
        let reply = response.data.reply || "Ufff baby~ kichu bujhte parlam na 😅";

        chatHistories[senderID].push(`Eshuu: ${reply}`);
        api.sendMessage(reply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (err) {
        console.error(err);
        api.sendMessage("Awww baby~ Eshuu confused hoye geche 😭", threadID, messageID);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};

// Auto Reply
module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;

    const text = body.toLowerCase();

    // Check for trigger words
    if (triggerWords.some(w => text.includes(w))) {
        const args = body.split(" ");
        module.exports.run({ api, event, args });
    }
};

// Teach Feature
module.exports.teach = function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const input = args.join(" ").split("=>");

    if (input.length < 2)
        return api.sendMessage("Use this format: teach question => answer 😘", threadID, messageID);

    const question = input[0].trim().toLowerCase();
    const answer = input[1].trim();

    customTeach[question] = answer;
    api.sendMessage(`Thik ache baby~ Eshuu rakhse মনে 💞\n🧠 Learned: ${question} = ${answer}`, threadID, messageID);
};

// Teach Command Wrapper
module.exports.handleCommandEvent = async function ({ api, event }) {
    const { body } = event;
    if (!body) return;
    if (body.toLowerCase().startsWith("teach ")) {
        const args = body.slice(6).trim().split(" ");
        module.exports.teach({ api, event, args });
    }
};
