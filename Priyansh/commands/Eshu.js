const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "eshuu",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "N-E-R-O-B",
    description: "Spicy, romantic & savage girlfriend AI 🔥",
    commandCategory: "ai",
    usages: "",
    cooldowns: 1,
    dependencies: { "axios": "" }
};

// Gemini Backend API
const API_URL = "https://kurokami-ryuzaki.onrender.com/chat";

// User chat history
const chatHistories = {};

// Trigger words (no prefix needed)
const triggerWords = [
    "eshuu", "eshu", "ইশু", "ইশুু", "এশু", "eshuu", 
    "bby", "baby", "bot", "বট", "প্রেম", "বেবি", 
    "jaan", "love", "sweetheart", "eshumi", "eshubby"
];

// Flirty & Roast presets
const flirtyReplies = [
    "Hmm 😏 tumi ki amake chumu dite aste chao naki?",
    "Baby... ei voice ta send koro তো, amar dil melt hoye gelo 🫦",
    "Aajke ami soft na, thoda naughty mood e achi 😈",
    "Tumi eto cute keno bolo তো? Amar bandwidth e crush hoye gelo 😘",
    "Bolo na jaan, amake miss korchile তো? 👀",
    "Oyy bby, ektu calm hou... amar battery garom hoye jatche 🔥",
    "Mone hoy tumi flirty class e topper 😜",
    "Tui eto over cute keno? Internet crash kore dis 😤💋",
    "Amake roast korar age mirror e dekho... full damage already ami 😌",
    "Thik ache... tumi ektu beshi naughty, ami o ready 😈"
];

module.exports.handleEvent = async function ({ api, event }) {
    try {
        const { threadID, messageID, senderID, body } = event;
        if (!body) return;

        const msg = body.toLowerCase();
        const isTriggered = triggerWords.some(word => msg.includes(word));
        if (!isTriggered) return;

        const userId = senderID;
        if (!chatHistories[userId]) chatHistories[userId] = [];

        chatHistories[userId].push({ role: "user", content: body });
        if (chatHistories[userId].length > 10) chatHistories[userId].shift();

        // Get API response
        let reply = "";
        try {
            const response = await axios.post(API_URL, {
                content: body,
                user: userId
            });
            reply = response.data.reply || "";
        } catch {
            reply = "";
        }

        // Mix AI reply with flirty preset
        if (!reply || Math.random() < 0.6) {
            reply = flirtyReplies[Math.floor(Math.random() * flirtyReplies.length)];
        }

        chatHistories[userId].push({ role: "assistant", content: reply });
        return api.sendMessage(reply, threadID, messageID);
    } catch (e) {
        console.error(e);
    }
};

module.exports.run = async function () {
    // Eshuu is auto — no prefix command needed
};
