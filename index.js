const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

let lastMessageTime = new Date();
client.on('messageCreate', (message) => {
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    lastMessageTime = new Date();
});

const TWENTY_MINUTES_MS = 20 * 60 * 1000;

setInterval(async () => {
    if (Date.now() < lastMessageTime.getTime() + TWENTY_MINUTES_MS) return;
    console.log('We pingin them >:)');
    const channel = await client.channels.fetch(process.env.CHANNEL_ID)
    channel.send(`<@&${process.env.ROLE_ID}>`);
    lastMessageTime = new Date();
}, 1000);

client.login(process.env.DISCORD_TOKEN);