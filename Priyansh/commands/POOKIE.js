const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "pookie",
    version: "2.4.0",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Teachable AI bot 🌸 Teach flow with confirmation",
    commandCategory: "Chat 💬",
    usages: "[text] OR teach [msg] - [reply]",
    cooldowns: 2,
    dependencies: { axios: "" },
};

module.exports.onLoad = async function() {
    if (!global.pookieActive) global.pookieActive = true;
    if (!global.pookieMessages) global.pookieMessages = new Set();
};

// Commands that trigger teaching
const teachingTriggers = ["teach", "pookie teach", "baby teach", "bot teach"];

// ✅ Command: Start teach
module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;
    const bodyLower = event.body.toLowerCase();

    if (!teachingTriggers.some(t => bodyLower.startsWith(t))) return;

    // Ask user for the question
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
};

// ✅ Handle step 1: Receive question
module.exports.handleReply = async function({ api, event, handleReply, Users }) {
    const { threadID, messageID, senderID, body } = event;

    if (handleReply.name !== "pookie_teach" || handleReply.step !== 1 || handleReply.author !== senderID) return;
    const question = body.trim();
    if (!question) return api.sendMessage("❌ Please type a valid question.", threadID, messageID);

    // Ask for answer
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

    // Delete previous message
    api.unsendMessage(handleReply.messageID);
};

// ✅ Handle step 2: Receive answer and save
module.exports.handleReplyAnswer = async function({ api, event, handleReply, Users }) {
    const { threadID, messageID, senderID, body } = event;

    if (handleReply.name !== "pookie_teach" || handleReply.step !== 2 || handleReply.author !== senderID) return;

    const answer = body.trim();
    const question = handleReply.question;
    const userName = (await Users.getData(senderID)).name;
    const timeDhaka = moment.tz("Asia/Dhaka").format("HH:mm:ss | DD/MM/YYYY");

    try {
        // Save to API
        await axios.get(
            encodeURI(`https://sim-a9ek.onrender.com/sim?type=teach&ask=${question}&ans=${answer}&apikey=PriyanshVip`)
        );

        // Delete temporary messages
        api.unsendMessage(handleReply.messageID);

        // ✅ Final confirmation (won't be deleted)
        await api.sendMessage(
            `🌸 Teach Added Successfully!\n💬 Question: ${question}\n💡 Answer: ${answer}\n👤 Teacher: ${userName}\n⏱ Time (Dhaka): ${timeDhaka}`,
            threadID
        );
    } catch (err) {
        api.sendMessage(`⚠️ Error saving teach: ${err.message}`, threadID, messageID);
    }
};
