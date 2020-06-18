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
    }
}