exports.handler = async () => {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirect = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
    const scope = encodeURIComponent('identify email');

    const authUrl = `https://discord.com/oauth2/authorize?client_id=1408287122754109492&response_type=code&redirect_uri=https%3A%2F%2Fimnotzacharyy.netlify.app%2F.netlify%2Ffunctions%2Fdiscord-callback&scope=email`;

    return {
        statusCode: 302,
        headers: { Location: authUrl }
    };
};