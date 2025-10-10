module.exports.config = {
	name: "help2",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Nerob 🌸",
	description: "Cute & Aesthetic Command Guide 🌷",
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
		"moduleInfo": "🌷 𝗖𝗼𝗺𝗺𝗮𝗻𝗱: 『 %1 』\n💫 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n\n🌼 𝗨𝘀𝗮𝗴𝗲: %3\n🍃 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n🕰️ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: %5 𝘀𝗲𝗰(s)\n🔑 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n♡ Made with ☁️ by %7 ♡",
		"helpList": "🌸 There are %1 lovely commands on this bot!\nUse: \"%2help2 [Command Name]\" to see details 🌿",
		"user": "User 🌼",
		"adminGroup": "Group Admin 🌻",
		"adminBot": "Bot Admin 🌷"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help2") != 0) return;
	const splitBody = body.slice(body.indexOf("help2")).trim().split(/\s+/);
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
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
		const numberOfOnePage = 9999;
		let i = 0;
		let msg = "";

		for (var [name] of commands) arrayInfo.push(name);
		arrayInfo.sort((a, b) => a.data - b.data);

		const startSlice = numberOfOnePage * page - numberOfOnePage;
		i = startSlice;
		const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

		for (let item of returnArray) msg += `🍀 ${++i}. ${prefix}${item}\n`;

		const totalPages = Math.ceil(arrayInfo.length / numberOfOnePage);
		const header = `🌷 𝗕𝗼𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 🌷\n╭───────────────╮\n✨ Total: ${arrayInfo.length} Commands\n📜 Page (${page}/${totalPages})\n╰───────────────╯`;
		const footer = `\n💌 Type: ${prefix}help2 [command name] for details!\n🩵 Made with love by Nerob ☁️`;

		return api.sendMessage(
			`${header}\n\n${msg}${footer}`,
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
