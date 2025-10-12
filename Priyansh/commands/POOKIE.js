Module.exports.config = {
    name: "eshu", 
    version: "4.3.7",
    hasPermssion: 0,
    credits: "N-E-R-O-B",
    description: "Eshu er shathe kotha bolo! A fresh Banglish chat bot. Bot is always awake and replies when called by name. (Chat with Eshu! Bot is always awake and replies when called by name.)", 
    commandCategory: "Chat with Eshu", 
    usages: "[args]",
    cooldowns: 5,
    dependencies: {
        axios: ""
    }
}

// Define the trigger keywords (all lowercased for case-insensitive matching)
const keywords = ["eshuu", "baby", "bby", "bot", "বট"];

// Simsimi API function
async function simsimi(a, b, c) {
    const d = global.nodemodule.axios, g = (a) => encodeURIComponent(a);
    try {
        // Simsimi API call (using language 'en' as it usually has better coverage, but the response is still styled for Banglish persona)
        var { data: j } = await d({ url: `https://api.simsimi.net/v2/?text=${g(a)}&lc=en`, method: "GET" });
        return { error: !1, data: j }
    } catch (p) {
        return { error: !0, data: {} }
    }
}

// Handle chat events (when a message is sent in the thread)
module.exports.handleEvent = async function ({ api: b, event: a }) {
    const { threadID: c, messageID: d, body: f } = a, g = (e) => b.sendMessage(e, c, d);

    // Only proceed if there is a message body
    if (!f) return; 

    // Normalize the message text for checking against keywords
    const text = f.toLowerCase().trim();
    let query = null;

    // Check if the message starts with any of the trigger keywords
    for (const keyword of keywords) {
        // Check if the message starts with the keyword, optionally followed by a space
        if (text.startsWith(keyword)) {
            // Extract the query text by removing the keyword and trimming any leading whitespace/punctuation
            query = f.substring(keyword.length).trim();
            break;
        }
    }

    if (query !== null) {
        // If the query is empty (user just said "Eshuu" or "bot")
        if (query.length === 0) {
            return g("Haa go, ki bolcho? Kichu jiggesh korbe? 😉");
        }
        
        // Send the query to Simsimi API
        var { data: h, error: i } = await simsimi(query, b, a);

        // Send the response in Banglish style
        return !0 == i ? void 0 : !1 == h.success ? g("Uff, ki bolcho bujhte parchi na... 😥") : g(h.success);
    }
    // If no keyword found, do nothing, allowing other bots or normal conversation to continue.
}

// Handle command execution (when the user uses the bot's prefix, e.g., !eshu ki khobor)
module.exports.run = async function ({ api: b, event: a, args: c }) {
    const { threadID: d, messageID: e } = a, f = (c) => b.sendMessage(c, d, e);
    
    // If no arguments, prompt the user in Banglish
    if (0 == c.length) return f("Ki kotha bolba? Jaldi bolo, waiting achi! (≧▽≦)");

    const query = c.join(" ");
    var { data: g, error: h } = await simsimi(query, b, a);
    
    // Send the response in Banglish style
    return !0 == h ? void 0 : !1 == g.success ? f("Ami ki uttor debo, bujhte parchi na... Tumi abar try koro?") : f(g.success);
};
