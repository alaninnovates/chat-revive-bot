const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const log = (...args) => {
    console.log(`[LOG] [${new Date().toUTCString()}]`, ...args);
}

client.once('ready', (c) => {
    log(`Ready! Logged in as ${c.user.tag}`);
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
    log('Resetting pingCount and waitTime');
    pingCount = 0;
    waitTime = DEFAULT_WAIT_TIME;
});

setInterval(async () => {
    if (Date.now() < lastMessageTime.getTime() + waitTime) return;
    if (pingCount === 3) {
        return log('pingCount is 3');
    }
    const channel = await client.channels.fetch(process.env.CHANNEL_ID)
    channel.send(`<@&${process.env.ROLE_ID}>\nIt's been ${waitTime/MINUTE} minutes since I have last seen someone talk.`);
    pingCount++;
    waitTime *= 2;
    log(`Pinging... waitTime is now: ${waitTime} and pingCount is now ${pingCount}`);
}, 1000);

client.login(process.env.DISCORD_TOKEN);