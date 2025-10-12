const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: ["eshuuteach", "teach", "botteach"], // multiple trigger names
    version: "1.0.1",
    hasPermssion: 0,
    credits: "💞 N-E-R-O-B",
    description: "Teach Eshuu how to reply cutely 💬",
    commandCategory: "Eshuu 💖",
    usages: "[question => answer]",
    cooldowns: 2,
    dependencies: { "axios": "" }
};

// ───────────── 🩷 Step 1: Command trigger ─────────────
module.exports.run = ({ api, event }) => {
    const { threadID, messageID, senderID } = event;

    return api.sendMessage(
        "🌸 𝗘𝘀𝗵𝘂𝘂 𝗧𝗲𝗮𝗰𝗵 𝗠𝗼𝗱𝗲 🌸\n\n💭 Reply to this message with the *question* you want Eshuu to learn~",
        threadID,
        (err, info) => {
            global.client.handleReply.push({
                step: 1,
                name: module.exports.config.name[0], // use first alias as main name
                messageID: info.messageID,
                content: { id: senderID, ask: "", ans: "" }
            });
        },
        messageID
    );
};

// ───────────── 🩷 Step 2: Handle replies ─────────────
module.exports.handleReply = async ({ api, event, Users, handleReply }) => {
    const { threadID, messageID, senderID, body } = event;
    const userName = (await Users.getData(senderID)).name;
    const timeNow = moment.tz("Asia/Kolkata").format("hh:mm A, DD MMM YYYY");

    if (handleReply.content.id !== senderID) return;

    const sendC = (msg, step, content) =>
        api.sendMessage(msg, threadID, (err, info) => {
            global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
            api.unsendMessage(handleReply.messageID);
            global.client.handleReply.push({
                step: step,
                name: module.exports.config.name[0],
                messageID: info.messageID,
                content: content
            });
        }, messageID);

    const send = (msg) => api.sendMessage(msg, threadID, messageID);
    const content = handleReply.content;
    const input = body.trim();

    switch (handleReply.step) {
        case 1:
            content.ask = input;
            sendC("💖 Now reply with what Eshuu should answer to that question~", 2, content);
            break;

        case 2:
            content.ans = input;
            global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
            api.unsendMessage(handleReply.messageID);

            const res = await axios.get(
                encodeURI(`https://sim-a9ek.onrender.com/sim?type=teach&ask=${content.ask}&ans=${content.ans}&apikey=PriyanshVip`)
            );

            if (res.data.error)
                return send(`⚠️ Error: ${res.data.error}`);

            return send(
                `🌸 **Eshuu learned something new!** 💕\n\n` +
                `💭 **Question:** ${content.ask}\n💬 **Answer:** ${content.ans}\n\n` +
                `👩‍🏫 Thanks, ${userName}!\n🕰 ${timeNow}`
            );
    }
};
