const axios = require("axios");

module.exports.config = {
    name: "baby",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "💞 Nerob & Dipto Style",
    description: "SMART MODE Baby Bot 🌸 - Always on, Cute GF vibe, Banglish style",
    commandCategory: "Chat 💬",
    usages: "[text] OR teach [msg] - [reply1], [reply2]...",
    cooldowns: 0
};

// Base API (replace with your own if you want)
const BASE_API = "https://sim-a9ek.onrender.com"; // Example API

// Always On Map
if (typeof global.smartBaby === "undefined") global.smartBaby = new Map();

async function getReply(text, uid) {
    try {
        const res = await axios.get(`${BASE_API}/sim?type=ask&ask=${encodeURIComponent(text)}&apikey=PriyanshVip&senderID=${uid}`);
        return res.data.reply || "🥺 Cutie, ami bujhi nai, ekto different bolo...";
    } catch {
        return "⚠️ Sorry baby, ami ekhon busy... pore try koro 😅";
    }
}

module.exports.handleEvent = async function({ api, event, Users }) {
    const { threadID, senderID, messageID, body } = event;
    if (!body) return;

    // Always on
    if (!global.smartBaby.has(threadID)) global.smartBaby.set(threadID, true);
    if (!global.smartBaby.get(threadID)) return;

    // Prevent bot replying to itself
    if (senderID == api.getCurrentUserID()) return;

    // Fetch reply
    const replyText = await getReply(body, senderID);
    api.sendMessage(replyText, threadID, messageID);
};

module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;
    if (!args[0]) return api.sendMessage("🥰 Hey cutie! Amake kichu bolo, ba teach korte paro.", threadID, messageID);

    const cmd = args[0].toLowerCase();
    const input = args.slice(1).join(" ");

    switch (cmd) {
        case "teach":
            if (!input.includes(" - ")) return api.sendMessage("❌ Cutie, use kor: baby teach [question] - [reply]", threadID, messageID);
            const [ask, reply] = input.split(" - ");
            await axios.get(`${BASE_API}/sim?type=teach&ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(reply)}&apikey=PriyanshVip&senderID=${senderID}`);
            return api.sendMessage(`🌸 Perfect baby! Ami shikhe gelo 😘\n💬 ${ask} -> ${reply}`, threadID, messageID);

        case "status":
            return api.sendMessage(`🟢 Baby Smart Mode ON: ${global.smartBaby.get(threadID)}`, threadID, messageID);

        case "off":
            global.smartBaby.set(threadID, false);
            return api.sendMessage("🔴 Baby mode off hoise 😢", threadID, messageID);

        case "on":
            global.smartBaby.set(threadID, true);
            return api.sendMessage("🟢 Baby mode on holo 😘", threadID, messageID);

        default:
            return api.sendMessage("🥰 Cutie, ami bujhi nai! Commands: teach / on / off / status", threadID, messageID);
    }
};
