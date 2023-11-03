import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface OAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}

interface UserDetail {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
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
        const userResponse = await axios.get<TwitchUserResponse>(`https://api.twitch.tv/helix/users?login=${playerName}`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Client-Id': process.env.CLIENT_ID,
            },
        });

        const profileImageUrl = userResponse.data.data[0].profile_image_url;
        res.status(200).json({ profileImageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Twitch avatar.' });
    }
};
