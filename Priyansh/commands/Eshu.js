const axios = require("axios");

const baseApiUrl = async () => {
  // ✅ Directly using your Render API
  return "https://eshu-api.onrender.com";
};

module.exports.config = {
  name: "eshuu",
  version: "7.1.0",
  credits: "kurokami9",
  cooldowns: 0,
  hasPermission: 0, // ✅ anyone can use
  description: "Teachable Chat AI — Eshuu 💞",
  commandCategory: "chat",
  usePrefix: false, // ✅ works without prefix
  prefix: false,
  usages:
    `[anyMessage]\n` +
    `Teach [YourMessage] - [Reply1], [Reply2], [Reply3]...\n` +
    `Teach react [YourMessage] - [react1], [react2], [react3]...\n` +
    `remove [YourMessage]\n` +
    `rm [YourMessage] - [indexNumber]\n` +
    `msg [YourMessage]\n` +
    `list OR list all\n` +
    `edit [YourMessage] - [NewMessage]`,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    const input = event.body?.toLowerCase();
    if (!input) return;

    // 🧠 Keywords that wake Eshuu
    const triggerWords = [
      "bby",
      "baby",
      "bot",
      "eshubot",
      "eshu",
      "eshuu",
      "বেবি",
      "বট",
      "এইশু",
      "এইশু বট",
    ];

    // 👀 If someone calls Eshuu by name or cute word
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
  } catch (e) {
    console.error("Eshuu handleEvent error:", e);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/eshuu`;
    const input = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!args[0]) {
      const ran = [
        "💬 Bolo na, Eshuu is here~",
        "🌸 hmm tell me something...",
        "✨ Try typing: Teach hi - hello cutie~",
        "🩵 I’m listening, baby~",
      ];
      return api.sendMessage(
        ran[Math.floor(Math.random() * ran.length)],
        event.threadID,
        event.messageID
      );
    }

    // 🗑 Remove message
    if (args[0] === "remove") {
      const msg = input.replace("remove ", "");
      const res = await axios.get(`${link}?remove=${encodeURIComponent(msg)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    // 🗑 Remove specific index
    if (args[0] === "rm" && input.includes("-")) {
      const [msg, index] = input.replace("rm ", "").split(" - ");
      const res = await axios.get(`${link}?remove=${encodeURIComponent(msg)}&index=${encodeURIComponent(index)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    // 📜 List all teachers
    if (args[0] === "list") {
      const res = await axios.get(`${link}?list=all`);
      const list = res.data.teacher?.teacherList || [];
      const teachers = await Promise.all(
        list.map(async (item) => {
          const id = Object.keys(item)[0];
          const value = item[id];
          const userData = await Users.getData(id);
          return { name: userData.name, value };
        })
      );
      teachers.sort((a, b) => b.value - a.value);
      const out = teachers.map((t, i) => `${i + 1}. ${t.name}: ${t.value}`).join("\n");
      return api.sendMessage(`👑 Eshuu’s Teachers:\n${out}`, event.threadID, event.messageID);
    }

    // 📩 Show message replies
    if (args[0] === "msg" || args[0] === "message") {
      const msg = input.replace(/^(msg|message) /, "");
      const res = await axios.get(`${link}?list=${encodeURIComponent(msg)}`);
      return api.sendMessage(
        `💬 Message: ${msg}\nReplies: ${res.data.data}`,
        event.threadID,
        event.messageID
      );
    }

    // ✏️ Edit a message
    if (args[0] === "edit") {
      const [_, newMsg] = input.split(" - ");
      const oldMsg = args[1];
      if (!newMsg) {
        return api.sendMessage("❌ | Use: edit [YourMessage] - [NewReply]", event.threadID, event.messageID);
      }
      const res = await axios.get(`${link}?edit=${encodeURIComponent(oldMsg)}&replace=${encodeURIComponent(newMsg)}`);
      return api.sendMessage(`✅ Changed successfully: ${res.data.message}`, event.threadID, event.messageID);
    }

    // 📚 Teach replies — everyone can teach now
    if (args[0] === "teach" && args[1] !== "react") {
      const [cmd, replies] = input.split(" - ");
      const msg = cmd.replace("teach ", "");
      if (!replies) {
        return api.sendMessage(
          "❌ | Format: Teach [YourMessage] - [Reply1], [Reply2], ...",
          event.threadID,
          event.messageID
        );
      }
      const res = await axios.get(
        `${link}?teach=${encodeURIComponent(msg)}&reply=${encodeURIComponent(replies)}&senderID=${uid}`
      );
      const userData = await Users.getData(uid);
      return api.sendMessage(
        `✅ ${res.data.message}\n👩‍🏫 Teacher: ${userData.name}\n🗨️ Replies: ${res.data.replies?.join(", ")}`,
        event.threadID,
        event.messageID
      );
    }

    // 💖 Teach reactions
    if (args[0] === "teach" && args[1] === "react") {
      const [cmd, reacts] = input.split(" - ");
      const msg = cmd.replace("teach react ", "");
      if (!reacts) {
        return api.sendMessage(
          "❌ | Format: Teach react [YourMessage] - [react1], [react2], ...",
          event.threadID,
          event.messageID
        );
      }
      const res = await axios.get(
        `${link}?teach=${encodeURIComponent(msg)}&react=${encodeURIComponent(reacts)}`
      );
      return api.sendMessage(`✅ Reactions added ${res.data.message}`, event.threadID, event.messageID);
    }

    // 💬 Normal chatting
    const res = await axios.get(`${link}?text=${encodeURIComponent(input)}`);
    const reply = res.data.reply;
    return api.sendMessage(reply, event.threadID, event.messageID);

  } catch (e) {
    console.error("Eshuu error:", e);
    return api.sendMessage(`⚠️ Error: ${e.message}`, event.threadID, event.messageID);
  }
};
