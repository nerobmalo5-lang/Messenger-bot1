const axios = require("axios");

let active = true; // Always ON
let triggers = ["baby", "pookie", "bot", "জান", "বেবি", "বট"]; // Add more Bangla if needed

// Teach storage (in-memory for now; you can replace with API)
let globalMemory = {}; 

module.exports.config = {
  name: "pookie",
  version: "1.0.0",
  credits: "💞 N-E-R-O-B",
  hasPermssion: 0,
  description: "Always-on Pookie bot 🌸 Cute GF style chat, teachable by everyone",
  commandCategory: "Chat 💬",
  usages: "[text] OR teach [msg] - [reply]",
  cooldowns: 1
};

// Handle messages
module.exports.handleEvent = async function({ api, event, Users }) {
  if (!active) return;

  const { threadID, senderID, body } = event;
  if (!body) return;

  // Check if the message contains any trigger word
  const messageLower = body.toLowerCase();
  const isTriggered = triggers.some(word => messageLower.includes(word));
  if (!isTriggered) return;

  // Check if it has a learned reply
  if (globalMemory[messageLower]) {
    return api.sendMessage(globalMemory[messageLower], threadID);
  }

  // Default cute reply
  const defaultReplies = [
    "Awww 😍 tumi amake call koro!",
    "Heyy cutie 💖 kemon aso?",
    "💞 Pookie is always here for you!"
  ];
  const reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  api.sendMessage(reply, threadID);
};

// Command to teach Pookie
module.exports.run = async function({ api, event, args, Users }) {
  const { threadID, senderID } = event;
  if (args[0] !== "teach") return api.sendMessage("Use: teach [msg] - [reply]", threadID);

  const teachText = args.join(" ").split(" - ");
  if (teachText.length < 2) return api.sendMessage("Format: teach [msg] - [reply]", threadID);

  const key = teachText[0].toLowerCase();
  const value = teachText[1];

  globalMemory[key] = value; // Save globally
  api.sendMessage(`🌸 Pookie learned a new reply!\n"${key}" -> "${value}"`, threadID);
};
