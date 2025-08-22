// netlify/functions/discord-start.js
exports.handler = async () => {
    // 1) Use env vars (don’t hard-code)
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = process.env.DISCORD_REDIRECT_URI; // must match Discord app Redirects exactly

    // 2) Request BOTH scopes
    const scope = encodeURIComponent('identify email');

    // 3) Build URL with proper encoding
    const authUrl =
        'https://discord.com/api/oauth2/authorize' +
        `?response_type=code` +
        `&client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${scope}` +
        `&prompt=consent`; // forces re-consent so Discord adds new scopes

    return { statusCode: 302, headers: { Location: authUrl } };
};
