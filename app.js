const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

const appID = '803246971960239';
const appSecret = 'c19298b4ce75926bf2dc0177b77e5912';
const redirectURI = 'https://jenusany.github.io/Instagram-comment-analysis/';

app.get('/auth', async (req, res) => {
    const { code } = req.query;
    try {
        // Exchange code for access token
        const tokenResponse = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token`, {
            params: {
                client_id: appID,
                redirect_uri: redirectURI,
                client_secret: appSecret,
                code: code
            }
        });
        const accessToken = tokenResponse.data.access_token;

        // Optionally exchange for long-lived token
        const longLivedTokenResponse = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token`, {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: appID,
                client_secret: appSecret,
                fb_exchange_token: accessToken
            }
        });
        const longLivedAccessToken = longLivedTokenResponse.data.access_token;

        // Get user info from Instagram Graph API
        const userInfoResponse = await axios.get('https://graph.instagram.com/me', {
            params: {
                fields: 'id,username',
                access_token: longLivedAccessToken
            }
        });

        console.log(code)

        // Send user info as response
        res.json(userInfoResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
    alert(code)
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
