const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const admin = require('firebase-admin');

let app;
function getAdmin() {
    if (!app) {
        app = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            })
        });
    }
    return app;
}

exports.handler = async (event) => {
    try {
        const code = (new URLSearchParams(event.queryStringParameters)).get('code');
        if (!code) {
            return { statusCode: 400, body: 'Missing code' };
        }

        // 1) Exchange code for token
        const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.DISCORD_REDIRECT_URI
            })
        });

        if (!tokenRes.ok) {
            const t = await tokenRes.text();
            return { statusCode: 400, body: `Token exchange failed: ${t}` };
        }
        const tokenJson = await tokenRes.json();
        const accessToken = tokenJson.access_token;

        // 2) Fetch Discord user
        const userRes = await fetch('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (!userRes.ok) {
            const t = await userRes.text();
            return { statusCode: 400, body: `User fetch failed: ${t}` };
        }
        const du = await userRes.json();
        // du.id, du.username, du.discriminator (or global_name), du.email (if scope granted), du.verified

        // 3) Mint Firebase custom token
        getAdmin();
        const uid = `discord_${du.id}`;
        const additionalClaims = {
            provider: 'discord',
            discord: {
                id: du.id,
                username: du.username || null,
                global_name: du.global_name || null,
                email: du.email || null,
                verified: du.verified || false
            }
        };
        const customToken = await admin.auth().createCustomToken(uid, additionalClaims);

        // 4) Redirect back to your site with token in URL fragment (not logged)
        const site = `https://${process.env.URL ? new URL(process.env.URL).host : '<your-site>.netlify.app'}`;
        const redirectTo = `${site}/logi.html#firebase_custom_token=${encodeURIComponent(customToken)}`;

        return {
            statusCode: 302,
            headers: { Location: redirectTo }
        };
    } catch (e) {
        console.error(e);
        return { statusCode: 500, body: 'Internal error' };
    }
};
