module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.1.0",
    credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
    description: "Aesthetic welcome messages for new members and bot auto-nickname",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

module.exports.run = async function ({ api, event }) {
    const { threadID, logMessageData } = event;
    const botID = api.getCurrentUserID();

    // If the bot itself is added
    if (logMessageData.addedParticipants.some(i => i.userFbId == botID)) {
        api.changeNickname(
            `[ ${global.config.PREFIX} ] • ${global.config.BOTNAME || "𝗠𝗬 𝗕𝗢𝗧"}`,
            threadID,
            botID
        );
        return api.sendMessage(
`🍒💙••• Ɓ❍ʈ Ƈøɳɳɛƈʈɛɗ 💞🌿

🕊️🌸 ʜᴇʟʟᴏ ɢᴜʏꜱ! ɪ'ᴍ ʏᴏᴜʀ ꜰʀɪᴇɴᴅʟʏ ʙᴏᴛ 〝${global.config.BOTNAME || "𝐌𝐓𝐗 𝐁𝐎𝐓"}〞
ʀᴇᴀᴅʏ ᴛᴏ ʙʀɪɴɢ ꜰᴜɴ ✦ ᴏʀᴅᴇʀ ✦ ᴠɪʙᴇꜱ 💫`,
            threadID
        );
    }

    // If a normal user joins
    const addedUsers = logMessageData.addedParticipants;
    for (const user of addedUsers) {
        const name = user.fullName || "New Member";
        const msg = 
`∘₊✧──────────────✧₊∘
🌸  ʜᴇʏ ${name}!  🌸
Welcome to our cozy corner ♡

꒰ 🍃 ꒱ 𝒪𝓌𝓃𝑒𝓇 𝒲𝒾𝓈𝒽𝑒𝓈 𝒴𝑜𝓊 𝒲𝒶𝓇𝓂 𝒱𝒾𝒷𝑒𝓈 🌈
╰┈➤ “Stay kind, stay classy, and have fun 💞”
∘₊✧──────────────✧₊∘`;

        await new Promise(res => setTimeout(res, 1000));
        api.sendMessage(msg, threadID);
    }
};
