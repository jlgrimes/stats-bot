require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: process.env.VERSION === 'dev' ? 'bede?' : 'bede',
    owner: '265515383773986817',
    invite: 'https://discord.com/oauth2/authorize?client_id=722939703967612999&scope=bot'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['user', 'User'],
    ])
    .registerDefaultGroups()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.DISCORD_TOKEN);