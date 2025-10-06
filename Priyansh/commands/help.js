module.exports.config = {
	name: "help",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Nerob",
	description: "Beginner's Guide to Bot Commands",
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
		"moduleInfo": "🌿 𝗠𝗼𝗱𝘂𝗹𝗲: 𝗦𝗮𝗻𝘀𝐁𝗼𝗹𝗱 『 %1 』\n🌸 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n\n❀ 𝗨𝘀𝗮𝗴𝗲: %3\n❀ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n❀ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻: %5 sec(s)\n❀ 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n\n» 🌱 Coded by %7 «",
		"helpList": "🌷 𝗧𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 %1 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗼𝗻 𝘁𝗵𝗶𝘀 𝗯𝗼𝘁.\nUse: \"%2help [Command Name]\" to see detailed usage 🌿",
		"user": "User",
        "adminGroup": "Group Admin",
        "adminBot": "Bot Admin"
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
	const prefix = threadSetting.PREFIX || global.config.PREFIX;

	return api.sendMessage(
		getText(
			"moduleInfo",
			command.config.name,
			command.config.description,
			`${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
			command.config.commandCategory,
			command.config.cooldowns,
			(command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot"),
			command.config.credits
		),
		threadID,
		messageID
	);
}

module.exports.run = async function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = threadSetting.PREFIX || global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
		const numberPerPage = 9999;
		let i = 0;
		let msg = "";

		for (let [name] of commands) arrayInfo.push(name);
		arrayInfo.sort();

		const startSlice = numberPerPage * page - numberPerPage;
		i = startSlice;
		const returnArray = arrayInfo.slice(startSlice, startSlice + numberPerPage);

		for (let item of returnArray) msg += `🌿 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗡𝗼. ${++i} ➜ 𝗦𝗮𝗻𝘀 ${item}\n`;

		const header = `🌸 Page ${page} of ${Math.ceil(arrayInfo.length/numberPerPage)} | 🌱 Made by Nerob 🌱`;

		return api.sendMessage(
			header + "\n\n" + msg,
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
			(command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot"),
			command.config.credits
		),
		threadID,
		messageID
	);
};
