Module.exports.config = {
    name: "teach",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "N-E-R-O-B",
    description: "Eshuke notun kotha shikhao! Usage: teach [jiggesh_kora_kotha] | [uttor] (Teach Eshu new things! Usage: teach [question] | [answer])",
    commandCategory: "Chat with Eshu",
    usages: "[user_question] | [eshu_answer]",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async ({ api, event, args }) => {
    const axios = global.nodemodule.axios;
    const { threadID, messageID } = event;

    // --- 1. Check for valid format and arguments ---
    if (args.length === 0) {
        return api.sendMessage(
            "Oi shona, amake ki shikhaba? Ei rokom kore bolo: teach ki koro | tomar shathe chat kori",
            threadID,
            messageID
        );
    }

    // Join arguments and split by the separator '|'
    const input = args.join(" ");
    const parts = input.split("|").map(part => part.trim());

    // Check for correct format (must have 'ask' and 'ans' parts)
    if (parts.length < 2 || parts[0].length === 0 || parts[1].length === 0) {
        return api.sendMessage(
            "Format bhul hoyeche, jaan! Thik kore likho: teach [jiggesh_kora_kotha] | [uttor]",
            threadID,
            messageID
        );
    }

    const ask = parts[0];
    const ans = parts[1];

    try {
        // --- 2. Call the Simsimi Teach API ---
        const encodedAsk = encodeURIComponent(ask);
        const encodedAns = encodeURIComponent(ans);

        // NOTE: Keeping the hardcoded API key and endpoint from the original module
        const apiUrl = `https://sim-a9ek.onrender.com/sim?type=teach&ask=${encodedAsk}&ans=${encodedAns}&apikey=PriyanshVip`;

        const res = await axios.get(apiUrl);
        const data = res.data;

        // --- 3. Send Eshu's Banglish Feedback ---
        if (data.error) {
            return api.sendMessage(`Opps! Shikhate parlam na! 😩 Server e ki jani ekta problem hochche: ${data.error}`, threadID, messageID);
        }

        api.sendMessage(
            `Yay! Amake shikhano hoyeche! 🎉 Ekhon theke ami jani:\n\nJodi keu jiggesh kore: "${ask}"\nAmi uttor debo: "${ans}"\n\nTumi khub shundor kore shikhale, dhonnobad! ❤️`, 
            threadID, 
            messageID
        );

    } catch (error) {
        console.error("Teach API Error:", error.message);
        api.sendMessage("Uff! Shikhate giye kothay jeno hariye gelam! 😭 Ami khub dukkhito, abar try koro.", threadID, messageID);
    }
};

// Removed module.exports.handleReply as it is no longer necessary for the simplified one-step process.
