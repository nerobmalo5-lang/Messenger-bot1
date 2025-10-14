const axios = require('axios');

// Using the same base URL as the chat module
const BASE_API_URL = "https://eshu-api.onrender.com";

module.exports.config = {
    name: "eshuuteach",
    version: "1.0.2",
    hasPermssion: 0, // Allows everyone to use this command
    credits: "N-E-R-O-B", // Updated credits
    description: "Teaches custom responses to the Eshuu AI.",
    commandCategory: "chat",
    usages: "[question/keyword] => [response]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const { messageID, threadID } = event;
    const fullInput = args.join(" ");
    
    // Check for the " => " separator
    const separatorIndex = fullInput.indexOf(" => ");
    
    if (separatorIndex === -1) {
        return api.sendMessage(
            "Wrong format! To teach Eshuu, use: [question/keyword] => [response]",
            threadID,
            messageID
        );
    } 

    let question = fullInput.slice(0, separatorIndex).trim();
    let answer = fullInput.slice(separatorIndex + 4).trim();
    
    if (question === "") {
        return api.sendMessage("Please provide the **question or keyword** you want Eshuu to learn.", threadID, messageID);
    }
    
    if (answer === "") {
        return api.sendMessage("Please provide the **response** you want Eshuu to give.", threadID, messageID);
    }
    
    try {
        // Construct the teaching endpoint URL
        // We assume the teaching endpoint is '/eshuu/add/[question]&&[answer]'
        const teachUrl = `${BASE_API_URL}/eshuu/add/${encodeURIComponent(question)}&&${encodeURIComponent(answer)}`;
        
        const response = await axios.get(teachUrl);
        const replyMessage = response.data.reply;

        // Check the response from the API
        if (replyMessage) {
            // Since the original API sometimes returned cryptic or foreign-language confirmation,
            // we'll check the text and provide a clean English confirmation.
            
            // If the API returns a known success message or a placeholder
            if (replyMessage.toLowerCase().includes("thành công") || 
                replyMessage.toLowerCase().includes("done") || 
                replyMessage.toLowerCase().includes("success")) {
                
                return api.sendMessage(
                    `✅ Success! Eshuu has learned: "${question}" => "${answer}"`,
                    threadID,
                    messageID
                );
            } 
            
            // If the API indicates the phrase already exists or another known error
            if (replyMessage.toLowerCase().includes("đã tồn tại") || 
                replyMessage.toLowerCase().includes("exists") ||
                replyMessage.toLowerCase().includes("already")) {
                
                return api.sendMessage(
                    "Eshuu says: I think I already know that phrase! Try teaching me something new.",
                    threadID,
                    messageID
                );
            }
            
            // Fallback for unexpected successful response
            return api.sendMessage(`Eshuu's server replied: ${replyMessage}`, threadID, messageID);

        } else {
            // Handle case where API response structure is unexpected
             return api.sendMessage("Eshuu couldn't learn that. The API returned an unknown response structure.", threadID, messageID);
        }

    } catch (error) {
        console.error("Eshuu Teach Error:", error.message);
        return api.sendMessage(
            "Oops! Eshuu's brain is offline right now. I couldn't connect to the teaching server.",
            threadID,
            messageID
        );
    }
};
