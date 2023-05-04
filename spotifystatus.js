const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

// intialize
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// check if user changes status to online/dnd
client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (newPresence.user.id === process.env.USER_ID && oldPresence.status != newPresence.status) {
    console.log(`Status: ${newPresence.status}`);
  }
});

// check user spotify status
client.on("presenceUpdate", (oldPresence, newPresence) => {
  const oldActivity = oldPresence.activities.find((activity) => activity.name === "Spotify");
  const newActivity = newPresence.activities.find((activity) => activity.name === "Spotify");

  if (newPresence.user.id === process.env.USER_ID && JSON.stringify(oldActivity) != JSON.stringify(newActivity)) {
    if (newActivity) {
      console.log(
        `Spotify: Listening to "${newActivity.details}" by "${newActivity.state}"`
      );
    } else {
      console.log(`Spotify: Not listening`);
    }
  }
});

client.login(token);
