const { Command } = require('discord.js-commando');

module.exports = class RegisterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'register',
            group: 'user',
            memberName: 'register',
            description: 'Register for the current tournament.',
            args: [
            ],
            guildOnly: true,
        });
    }

    run(message) {
        message.reply('yuh');
    }
};
