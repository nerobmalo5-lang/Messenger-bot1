const axios = require("axios");

module.exports.config = {
    name: "eshuu",
    version: "4.4.0",
    hasPermssion: 0,
    credits: "💞 𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Always-on flirty chatbot that replies when called 💋",
    commandCategory: "Chat",
    usages: "Auto replies when someone calls Eshuu, Bot, or bby",
    cooldowns: 3
};

// SimSimi API
async function simsimi(message) {
    try {
        const encoded = encodeURIComponent(message);
        const { data } = await axios.get(`https://api.simsimi.net/v2/?text=${encoded}&lc=en`);
        return { error: false, data };
    } catch {
        return { error: true, data: {} };
    }
}

// Handle message events
module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body || senderID == api.getCurrentUserID()) return;

    const text = body.toLowerCase();
    // Trigger words
    const triggerWords = ["eshuu", "eshhu", "bot", "bby", "baby"];

    if (triggerWords.some(word => text.includes(word))) {
        const { data, error } = await simsimi(body);
        if (error) return;
        const reply = data.success ? data.success : (data.error || "Hmm?");
        return api.sendMessage(reply, threadID, messageID);
    }
};

// Run command manually if needed
module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    if (!args[0]) return api.sendMessage("Yes baby? 💞", threadID, messageID);

    const text = args.join(" ");
    const { data, error } = await simsimi(text);
    if (error) return;
    const reply = data.success ? data.success : (data.error || "Hmm?");
    return api.sendMessage(reply, threadID, messageID);
};
