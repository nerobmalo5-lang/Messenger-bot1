const axios = require("axios");

// ✅ Fetch Base API URL from your JSON
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`
  );
  return base.data.api;
};

module.exports.config = {
  name: "baby",
  version: "7.0.0",
  credits: "💞 Nerob & Dipto",
  hasPermssion: 0,
  cooldowns: 0,
  usePrefix: true,
  prefix: true,
  description: "A smart, aesthetic, and self-learning AI chat bot 🌸",
  commandCategory: "Chat 💬",
  usages: `[text] OR
teach [msg] - [reply1], [reply2]...
teach react [msg] - [emoji1], [emoji2]...
remove [msg]
rm [msg] - [index]
msg [msg]
list all
edit [msg] - [newReply]`,
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;

    // 🩷 If no argument
    if (!args[0]) {
      const ran = [
        "🌸 Bolo baby...",
        "💬 Type ‘baby help’ to see my commands!",
        "☁️ Try ‘baby hi’ or teach me something new!",
        "🦋 Hey cutie, talk to me 🩷"
      ];
      return api.sendMessage(ran[Math.floor(Math.random() * ran.length)], event.threadID, event.messageID);
    }

    // 💀 Remove message
    if (args[0] === "remove") {
      const fina = dipto.replace("remove ", "");
      const res = await axios.get(`${link}?remove=${fina}`);
      return api.sendMessage(`🧹 ${res.data.message}`, event.threadID, event.messageID);
    }

    // 🔢 Remove specific reply
    if (args[0] === "rm" && dipto.includes("-")) {
      const [msg, index] = dipto.replace("rm ", "").split(" - ");
      const res = await axios.get(`${link}?remove=${msg}&index=${index}`);
      return api.sendMessage(`🗑️ ${res.data.message}`, event.threadID, event.messageID);
    }

    // 📜 List all teachers
    if (args[0] === "list") {
      if (args[1] === "all") {
        const res = await axios.get(`${link}?list=all`);
        const data = res.data.teacher.teacherList;
        const teachers = await Promise.all(
          data.map(async (item) => {
            const id = Object.keys(item)[0];
            const count = item[id];
            const user = await Users.getData(id);
            return { name: user.name, value: count };
          })
        );
        teachers.sort((a, b) => b.value - a.value);
        const output = teachers.map((t, i) => `${i + 1}. 💫 ${t.name} — ${t.value}`).join("\n");
        return api.sendMessage(
          `👑 Baby’s Top Teachers 👑\n━━━━━━━━━━━━━━━\n${output}\n━━━━━━━━━━━━━━━\n🌷 Total ${teachers.length} lovely teachers 💕`,
          event.threadID,
          event.messageID
        );
      } else {
        const res = await axios.get(`${link}?list=all`);
        return api.sendMessage(`📚 Total learned messages: ${res.data.length}`, event.threadID, event.messageID);
      }
    }

    // 📩 Show replies for message
    if (args[0] === "msg" || args[0] === "message") {
      const key = dipto.replace("msg ", "");
      const res = await axios.get(`${link}?list=${key}`);
      return api.sendMessage(`💌 Message: “${key}”\nReplies: ${res.data.data}`, event.threadID, event.messageID);
    }

    // ✏️ Edit reply
    if (args[0] === "edit") {
      const [_, newReply] = dipto.split(" - ");
      if (!newReply) return api.sendMessage("❌ Use format: baby edit [msg] - [new reply]", event.threadID, event.messageID);
      const res = await axios.get(`${link}?edit=${args[1]}&replace=${newReply}`);
      return api.sendMessage(`✨ Updated reply: ${res.data.message}`, event.threadID, event.messageID);
    }

    // 🧠 Teach message replies
    if (args[0] === "teach" && args[1] !== "react") {
      const [msg, reply] = dipto.split(" - ");
      const finalMsg = msg.replace("teach ", "");
      if (!reply) return api.sendMessage("❌ Use format: baby teach [msg] - [reply1], [reply2]...", event.threadID, event.messageID);
      const res = await axios.get(`${link}?teach=${finalMsg}&reply=${reply}&senderID=${uid}`);
      const userData = await Users.getData(res.data.teacher);
      return api.sendMessage(`🌸 Learned successfully!\n💬 ${res.data.message}\n👩‍🏫 Teacher: ${userData.name}\n🪷 Total teaches: ${res.data.teachs}`, event.threadID, event.messageID);
    }

    // 💖 Teach reaction replies
    if (args[0] === "teach" && args[1] === "react") {
      const [msg, reaction] = dipto.split(" - ");
      const finalMsg = msg.replace("teach react ", "");
      if (!reaction) return api.sendMessage("❌ Use format: baby teach react [msg] - [emoji1], [emoji2]...", event.threadID, event.messageID);
      const res = await axios.get(`${link}?teach=${finalMsg}&react=${reaction}`);
      return api.sendMessage(`💞 Reaction learned!\n${res.data.message}`, event.threadID, event.messageID);
    }

    // 🤖 Smart Reply
    const res = await axios.get(`${link}?text=${encodeURIComponent(dipto)}`);
    const replyText = res.data.reply;
    return api.sendMessage(replyText, event.threadID, (err, info) => {
      if (err) return;
      global.client.handleReply.push({
        name: this.config.name,
        type: "reply",
        messageID: info.messageID,
        author: event.senderID,
        apiUrl: link
      });
    }, event.messageID);

  } catch (e) {
    console.error("❌ Error in baby command:", e);
    return api.sendMessage(`⚠️ Error: ${e.message}`, event.threadID, event.messageID);
  }
};

// 💫 Handle Continued Replies
module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    if (event.type === "message_reply") {
      const reply = event.body.toLowerCase();
      if (!isNaN(reply)) return;
      const link = `${await baseApiUrl()}/baby`;
      const res = await axios.get(`${link}?text=${encodeURIComponent(reply)}`);
      return api.sendMessage(res.data.reply, event.threadID, (err, info) => {
        if (err) return;
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID,
          apiUrl: link
        });
      }, event.messageID);
    }
  } catch (err) {
    console.error("Error in baby handleReply:", err);
    return api.sendMessage(`⚠️ ${err.message}`, event.threadID, event.messageID);
  }
};
