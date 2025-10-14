const axios = require("axios");

// ✅ Direct API URL: No need for an async function here.
const BASE_API_URL = "https://eshu-api.onrender.com/eshuu";

module.exports.config = {
    name: "eshuu",
    version: "8.0.0", // Updated version number
    credits: "Priyansh & Nerob (Improved by AI)",
    cooldowns: 0,
    hasPermission: 0,
    description: "Teachable Chat AI — Eshuu 💞",
    commandCategory: "chat",
    usePrefix: false,
    prefix: false,
    usages: ` [anyMessage]
 Teach [YourMessage] - [Reply1], [Reply2], [Reply3]...
 Teach react [YourMessage] - [react1], [react2], [react3]...
 remove [YourMessage]
 list all
 edit [YourMessage] - [NewReply]
 `,
};

// --- Helper Function for API Communication ---
async function callEshuuApi(event, endpoint) {
    try {
        const res = await axios.get(`${BASE_API_URL}${endpoint}`);
        return res.data;
    } catch (e) {
        console.error("Eshuu API Call Error:", e);
        return { 
            message: "⚠️ Sorry, I could not connect to the Eshuu API right now. Please try again later.",
            error: true
        };
    }
}

// 🌸 Triggered when user just says “Eshuu”, “baby”, “bot”, etc.
module.exports.handleEvent = async function ({ api, event }) {
    try {
        const input = event.body?.toLowerCase();
        if (!input) return;

        const triggerWords = [
            "bby", "baby", "bot", "eshubot", "eshu", "eshuu", "বেবি", "বট", "এইশু", "এইশু বট"
        ];

        if (triggerWords.some((w) => input === w || input.includes(` ${w} `) || input.startsWith(`${w} `) || input.endsWith(` ${w}`))) {
            const cuteReplies = [
                "🌸 Eshuu here, baby~ 💞", "🩷 Haan bolo jaanu~", "✨ Hmm? you called me, cutie?", 
                "💬 Always here for you~", "😚 Bolona, Eshuu is listening~"
            ];
            return api.sendMessage(
                cuteReplies[Math.floor(Math.random() * cuteReplies.length)],
                event.threadID,
                event.messageID
            );
        }
    } catch (e) {
        console.error("Eshuu handleEvent error:", e);
    }
};

// 💬 Main run logic for commands and general chat
module.exports.run = async function ({ api, event, args, Users }) {
    const uid = event.senderID;
    const fullInput = args.join(" ");
    const command = args[0]?.toLowerCase();

    if (!command) {
        const ran = [
            "💬 Bolo na, Eshuu is here~", "🌸 Hmm tell me something...", "✨ Try typing: Teach hi - hello cutie~", 
            "🩵 I’m listening, baby~",
        ];
        return api.sendMessage(
            ran[Math.floor(Math.random() * ran.length)],
            event.threadID,
            event.messageID
        );
    }

    let endpoint = '';
    let responseText = '';

    // --- Command Handling ---

    // 🗑 Remove message
    if (command === "remove") {
        const msg = fullInput.slice(command.length).trim();
        if (!msg) return api.sendMessage("❌ Format: remove [YourMessage]", event.threadID, event.messageID);
        endpoint = `?remove=${encodeURIComponent(msg)}`;
    } 
    
    // 📜 List all
    else if (command === "list" && args[1]?.toLowerCase() === "all") {
        endpoint = `?list=all`;
    } 
    
    // ✏️ Edit
    else if (command === "edit") {
        const splitIndex = fullInput.indexOf(" - ");
        if (splitIndex === -1) {
            return api.sendMessage("❌ Format: edit [YourMessage] - [NewReply]", event.threadID, event.messageID);
        }
        
        const oldMsg = fullInput.substring(command.length + 1, splitIndex).trim();
        const newReply = fullInput.substring(splitIndex + 3).trim(); // +3 to skip ' - '
        
        if (!oldMsg || !newReply) {
             return api.sendMessage("❌ Format: edit [YourMessage] - [NewReply]", event.threadID, event.messageID);
        }

        endpoint = `?edit=${encodeURIComponent(oldMsg)}&replace=${encodeURIComponent(newReply)}`;
    } 
    
    // 📚 Teach replies (anyone can teach)
    else if (command === "teach" && args[1]?.toLowerCase() !== "react") {
        const splitIndex = fullInput.indexOf(" - ");
        if (splitIndex === -1) {
            return api.sendMessage("❌ Format: Teach [YourMessage] - [Reply1], [Reply2], ...", event.threadID, event.messageID);
        }
        
        const msg = fullInput.substring(command.length + 1, splitIndex).trim();
        const replies = fullInput.substring(splitIndex + 3).trim(); // +3 to skip ' - '
        
        if (!msg || !replies) {
            return api.sendMessage("❌ Format: Teach [YourMessage] - [Reply1], [Reply2], ...", event.threadID, event.messageID);
        }
        
        endpoint = `?teach=${encodeURIComponent(msg)}&reply=${encodeURIComponent(replies)}&senderID=${uid}`;
    }
    
    // ⚛️ Teach react
    else if (command === "teach" && args[1]?.toLowerCase() === "react") {
        const reactCmd = args.slice(2).join(" ");
        const splitIndex = reactCmd.indexOf(" - ");
        if (splitIndex === -1) {
            return api.sendMessage("❌ Format: Teach react [YourMessage] - [react1], [react2], ...", event.threadID, event.messageID);
        }

        const msg = reactCmd.substring(0, splitIndex).trim();
        const reacts = reactCmd.substring(splitIndex + 3).trim();

        if (!msg || !reacts) {
            return api.sendMessage("❌ Format: Teach react [YourMessage] - [react1], [react2], ...", event.threadID, event.messageID);
        }

        endpoint = `?teach_react=${encodeURIComponent(msg)}&react=${encodeURIComponent(reacts)}&senderID=${uid}`;
    }
    
    // --- General Chat (If no command matches) ---
    else {
        // Assume it's a general message for the AI
        endpoint = `?ask=${encodeURIComponent(fullInput)}&senderID=${uid}`;
    }
    
    // --- Execute API Call ---
    
    if (endpoint) {
        const res = await callEshuuApi(event, endpoint);
        
        if (res.error) {
            return api.sendMessage(res.message, event.threadID, event.messageID);
        }
        
        // Handle a successful response
        if (command && ["teach", "edit", "remove"].includes(command)) {
            // Commands that return structured data
            const userData = await Users.getData(uid);
            responseText = `✅ ${res.message}\n👩‍🏫 Teacher: ${userData.name || 'Unknown'}`;
            if (res.replies) {
                 responseText += `\n🗨️ Replies: ${res.replies.join(", ")}`;
            }
            if (res.reacts) {
                 responseText += `\n⚛️ Reacts: ${res.reacts.join(", ")}`;
            }
        } else if (command === "list") {
             responseText = `📚 ${res.message || "No messages taught yet!"}`;
        } else {
            // General "ask" or fallback response
            responseText = res.message || "Hmm, I don't have a response for that. Care to teach me?";
        }

        // Final message send
        if (res.react_reply) {
            // This assumes the API can return a reaction
            return api.setMessageReaction(res.react_reply, event.messageID, (err) => {
                if (err) console.error("Reaction failed:", err);
            }, true);
        }
        
        return api.sendMessage(responseText, event.threadID, event.messageID);
    }
    
    // Fallback if logic is somehow missed
    return api.sendMessage("I'm confused. Please check the command usage.", event.threadID, event.messageID);
};
