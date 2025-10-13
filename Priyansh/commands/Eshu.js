const axios = require("axios");

const baseApiUrl = async () => {
  return "https://eshu-api.onrender.com";
};

module.exports.config = {
  name: "eshuu",
  version: "7.1.0",
  credits: "kurokami9",
  hasPermission: 0,
  description: "Always-on Chat AI — Eshuu 💞",
  commandCategory: "chat",
  usePrefix: false,
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const input = event.body?.toLowerCase();
    if (!input) return;

    const triggerWords = [
      "bby", "baby", "bot", "eshubot", "eshu", "eshuu",
      "বেবি", "বট", "এইশু", "এইশু বট"
    ];

    if (triggerWords.some((w) => input.includes(w))) {
      const cuteReplies = [
        "🌸 Eshuu here, baby~ 💞",
        "🩷 Haan bolo jaanu~",
        "✨ hmm? you called me, cutie?",
        "💬 always here for you~",
        "😚 bolona, Eshuu is listening~",
      ];
      return api.sendMessage(
        cuteReplies[Math.floor(Math.random() * cuteReplies.length)],
        event.threadID,
        event.messageID
      );
    }

    // Normal chat
    const link = `${await baseApiUrl()}/eshuu`;
    const res = await axios.get(`${link}?text=${encodeURIComponent(input)}`);
    return api.sendMessage(res.data.reply, event.threadID, event.messageID);

  } catch (e) {
    console.error("Eshuu handleEvent error:", e);
  }
};
