import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const apiToken = req.headers['x-secret-token'];
    if (apiToken !== process.env.SECRET_API_TOKEN) {
        return res.status(403).send('Access denied.');
    }

    const client = await pool.connect()

    try {
        const query = `
            SELECT players.name, COUNT(*) AS wins
            FROM players
                     JOIN amongus ON players.id = ANY(amongus.imposters)
            WHERE amongus.winning_team = 'Imposters'
            GROUP BY players.name
            ORDER BY wins desc
            limit 5;
        `;

        const result = await client.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        client.release(); // Ensure that the client is released after using it
    }
};
