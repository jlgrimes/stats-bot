module.exports = {
    checkTableExists: async (poolClient, tableName) => {
        // the problem is if we get another error that's not the invalid table one
        // eh that'll never happen heroku is always perfect

        const query = `
        SELECT * FROM ${tableName};
        `;
        try {
            await poolClient.query(query);
            return true;
        } catch (error) {
            return false;
        }
    },
    checkUserExists: async(message, poolClient) => {
        const fetchUserQuery = `
		SELECT * FROM users WHERE discordId='${message.author.id}'
        `;
        try {
            const res = await poolClient.query(fetchUserQuery)
            if (res.rows.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    }
}