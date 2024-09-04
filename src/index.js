const { Client } = require("discord.js");
const { CommandKit } = require("commandkit");
require("dotenv/config");
const { addToSprint } = require("./handlers/messageHandlers/sprintHandler");
// const {
//   checkAndDelete,
// } = require("./handlers/messageHandlers/badLanguageHandler");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
  bulkRegister: true,
});

client.on("messageCreate", async (message) => {
  // Check if the message is from a bot
  if (message.author.bot) return;

  // const messageDeleted = await checkAndDelete(message, client);
  const addedToSprint = await addToSprint(message, client);

  // // Check for inappropriate language
  // if (messageDeleted) return;

  // Check if the message was related to a sprint
  if (addedToSprint) return;
});

client.login(process.env.TOKEN);
