const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

const MINUTE = 60 * 1000;
const DEFAULT_WAIT_TIME = 30 * MINUTE;

let lastMessageTime = new Date();
let pingCount = 0;
let waitTime = DEFAULT_WAIT_TIME;

client.on('messageCreate', (message) => {
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    lastMessageTime = new Date();
    if (message.author.id === client.user.id) return;
    pingCount = 0;
    waitTime = DEFAULT_WAIT_TIME;
});

setInterval(async () => {
    if (pingCount === 3 || Date.now() < lastMessageTime.getTime() + waitTime) return;
    const channel = await client.channels.fetch(process.env.CHANNEL_ID)
    channel.send(`<@&${process.env.ROLE_ID}>\nIt's been ${waitTime/MINUTE} minutes since I have last seen someone talk.`);
    pingCount++;
    waitTime *= 2;
}, 1000);

client.login(process.env.DISCORD_TOKEN);