module.exports.config = {
    name: "teach",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "N-E-R-O-B",
    description: "Teach Eshuu how to reply using Sim system 💋",
    commandCategory: "Eshuu AI",
    usages: "[ask → ans]",
    cooldowns: 2,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = ({ api, event }) => {
    const { threadID, messageID, senderID } = event;
    return api.sendMessage("[ 💬 Eshuu ] — Reply to this message with a question you want to teach me 💋", threadID, (err, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            step: 1,
            content: {
                id: senderID,
                ask: "",
                ans: ""
            }
        });
    }, messageID);
};

module.exports.handleReply = async ({ api, event, Users, handleReply }) => {
    const axios = require("axios");
    const moment = require("moment-timezone");
    const timeZ = moment.tz("Asia/Kolkata").format("HH:mm:ss | DD/MM/YYYY");

    const { threadID, messageID, senderID, body } = event;
    if (handleReply.content.id !== senderID) return;

    const input = body.trim();
    const send = (msg) => api.sendMessage(msg, threadID, messageID);
    const sendNext = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
        global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
        api.unsendMessage(handleReply.messageID);
        global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            step: step,
            content: content
        });
    }, messageID);

    let content = handleReply.content;
    switch (handleReply.step) {
        case 1:
            content.ask = input;
            sendNext("[ 💬 Eshuu ] — Now reply with the answer I should learn for this 💋", 2, content);
            break;

        case 2:
            content.ans = input;
            global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
            api.unsendMessage(handleReply.messageID);

            try {
                const res = await axios.get(encodeURI(`https://sim-a9ek.onrender.com/sim?type=teach&ask=${content.ask}&ans=${content.ans}&apikey=PriyanshVip`));
                if (res.data.error) return send(`[ ⚠️ Eshuu ] — ${res.data.error}`);
                send(`[ 💞 Eshuu Learned Successfully! ]\n\n💭 ${content.ask}\n💋 ${content.ans}\n\n⏱ ${timeZ}`);
            } catch (err) {
                send("⚠️ Oops baby... Eshuu couldn't save it right now.");
            }
            break;
    }
};
