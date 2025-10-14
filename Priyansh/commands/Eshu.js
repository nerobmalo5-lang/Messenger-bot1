const axios = require("axios");

// API URL for the external chat service
const BASE_API_URL = "https://eshu-api.onrender.com";

module.exports.config = {
  name: "eshuu", // Updated name
  version: "7.1.0",
  credits: "N-E-R-O-B", // Updated credits
  hasPermission: 0,
  description: "Always-on Chat AI — Eshuu 💞. Replies directly to trigger words.",
  commandCategory: "chat",
  usePrefix: false, // Ensures it listens to all messages
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const input = event.body;
    if (!input || event.senderID == api.getCurrentUserID()) return; // Ignore empty messages or messages from the bot itself

    const lowerInput = input.toLowerCase();

    // 1. Define and check trigger words (Eshuu, bot, baby)
    const triggerWords = [
      "bby", "baby", "bot", "eshubot", "eshu", "eshuu",
      "বেবি", "বট", "এইশু", "এইশু বট" // Including the Bengali phrases from the original
    ];

    if (triggerWords.some((w) => lowerInput.includes(w))) {
      const cuteReplies = [
        "🌸 Eshuu here, baby~ 💞",
        "🩷 Haan bolo jaanu~",
        "✨ hmm? you called me, cutie?",
        "💬 always here for you~",
        "😚 bolona, Eshuu is listening~",
      ];
      
      // Send a quick reply and RETURN to stop further processing (no API call needed)
      return api.sendMessage(
        cuteReplies[Math.floor(Math.random() * cuteReplies.length)],
        event.threadID,
        event.messageID
      );
    }

    // 2. Normal AI Chat (Always-on behavior)
    // Send the original message (input) for the best AI response quality
    const link = `${BASE_API_URL}/eshuu`;
    
    const res = await axios.get(`${link}?text=${encodeURIComponent(input)}`);
    
    // Check if the API returned a valid reply
    if (res.data && res.data.reply) {
        return api.sendMessage(res.data.reply, event.threadID, event.messageID);
    }

  } catch (e) {
    console.error("Eshuu handleEvent error:", e);
    // Optional: Send an error message to the user if the API fails
    // api.sendMessage("Oops! My external brain is taking a nap. Try again later.", event.threadID);
  }
};

