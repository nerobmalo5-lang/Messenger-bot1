const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "eshuu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Smart, flirty, always-on AI bot 🌸",
    commandCategory: "Chat 💬",
    usages: "[text] OR on/off",
    cooldowns: 2,
    dependencies: { axios: "" },
};

module.exports.onLoad = async function() {
    if (!global.eshuuActive) global.eshuuActive = true;
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

const mentionTriggers = ["eshuu", "baby", "bot", "bott"];

module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;
    if (!args[0]) return;

    const bodyLower = event.body.toLowerCase();

    // Flirty replies when mentioned
    if (mentionTriggers.some(w => bodyLower.includes(w))) {
        const flirtyReplies = [
            "🌸 Ami ekhane! Kemon acho?",
            "💖 Haa, ami eshuu! Tumake dekhe khushi laglo!",
            "😉 Tumake miss korchi ❤️",
            "🥰 Amake call koro, ami ready!",
            "💌 Eshey amar sathe kotha bolo!",
            "🌸 Ami ekhane, tumar kotha shunte chai!",
            "💖 Tumake dekhte chai!",
            "😎 Hey! Tumake welcome korchi",
            "❤️ Ami eshuu, tumar friend always",
            "✨ Ami ekhane, tumar sathe flirty kotha bolte ready!"
        ];
        const reply = flirtyReplies[Math.floor(Math.random() * flirtyReplies.length)];
        global.eshuuMessages.add(messageID);
        return api.sendMessage(reply, threadID, messageID);
    }

    // Normal auto-reply using API
    if (!global.eshuuActive) return;
    const replyText = await getReply(args.join(" "));
    global.eshuuMessages.add(messageID);
    return api.sendMessage(replyText, threadID, messageID);
};

module.exports.handleEvent = async function({ api, event, Users }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!global.eshuuActive) return;
    if (!body) return;

    if (
        mentionTriggers.some(w => body.toLowerCase().includes(w)) ||
        (messageReply && global.eshuuMessages.has(messageReply.messageID))
    ) {
        if (senderID === api.getCurrentUserID()) return;

        const replyText = await getReply(body);
        global.eshuuMessages.add(messageID);
        return api.sendMessage(replyText, threadID, messageID);
    }
};
