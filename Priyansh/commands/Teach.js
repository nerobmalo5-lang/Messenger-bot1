const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "teach",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Teach eshuu new responses 🌸",
    commandCategory: "Chat 💬",
    usages: "teach OR eshuu teach OR baby teach",
    cooldowns: 2,
    dependencies: { axios: "" },
};

const teachingTriggers = ["teach", "eshuu teach", "baby teach", "bot teach"];

module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID } = event;
    const bodyLower = event.body.toLowerCase();

    if (!teachingTriggers.some(t => bodyLower.startsWith(t))) return;

    // Ask user for question
    const info = await api.sendMessage(
        "🌸 What question do you want to teach eshuu? Reply to this message with the question.",
        threadID,
        messageID
    );

    global.client.handleReply.push({
        step: 1,
        name: "teach_eshuu",
        messageID: info.messageID,
        author: senderID,
        threadID
    });
};

module.exports.handleReply = async function({ api, event, handleReply, Users }) {
    const { threadID, messageID, senderID, body } = event;

    if (handleReply.name !== "teach_eshuu" || handleReply.author !== senderID) return;

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
            name: "teach_eshuu",
            question: question,
            messageID: info.messageID,
            author: senderID,
            threadID
        });

        // Delete temporary message
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
            // Save to API
            await axios.get(
                encodeURI(`https://sim-a9ek.onrender.com/sim?type=teach&ask=${question}&ans=${answer}&apikey=PriyanshVip`)
            );

            // Delete temp messages
            api.unsendMessage(handleReply.messageID);

            // Confirmation message (won't be deleted)
            await api.sendMessage(
                `🌸 Teach Added Successfully!\n💬 Question: ${question}\n💡 Answer: ${answer}\n👤 Teacher: ${userName}\n⏱ Time (Dhaka): ${timeDhaka}`,
                threadID
            );
        } catch (err) {
            api.sendMessage(`⚠️ Error saving teach: ${err.message}`, threadID, messageID);
        }
    }
};
