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
            select 
                (select max(id) from amongus a)                                     as games_played,
                (select count(*) from amongus a where a.winning_team = 'Imposters') as imposter_wins,
                (select count(*) from amongus a where a.winning_team = 'Crewmates') as crewmate_wins
        `;

        const result = await client.query(query);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        client.release(); // Ensure that the client is released after using it
    }
};
