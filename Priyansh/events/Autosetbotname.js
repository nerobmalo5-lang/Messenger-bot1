const fs = require("fs");
const path = require("path");

module.exports.config = {
	name: "autosetbotname",
	eventType: ["log:subscribe"],
	version: "1.0.0",
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
	description: "Automatically set bot's own name when added to a group",
	dependencies: {}
};

module.exports.run = async function ({ api, event }) {
	const { threadID, logMessageData } = event;
	const botID = api.getCurrentUserID();

	// Check if bot itself was added
	if (!logMessageData || !logMessageData.addedParticipants) return;
	const addedIDs = logMessageData.addedParticipants.map(i => i.userFbId);
	if (!addedIDs.includes(botID)) return;

	try {
		// Read bot name from config.json
		const configPath = path.join(__dirname, "..", "..", "config.json");
		const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
		const botName = config.botName || "My Bot";

		// Wait 2 seconds before changing nickname (to ensure group joins are stable)
		await new Promise(resolve => setTimeout(resolve, 2000));

		// Set nickname
		await api.changeNickname(botName, threadID, botID);

		return api.sendMessage(
			`✅ Bot name has been automatically set to: ${botName}`,
			threadID
		);
	} catch (err) {
		console.error(err);
		return api.sendMessage("❌ Failed to set bot name automatically.", threadID);
	}
};
