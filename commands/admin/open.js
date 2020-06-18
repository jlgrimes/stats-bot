const { Command } = require('discord.js-commando');
const { Pool } = require('pg');
const { table } = require('console');
const { checkTableExists } = require('../../src/db/modules/tableChecks')

module.exports = class RegisterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'open',
            group: 'admin',
            memberName: 'open',
            description:
                'Opens the tournament with the current channel as tournament name.',
            userPermissions: ['ADMINISTRATOR'],
            args: [],
            guildOnly: true,
        });
    }

    async createTable(message, poolClient, tableName) {
        const query = `
        CREATE TABLE ${tableName} (
            discordName varchar(255),
            paid boolean,
            matches varchar(65535)
        );
        `;
        try {
            await poolClient.query(query);
            message.reply(`
Tournament ${tableName} has been opened!
Please type \`bebe register\` to register for the tournament, and PayPal $3 to brian.chisholm37@yahoo.com or Venmo $3 to @Brian-Chisholm37.
PM your decklists to <@470066466876555275> by the end of Round 1. 
`);
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
        const existingTournament = await checkTableExists(
            poolClient,
            channelName
        );

        if (existingTournament) {
            message.reply(`Tournament ${channelName} has already been opened!`);
        } else {
            await this.createTable(message, poolClient, channelName);
        }
    }
};
