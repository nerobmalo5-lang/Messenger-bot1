const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "pookie",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Teachable, flirty, smart AI bot 🌸 Auto-reply & teachable",
    commandCategory: "Chat 💬",
    usages: "[text] OR teach [msg] - [reply] OR on/off",
    cooldowns: 2,
    dependencies: { axios: "" },
};

module.exports.onLoad = async function() {
    if (!global.pookieActive) global.pookieActive = true;
    if (!global.pookieMessages) global.pookieMessages = new Set();
};

// Commands that trigger teaching
const teachingTriggers = ["teach", "pookie teach", "baby teach", "bot teach"];
// Words that trigger playful/flirty bot replies
const mentionTriggers = ["pookie", "baby", "bot", "bott"];

// ✅ Fetch API reply
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

// ✅ Main run: teach or auto-reply
module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;
    const bodyLower = event.body.toLowerCase();

    // ✅ Teach command
    if (teachingTriggers.some(t => bodyLower.startsWith(t))) {
        const info = await api.sendMessage(
            "🌸 What question do you want to teach me? Reply to this message with the question.",
            threadID,
            messageID
        );

        global.client.handleReply.push({
            step: 1,
            name: "pookie_teach",
            messageID: info.messageID,
            author: senderID,
            threadID
        });
        return;
    }

    // ✅ Mentioned / flirty replies
    if (mentionTriggers.some(w => bodyLower.includes(w))) {
        const flirtyReplies = [
            "🌸 Oi! Ami ekhane achi 😏",
            "💞 Hey you! Bot is always watching 👀",
            "😅 Haha, kemon aso? Ami pookie 😇",
            "🔥 Flirt alert! Bot is in the house",
            "🥰 Ami kintu tumar jonno ekhane",
            "😎 Bot aache, tension nai",
            "💬 Hello! Ki bolteso? Ami pookie 😏",
            "💡 Ei bot kichu jante chai",
            "🌟 Tumake dekhe bot excited hoye gelo 😝",
            "😇 Haan haan, ami ekhane achi!",
            "😍 Oi shona! Bot ekhane 😘"
        ];
        const replyText = flirtyReplies[Math.floor(Math.random() * flirtyReplies.length)];
        global.pookieMessages.add(messageID);
        return api.sendMessage(replyText, threadID, messageID);
    }

    // ✅ Auto API reply if bot is active
    if (!global.pookieActive) return;
    const replyText = await getReply(args.join(" "));
    global.pookieMessages.add(messageID);
    return api.sendMessage(replyText, threadID, messageID);
};

// ✅ Handle teach steps
module.exports.handleReply = async function({ api, event, handleReply, Users }) {
    const { threadID, messageID, senderID, body } = event;

    if (handleReply.name !== "pookie_teach" || handleReply.author !== senderID) return;

    // Step 1: Receive question
    if (handleReply.step === 1) {
        const question = body.trim();
        if (!question) return api.sendMessage("❌ Please type a valid question.", threadID, messageID);

        const info = await api.sendMessage(
            "🌸 Got it! Now reply to this message with the answer for this question.",
            threadID,
            messageID
        );

        global.client.handleReply.push({
            step: 2,
            name: "pookie_teach",
            question: question,
            messageID: info.messageID,
            author: senderID,
            threadID
        });

        // Delete previous bot message
        api.unsendMessage(handleReply.messageID);
        return;
    }

    // Step 2: Receive answer
    if (handleReply.step === 2) {
        const answer = body.trim();
        const question = handleReply.question;
        const userName = (await Users.getData(senderID)).name;
        const timeDhaka = moment.tz("Asia/Dhaka").format("HH:mm:ss | DD/MM/YYYY");

        try {
            await axios.get(
                encodeURI(`https://sim-a9ek.onrender.com/sim?type=teach&ask=${question}&ans=${answer}&apikey=PriyanshVip`)
            );

            // Delete temporary message
            api.unsendMessage(handleReply.messageID);

            // ✅ Final confirmation (won't be deleted)
            await api.sendMessage(
                `🌸 Teach Added Successfully!\n💬 Question: ${question}\n💡 Answer: ${answer}\n👤 Teacher: ${userName}\n⏱ Time (Dhaka): ${timeDhaka}`,
                threadID
            );
        } catch (err) {
            api.sendMessage(`⚠️ Error saving teach: ${err.message}`, threadID, messageID);
        }
        return;
    }
};
