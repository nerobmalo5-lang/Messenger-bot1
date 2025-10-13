const axios = require("axios");

const baseApiUrl = async () => {
  return "https://eshu-api.onrender.com";
};

module.exports.config = {
  name: "teach",
  version: "1.0.0",
  credits: "kurokami9",
  hasPermission: 0,
  description: "Teach Eshuu new replies 💞",
  commandCategory: "chat",
  usages:
    `Teach [YourMessage] - [Reply1], [Reply2], ...\n` +
    `Teach react [YourMessage] - [react1], [react2], ...\n` +
    `remove [YourMessage]`,
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/eshuu`;
    const input = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!args[0]) return api.sendMessage("❌ Use: Teach [Message] - [Replies]", event.threadID, event.messageID);

    // Remove message
    if (args[0] === "remove") {
      const msg = input.replace("remove ", "");
      const res = await axios.get(`${link}?remove=${encodeURIComponent(msg)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    // Teach replies
    if (args[0] === "teach" && args[1] !== "react") {
      const [cmd, replies] = input.split(" - ");
      const msg = cmd.replace("teach ", "");
      if (!replies) return api.sendMessage("❌ Format: Teach [Message] - [Reply1], [Reply2], ...", event.threadID, event.messageID);

      const res = await axios.get(`${link}?teach=${encodeURIComponent(msg)}&reply=${encodeURIComponent(replies)}&senderID=${uid}`);
      const userData = await Users.getData(uid);

      return api.sendMessage(
        `✅ ${res.data.message}\n👩‍🏫 Teacher: ${userData.name}\n🗨️ Replies: ${res.data.replies?.join(", ")}`,
        event.threadID,
        event.messageID
      );
    }

    // Teach reactions
    if (args[0] === "teach" && args[1] === "react") {
      const [cmd, reacts] = input.split(" - ");
      const msg = cmd.replace("teach react ", "");
      if (!reacts) return api.sendMessage("❌ Format: Teach react [Message] - [react1], [react2], ...", event.threadID, event.messageID);

      const res = await axios.get(`${link}?teach=${encodeURIComponent(msg)}&react=${encodeURIComponent(reacts)}`);
      return api.sendMessage(`✅ Reactions added ${res.data.message}`, event.threadID, event.messageID);
    }

  } catch (e) {
    console.error("Teach error:", e);
    return api.sendMessage(`⚠️ Error: ${e.message}`, event.threadID, event.messageID);
  }
};
