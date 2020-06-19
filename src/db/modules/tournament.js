module.exports = {
    registerUser: async(message, tournamentName, poolClient) => {
        const registerUserQuery = `
        INSERT INTO ${tournamentName} (discordId, paid, matches)
        VALUES ('${message.author.id}', 'false', '{}');
        `;
        try {
            const res = await poolClient.query(registerUserQuery);
            console.log(res);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}