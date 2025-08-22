exports.handler = async () => {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirect = encodeURIComponent(process.env.DISCORD_REDIRECT_URI); // must EXACTLY match Discord app setting
    const scope = encodeURIComponent('identify email'); // includes identify

    const authUrl =
        `https://discord.com/api/oauth2/authorize?response_type=code` +
        `&client_id=1408287122754109492}` +
        `&redirect_uri=https://imnotzacharyy.netlify.app/.netlify/functions/discord-callback` +
        `&scope=email` +
        `&prompt=consent`; // consent forces fresh grant

    return { statusCode: 302, headers: { Location: authUrl } };
};
