const axios = require("axios");

const BASE_API = "https://eshu-api.onrender.com/eshuu"; // Your teach API
const GEMINI_API = "https://geminiw.onrender.com/chat"; // From silly bot

const chatHistories = {}; // per-user short memory

module.exports.config = {
  name: "eshuu",
  version: "8.0.0",
  hasPermission: 0,
  credits: "Priyansh & Nerob",
  description: "Eshuu 💞 — Hybrid teachable + Gemini AI chatbot",
  commandCategory: "ai",
  usePrefix: false,
  prefix: false,
  cooldowns: 0,
  usages: `
Eshuu will reply automatically when called.
Teach [message] - [reply1], [reply2]
remove [message]
edit [old] - [new]
list all
`,
};

// 🌸 Trigger Words (no prefix)
module.exports.handleEvent = async function ({ api, event }) {
  try {
    const input = event.body?.toLowerCase();
    if (!input) return;

    const triggerWords = [
      "bby", "baby", "bot", "eshubot", "eshu", "eshuu",
      "বেবি", "বট", "এইশু", "এইশু বট",
    ];

    if (triggerWords.some((w) => input.includes(w))) {
      const cuteReplies = [
        "🌸 Eshuu here, baby~ 💞",
        "🩷 Haan bolo jaanu~",
        "✨ Hmm? You called me, cutie?",
        "💬 Always here for you~",
        "😚 Bolona, Eshuu is listening~",
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

// 💬 Main Run
module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const input = args.join(" ").toLowerCase();
    const uid = event.senderID;
    const { threadID, messageID } = event;

    if (!input) {
      const ran = [
        "💬 Bolo na, Eshuu is here~",
        "🌸 Hmm tell me something...",
        "✨ Try typing: Teach hi - hello cutie~",
        "🩵 I’m listening, baby~",
      ];
      return api.sendMessage(
        ran[Math.floor(Math.random() * ran.length)],
        threadID,
        messageID
      );
    }

    // 🗑 Remove message
    if (args[0] === "remove") {
      const msg = input.replace("remove ", "");
      const res = await axios.get(`${BASE_API}?remove=${msg}`);
      return api.sendMessage(res.data.message, threadID, messageID);
    }

    // ✏️ Edit reply
    if (args[0] === "edit") {
      const [_, newMsg] = input.split(" - ");
      const oldMsg = args[1];
      const res = await axios.get(`${BASE_API}?edit=${oldMsg}&replace=${newMsg}`);
      return api.sendMessage(`✅ ${res.data.message}`, threadID, messageID);
    }

    // 📚 Teach new reply
    if (args[0].toLowerCase() === "teach" && args[1] !== "react") {
      const [cmd, replies] = input.split(" - ");
      const msg = cmd.replace("teach ", "");
      if (!replies)
        return api.sendMessage(
          "❌ Format: Teach [YourMessage] - [Reply1], [Reply2], ...",
          threadID,
          messageID
        );
      const res = await axios.get(`${BASE_API}?teach=${msg}&reply=${replies}&senderID=${uid}`);
      const userData = await Users.getData(uid);
      return api.sendMessage(
        `✅ ${res.data.message}\n👩‍🏫 Teacher: ${userData.name}\n🗨️ Replies: ${res.data.replies.join(", ")}`,
        threadID,
        messageID
      );
    }

    // 💬 Normal chat — first try Teach system
    const teachRes = await axios.get(`${BASE_API}?text=${encodeURIComponent(input)}`);
    const learnedReply = teachRes.data.reply;

    // If found in teach replies
    if (learnedReply && !learnedReply.includes("couldn’t find")) {
      return api.sendMessage(learnedReply, threadID, messageID);
    }

    // Otherwise fallback to Gemini AI 💫
    if (!chatHistories[uid]) chatHistories[uid] = [];
    chatHistories[uid].push(`User: ${input}`);
    if (chatHistories[uid].length > 5) chatHistories[uid].shift();

    const conversation = chatHistories[uid].join("\n");

    const prompt = `Tumhara naam Eshuu hai. Tum ek loving, cute aur flirty dost ho. Thoda tease karti ho, sweet tarike se baat karti ho. Har jawab 1 ya 2 line me do. Ab conversation continue karo:\n${conversation}`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    const aiRes = await axios.get(`${GEMINI_API}?message=${encodeURIComponent(prompt)}`);
    const aiReply = aiRes.data.reply || "💞 Hmm baby, mujhe samajh nahi aaya~";

    chatHistories[uid].push(`Eshuu: ${aiReply}`);
    api.sendMessage(aiReply, threadID, messageID);
    api.setMessageReaction("✅", messageID, () => {}, true);

  } catch (e) {
    console.error("Eshuu error:", e);
    api.sendMessage(`⚠️ Eshuu got a brain freeze: ${e.message}`, event.threadID, event.messageID);
    api.setMessageReaction("❌", event.messageID, () => {}, true);
  }
};
