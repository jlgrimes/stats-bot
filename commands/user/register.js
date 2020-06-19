const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { Pool } = require('pg');
const { checkTableExists, checkUserExists } = require('../../src/db/modules/tableChecks');
const { createUser } = require('../../src/db/modules/users');
const { registerUser } = require('../../src/db/modules/tournament');

module.exports = class RegisterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'register',
            group: 'user',
            memberName: 'register',
            description: 'Register for the current tournament.',
            args: [],
            guildOnly: true,
        });
    }

    async checkPlayerRegistered(message, poolClient, tournamentName) {
        try {
            const discordId = message.author.id;

            const fetchPlayerQuery = `
            SELECT * FROM ${tournamentName} WHERE discordId='${discordId}'
            `;

            const res = await poolClient.query(fetchPlayerQuery);
            if (res.rows.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async register(message, poolClient) {

    }

    async run(message) {
        try {
            const pool = new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false,
                },
            });
    
            const poolClient = await pool.connect();
            const channelName = message.channel.name;
    
            // make sure the tournament is open
            const tournamentExists = await checkTableExists(
                poolClient,
                channelName
            );
            if (!tournamentExists) {
                message.author.send(
                    `Tournament ${channelName} is not open, please wait to register!`
                );
                return;
            }
    
            // make sure the player hasn't already registered
            const playerRegistered = await this.checkPlayerRegistered(
                message,
                poolClient,
                channelName
            );
            if (playerRegistered) {
                message.author.send(
                    `You are already registered for tournament ${channelName}!`
                );
                return;
            }
    
            const userExistsInDatabase = await checkUserExists(message, poolClient);
            if (!userExistsInDatabase) {
                await createUser(message, channelName, poolClient);
                message.author.send('User account created!')
            }

            await registerUser(message, channelName, poolClient);
            message.author.send(`Successfully registered for tournament ${channelName}, please remember to pay and submit deck lists!`)

        } catch (error) {
            console.log(error);
        }
    }
};
