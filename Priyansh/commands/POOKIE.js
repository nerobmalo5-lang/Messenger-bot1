const axios = require("axios");
const moment = require("moment-timezone");

const BASE_API = "https://35c63274-98fb-4ff9-ac69-30075de6e659-00-1j7el920g36b.sisko.replit.dev";

const baseApiUrl = async () => {
  try {
    const res = await axios.get(`${BASE_API}/sim?text=hello&lang=en`);
    return res.data.api || BASE_API;
  } catch (err) {
    console.error("Failed to fetch base API:", err);
    return BASE_API;
  }
};

module.exports.config = {
  name: "eshuu",
  version: "7.1.1",
  credits: "💞 N-E-R-O-B",
  cooldowns: 0,
  hasPermssion: 0,
  description: "Smart, flirty, always-on AI bot 🌸",
  commandCategory: "chat",
  usePrefix: true,
  prefix: true,
  usages: `[anyMessage] OR
teach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR
teach [react] [YourMessage] - [react1], [react2], [react3]... OR
remove [YourMessage] OR
rm [YourMessage] - [indexNumber] OR
msg [YourMessage] OR
list OR
edit [YourMessage] - [NewMessage]`,
};

// 💬 always-on chat + teach logic
module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    const { body, threadID, messageID, senderID } = event;
    if (!body) return;

    const text = body.toLowerCase();
    const callWords = ["eshuu", "bot", "baby", "বট"];

    // trigger only when Eshuu is mentioned
    if (!callWords.some((w) => text.includes(w))) return;

    const link = `${await baseApiUrl()}/eshuu`;

    try {
      // Query new API
      const res = await axios.get(`${link}?text=${encodeURIComponent(text)}`);
      return api.sendMessage(res.data.reply || "💞 Eshuu confused rn~", threadID, messageID);
    } catch (err) {
      console.error("Error fetching from new API:", err);
      return api.sendMessage("💞 Eshuu confused rn~", threadID, messageID);
    }
  } catch (err) {
    console.error(err);
  }
};

// 🧠 teach + manage commands
module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/eshuu`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!args[0])
      return api.sendMessage("🌸 Bolo baby, ki chai bolo 💞", event.threadID, event.messageID);

    // remove
    if (args[0] === "remove") {
      const fina = dipto.replace("remove ", "");
      const res = await axios.get(`${link}?remove=${fina}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    // rm [text] - [index]
    if (args[0] === "rm" && dipto.includes("-")) {
      const [fi, f] = dipto.replace("rm ", "").split(" - ");
      const res = await axios.get(`${link}?remove=${fi}&index=${f}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    // list
    if (args[0] === "list") {
      const res = await axios.get(`${link}?list=all`);
      const data = res.data.teacher.teacherList;
      const teachers = await Promise.all(
        data.map(async (item) => {
          const number = Object.keys(item)[0];
          const value = item[number];
          const userData = await Users.getData(number);
          return { name: userData.name, value };
        })
      );
      teachers.sort((a, b) => b.value - a.value);
      const output = teachers.map((t, i) => `${i + 1}/ ${t.name}: ${t.value}`).join("\n");
      return api.sendMessage(`👑 | List of Teachers of Eshuu\n\n${output}`, event.threadID, event.messageID);
    }

    // msg
    if (args[0] === "msg") {
      const msg = dipto.replace("msg ", "");
      const res = await axios.get(`${link}?list=${msg}`);
      return api.sendMessage(`Message ${msg} = ${res.data.data}`, event.threadID, event.messageID);
    }

    // edit
    if (args[0] === "edit") {
      const [cmd, newMsg] = dipto.split(" - ");
      const key = cmd.replace("edit ", "");
      const res = await axios.get(`${link}?edit=${key}&replace=${newMsg}`);
      return api.sendMessage(`✅ Changed ${res.data.message}`, event.threadID, event.messageID);
    }

    // teach normal
    if (args[0] === "teach" && args[1] !== "react") {
      const [comd, command] = dipto.split(" - ");
      const final = comd.replace("teach ", "");
      const res = await axios.get(`${link}?teach=${final}&reply=${command}&senderID=${uid}`);
      const userData = await Users.getData(res.data.teacher);
      return api.sendMessage(
        `✅ Replies added ${res.data.message}\nTeacher: ${userData.name}\nTeachs: ${res.data.teachs}`,
        event.threadID,
        event.messageID
      );
    }

    // teach react
    if (args[0] === "teach" && args[1] === "react") {
      const [comd, command] = dipto.split(" - ");
      const final = comd.replace("teach react ", "");
      const res = await axios.get(`${link}?teach=${final}&react=${command}`);
      return api.sendMessage(`✅ Reacts added ${res.data.message}`, event.threadID, event.messageID);
    }
  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};
