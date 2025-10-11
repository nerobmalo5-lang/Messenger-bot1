module.exports.config = {
	name: "help",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "Nerob 🌸",
	description: "Cute & Aesthetic Command Guide (Categorized)",
	commandCategory: "System",
	usages: "[Command Name]",
	cooldowns: 1,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 300
	}
};

module.exports.languages = {
	"en": {
		"moduleInfo": "💫 𝗖𝗼𝗺𝗺𝗮𝗻𝗱: 『 %1 』\n📖 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n\n🧭 𝗨𝘀𝗮𝗴𝗲: %3\n💎 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n⏳ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: %5 𝘀\n🔐 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n♡ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿: %7 ♡",
		"helpList": "🌷 There are %1 total commands available!\nUse: \"%2help [command name]\" for details 🌸",
		"user": "👤 User",
		"adminGroup": "🛠️ Group Admin",
		"adminBot": "👑 Bot Admin"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	return api.sendMessage(
		getText(
			"moduleInfo",
			command.config.name,
			command.config.description,
			`${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
			command.config.commandCategory,
			command.config.cooldowns,
			((command.config.hasPermssion == 0)
				? getText("user")
				: (command.config.hasPermssion == 1)
				? getText("adminGroup")
				: getText("adminBot")),
			command.config.credits
		),
		threadID,
		messageID
	);
};

module.exports.run = function ({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		// Categorize commands
		const categories = {};

		for (const [name, cmd] of commands) {
			const category = cmd.config.commandCategory || "🌈 Misc";
			if (!categories[category]) categories[category] = [];
			categories[category].push(name);
		}

		let msg = `🌸 𝗖𝘂𝘁𝗲 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 🌸\n╭───────────────╮\n✨ Prefix: ${prefix}\n💫 Total: ${commands.size} Commands\n╰───────────────╯\n\n`;

		// Emojis per category
		const emojiCategory = {
			"System": "⚙️",
			"Fun": "🎀",
			"Utility": "🧰",
			"Info": "📚",
			"Games": "🎮",
			"Economy": "💰",
			"Music": "🎵",
			"Admin": "🛡️",
			"Anime": "🌸",
			"Love": "💞",
			"Misc": "🌈"
		};

		for (const [category, cmds] of Object.entries(categories)) {
			const emoji = emojiCategory[category] || "🌷";
			msg += `${emoji} 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${category}\n`;
			msg += `╰─› ${cmds.map(c => `${prefix}${c}`).join(", ")}\n\n`;
		}

		msg += `💌 Type: ${prefix}help [command name] for more info!\n☁️ Made with love by Nerob 🌷`;

		return api.sendMessage(
			msg,
			threadID,
			async (error, info) => {
				if (autoUnsend) {
					await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
					return api.unsendMessage(info.messageID);
				}
			},
			messageID
		);
	}

	// Command info output
	return api.sendMessage(
		getText(
			"moduleInfo",
			command.config.name,
			command.config.description,
			`${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
			command.config.commandCategory,
			command.config.cooldowns,
			((command.config.hasPermssion == 0)
				? getText("user")
				: (command.config.hasPermssion == 1)
				? getText("adminGroup")
				: getText("adminBot")),
			command.config.credits
		),
		threadID,
		messageID
	);
};
