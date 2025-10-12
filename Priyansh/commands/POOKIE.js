const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "eshuu",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Smart, flirty, always-on AI bot 🌸",
    commandCategory: "Chat 💬",
    usages: "[text] OR on/off",
    cooldowns: 2,
    dependencies: { axios: "" },
};

module.exports.onLoad = async function () {
    if (typeof global.eshuuActive === "undefined") global.eshuuActive = true;
    if (!global.eshuuMessages) global.eshuuMessages = new Set();
};

async function getReply(text) {
    try {
        const res = await axios.get(
            encodeURI(`https://sim-a9ek.onrender.com/sim?type=ask&ask=${text}&apikey=PriyanshVip`)
        );
        return res.data.answer || "😅 Sorry, ami ekhon bujhte parini...";
    } catch (err) {
        return "⚠️ Error fetching reply.";
    }
}

const mentionTriggers = ["eshuu", "baby", "bot", "bott", "pookie"];

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    // On/Off toggle
    if (args[0] === "on") {
        global.eshuuActive = true;
        return api.sendMessage("🌸 Eshuu is now active and listening~ 💞", threadID, messageID);
    }
    if (args[0] === "off") {
        global.eshuuActive = false;
        return api.sendMessage("💤 Eshuu is now sleeping... wake me up later 💤", threadID, messageID);
    }

    if (!args[0]) return api.sendMessage("💬 Type something for Eshuu to reply or use on/off", threadID, messageID);

    // If active, get smart reply
    if (!global.eshuuActive) return api.sendMessage("😴 Eshuu is off now.", threadID, messageID);

    const replyText = await getReply(args.join(" "));
    global.eshuuMessages.add(messageID);
    return api.sendMessage(replyText, threadID, messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!global.eshuuActive || !body) return;

    // Avoid bot replying to itself (just in case)
    if (event.isGroup && senderID == api.getCurrentUserID?.()) return;

    // Check if mentioned or replying to Eshuu’s message
    if (
        mentionTriggers.some(w => body.toLowerCase().includes(w)) ||
        (messageReply && global.eshuuMessages.has(messageReply.messageID))
    ) {
        const flirtyReplies = [
            "🌸 Ami ekhane! Kemon acho?",
            "💖 Haa, ami eshuu! Tumake dekhe khushi laglo!",
            "😉 Tumake miss korchi ❤️",
            "🥰 Amake call koro, ami ready!",
            "💌 Eshey amar sathe kotha bolo!",
            "🌸 Ami ekhane, tumar kotha shunte chai!",
            "💖 Tumake dekhte chai!",
            "😎 Hey! Tumake welcome korchi~",
            "❤️ Ami eshuu, tumar friend always 💫",
            "✨ Ami ekhane, flirty mode on~ 😘"
        ];

        // 50% chance to send flirty reply, 50% smart AI reply
        const random = Math.random() < 0.5;
        const replyText = random
            ? flirtyReplies[Math.floor(Math.random() * flirtyReplies.length)]
            : await getReply(body);

        global.eshuuMessages.add(messageID);
        return api.sendMessage(replyText, threadID, messageID);
    }
};
