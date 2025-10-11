const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "pookie",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Smart, aesthetic, self-learning AI bot 🌸 Always-on, auto-reply & teachable",
    commandCategory: "Chat 💬",
    usages: "[text] OR teach [msg] - [reply] OR on/off",
    cooldowns: 2,
    dependencies: { axios: "" },
};

module.exports.onLoad = async function() {
    if (!global.pookieMessages) global.pookieMessages = new Set();
    if (!global.pookieActive) global.pookieActive = true; // always-on globally
};

// Fetch reply from API
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

// Commands that trigger teaching
const teachingTriggers = ["teach", "pookie teach", "baby teach", "bot teach"];

module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;

    if (!args[0]) return api.sendMessage("🌸 Type something or teach me: teach [msg] - [reply]", threadID, messageID);

    const command = args[0].toLowerCase();

    // ✅ Teaching
    if (teachingTriggers.includes(command) || teachingTriggers.some(t => event.body.toLowerCase().startsWith(t))) {
        const input = event.body.split("-"); // split message at "-"
        if (!input[1]) return api.sendMessage("❌ Format: teach [msg] - [reply]", threadID, messageID);

        const question = input[0].replace(/teach|pookie teach|baby teach|bot teach/i, "").trim();
        const answer = input[1].trim();
        const userName = (await Users.getData(senderID)).name;
        const timeZ = moment.tz("Asia/Kolkata").format("HH:mm:ss | DD/MM/YYYY");

        try {
            await axios.get(
                encodeURI(`https://sim-a9ek.onrender.com/sim?type=teach&ask=${question}&ans=${answer}&apikey=PriyanshVip`)
            );
            return api.sendMessage(`🌸 Learned successfully!\n💬 ${question} -> ${answer}\n👤 Teacher: ${userName}\n⏱ ${timeZ}`, threadID, messageID);
        } catch {
            return api.sendMessage("⚠️ Error teaching message.", threadID, messageID);
        }
    }

    // ✅ Turn ON/OFF
    if (command === "on") {
        global.pookieActive = true;
        return api.sendMessage("✅ Pookie is now active globally!", threadID, messageID);
    } else if (command === "off") {
        global.pookieActive = false;
        return api.sendMessage("❌ Pookie is now inactive globally!", threadID, messageID);
    }

    // ✅ Normal message - auto reply
    if (!global.pookieActive) return;
    const replyText = await getReply(args.join(" "));
    global.pookieMessages.add(messageID);
    return api.sendMessage(replyText, threadID, messageID);
};

// ✅ Auto-reply when mentioned or replied to
module.exports.handleEvent = async function({ api, event, Users }) {
    const { threadID, messageID, senderID, body, messageReply } = event;
    if (!global.pookieActive) return;
    if (!body) return;

    const triggerWords = ["pookie", "baby", "bot", "bott"];
    const bodyLower = body.toLowerCase();

    // Trigger if bot is mentioned or replying to previous bot message
    if (
        triggerWords.some(w => bodyLower.includes(w)) ||
        (messageReply && global.pookieMessages.has(messageReply.messageID))
    ) {
        if (senderID === api.getCurrentUserID()) return;

        const replyText = await getReply(body);
        global.pookieMessages.add(messageID);
        return api.sendMessage(replyText, threadID, messageID);
    }
};
