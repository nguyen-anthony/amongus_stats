import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface OAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}

interface UserDetail {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: number[];
    tags: string[];
    is_mature: boolean;
}

interface TwitchUserResponse {
    data: UserDetail[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const playerName = req.query.playerName as string;

    try {
        // Get the OAuth token
        const oauthResponse = await axios.post<OAuthResponse>('https://id.twitch.tv/oauth2/token', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'client_credentials',
            },
        });

        const bearerToken = oauthResponse.data.access_token;

        // Use the token to get user details
        const userResponse = await axios.get<TwitchUserResponse>(`https://api.twitch.tv/helix/streams?user_login=${playerName}`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Client-Id': process.env.CLIENT_ID,
            },
        });

        const status = userResponse.data ? userResponse.data.data[0].type : "offline";
        res.status(200).json({ status });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Twitch status.' });
    }
};
