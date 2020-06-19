module.exports = {
    createUser: async(message, tournamentName, poolClient) => {
        const fullNameMessageText = `
Thanks for expressing interest in tournament ${tournamentName}! 
Can I get your full name?
        `;
        const fullNameMessage = await message.author.send(fullNameMessageText);
        const fullNameReply = await fullNameMessage.channel.awaitMessages(
            () => true,
            { max: 1 }
        );

        // we do this because fullNameReply returns a Map of messages
        const fullName = fullNameReply.values().next().value.content;

        const ptcgoNameMessageText = `
Can I get your PTCGO name?
        `;
        const ptcgoNameMessage = await message.author.send(ptcgoNameMessageText);
        const ptcgoNameReply = await ptcgoNameMessage.channel.awaitMessages(
            () => true,
            { max: 1 }
        );
        const ptcgoName = ptcgoNameReply.values().next().value.content;

        const addUserQuery = `
        INSERT INTO users (discordId, realName, ptcgoName)
        VALUES ('${message.author.id}', '${fullName}', '${ptcgoName}');
        `;
        try {
            const res = await poolClient.query(addUserQuery);
            console.log(res);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}