const axios = require("axios");
const moment = require("moment-timezone");

let active = true; // Always ON
let triggers = ["baby", "pookie", "bot", "jan", "বেবি", "বট"]; // triggers in Banglish + Bangla

// Teach storage (replace with API later for persistence)
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

// Handle all messages in threads
module.exports.handleEvent = async function({ api, event, Users }) {
  if (!active) return;

  const { threadID, senderID, body, messageID } = event;
  if (!body) return;

  // Check if message contains trigger word
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
  const { threadID, senderID, messageID } = event;
  if (!args[0] || args[0].toLowerCase() !== "teach") {
    return api.sendMessage("Use: teach [msg] - [reply]", threadID, messageID);
  }

  return api.sendMessage("[ Pookie ] - Reply to this message with the question you want to teach me!", threadID, (err, info) => {
    global.client.handleReply.push({
      step: 1,
      name: "pookie",
      messageID: info.messageID,
      content: { id: senderID, ask: "", ans: "" }
    });
  }, messageID);
};

// Handle teach replies step-by-step
module.exports.handleReply = async function({ api, event, handleReply, Users }) {
  const { threadID, messageID, senderID, body } = event;
  let content = handleReply.content;
  if (content.id !== senderID) return;

  const input = body.trim();
  const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
    global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
    api.unsendMessage(handleReply.messageID);
    global.client.handleReply.push({
      step: step,
      name: "pookie",
      messageID: info.messageID,
      content: content
    });
  }, messageID);

  const send = (msg) => api.sendMessage(msg, threadID, messageID);
  const timeZ = moment.tz("Asia/Kolkata").format("HH:mm:ss | DD/MM/YYYY");

  switch (handleReply.step) {
    case 1:
      content.ask = input;
      sendC("[ Pookie ] - Reply to this message with the answer I should give.", 2, content);
      break;

    case 2:
      content.ans = input;
      globalMemory[content.ask.toLowerCase()] = content.ans; // Save in globalMemory
      global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
      api.unsendMessage(handleReply.messageID);
      send(`[ Pookie ] - 🌸 Learned successfully!\n🤤 Data:\n"${content.ask}" -> "${content.ans}"\n⏱ Time: ${timeZ}`);
      break;

    default:
      break;
  }
};
