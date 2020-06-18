const { Command } = require('discord.js-commando');
const { checkTableExists } = require('../../src/db/modules/tableChecks')

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

    async addPlayer(message, poolClient, tournamentName) {
        try {
            const discordUsername = message.author.id;
            console.log(discordUsername);

            const fetchPlayerQuery = `
            SELECT * FROM ${tournamentName} WHERE discordUsername='${discordUsername}'
            `;

            const res = await poolClient.query(fetchPlayerQuery)
            if (res.rows.length > 0) {
                message.reply(`You are already registered for tournament ${tournamentName}!`);
                
            } else {
                const insertQuery = `
                    INSERT INTO ${tournamentName} (username, ign)
                    VALUES ('${mentioned}', '${ign}');
                    `;

                    await client.query(insertQuery);
                    message.reply(`${mentioned} in game name updated to ${ign}!`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async run(message) {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        const poolClient = await pool.connect();

        const channelName = message.channel.name;
        const tournamentExists = await checkTableExists(poolClient, channelName);

        if (!tournamentExists) {
            message.reply(`Tournament ${channelName} is not open, please wait to register!`);
            return;
        }

        message.reply('yuh');
    }
};
