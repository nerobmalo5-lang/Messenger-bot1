module.exports.config = {
    name: "imposter",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Nerob",
    description: "Guess the imposter among Naruto characters - 3 chances",
    commandCategory: "game-sp",
    usages: `${global.config.PREFIX}imposter <bet amount>`,
    cooldowns: 5
};

module.exports.languages = {
    "en": {
        "missingBet": `Usage:\n${global.config.PREFIX}imposter <bet amount>\nExample:\n${global.config.PREFIX}imposter 100`,
        "moneyBetNotEnough": `You don't have enough money.`,
        "limitBet": `Minimum bet is 50$.`,
        "gameStart": `🕵️ Imposter Game: Find the Imposter! 🕵️\nYou have 3 tries.\n\n1. %1 %2\n2. %3 %4\n3. %5 %6\n4. %7 %8\n\nReply with a number (1-4) to guess.`,
        "invalidReply": "❌ Invalid input. Please reply with a number between 1 and 4.",
        "loyalKill": `💀 Wrong! You killed a loyal teammate.\nYou lost %1$. Try again...`,
        "resultWin": `✅ You found the Imposter! It was %1 %2\nYou won %3$!`,
        "resultLoseFinal": `💀 Game Over! You failed to find the Imposter.\nIt was %1 %2\nYou lost total %3$`
    }
};

const characterList = ["Naruto", "Sasuke", "Sakura", "Kakashi", "Itachi", "Hinata", "Madara", "Obito", "Jiraiya", "Tsunade"];
const suspiciousEmojis = ["🤨", "👀", "😒", "😳", "🕵️", "🤔", "🧐", "😐"];

module.exports.run = async function ({ api, event, args, Currencies, getText }) {
    const { threadID, messageID, senderID } = event;
    const { getData } = Currencies;

    const moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet)) return api.sendMessage(getText("missingBet"), threadID, messageID);
    if (moneyBet < 50) return api.sendMessage(getText("limitBet"), threadID, messageID);

    const userData = await getData(senderID);
    if (moneyBet > userData.money) return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);

    // Pick 4 characters
    const pickedCharacters = [];
    while (pickedCharacters.length < 4) {
        const char = characterList[Math.floor(Math.random() * characterList.length)];
        if (!pickedCharacters.includes(char)) pickedCharacters.push(char);
    }

    const pickedEmojis = Array.from({ length: 4 }, () => suspiciousEmojis[Math.floor(Math.random() * suspiciousEmojis.length)]);
    const correctIndex = Math.floor(Math.random() * 4);

    if (!global._imposterSessions) global._imposterSessions = {};
    global._imposterSessions[senderID] = {
        characters: pickedCharacters,
        emojis: pickedEmojis,
        correctIndex,
        bet: moneyBet,
        attempt: 1,
        lostSoFar: 0
    };

    return api.sendMessage(
        getText("gameStart",
            pickedCharacters[0], pickedEmojis[0],
            pickedCharacters[1], pickedEmojis[1],
            pickedCharacters[2], pickedEmojis[2],
            pickedCharacters[3], pickedEmojis[3]
        ),
        threadID,
        (err, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                type: "reply"
            });
        }
    );
};

module.exports.handleReply = async function ({ api, event, handleReply, Currencies, getText }) {
    const { threadID, messageID, senderID, body } = event;
    const { increaseMoney, decreaseMoney } = Currencies;

    if (handleReply.author !== senderID) return;
    const choice = parseInt(body.trim()) - 1;
    if (isNaN(choice) || choice < 0 || choice > 3) {
        return api.sendMessage(getText("invalidReply"), threadID, messageID);
    }

    const session = global._imposterSessions?.[senderID];
    if (!session) return api.sendMessage("❌ No game in progress. Use /imposter <bet> to start a new game.", threadID, messageID);

    const { characters, emojis, correctIndex, bet, attempt, lostSoFar } = session;

    if (choice === correctIndex) {
        let multiplier = 1;
        if (attempt === 1) multiplier = 3;
        else if (attempt === 2) multiplier = 2;
        else multiplier = Math.random() < 0.5 ? 1.2 : 1;

        const reward = Math.floor(bet * multiplier) - lostSoFar;
        await increaseMoney(senderID, reward);
        api.sendMessage(getText("resultWin", characters[choice], emojis[choice], reward), threadID, messageID);
        delete global._imposterSessions[senderID];
    } else {
        const loss = Math.floor(bet * 0.25);
        await decreaseMoney(senderID, loss);
        session.lostSoFar += loss;

        if (attempt >= 3) {
            api.sendMessage(getText("resultLoseFinal", characters[correctIndex], emojis[correctIndex], session.lostSoFar), threadID, messageID);
            delete global._imposterSessions[senderID];
        } else {
            session.attempt++;
            api.sendMessage(getText("loyalKill", loss), threadID, (err, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: senderID,
                    type: "reply"
                });
            });
        }
    }
};
