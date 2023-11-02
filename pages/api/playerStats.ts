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
        WITH games_played AS (
            SELECT 
                p.id, 
                COUNT(a.*) AS games_played
            FROM players p
            LEFT JOIN amongus a ON a.players @> ARRAY[p.id::int]
            GROUP BY p.id
        ),
        
        games_won_as_imposter AS (
            SELECT 
                p.id, 
                COUNT(a.*) AS games_won_as_imposter
            FROM players p
            LEFT JOIN amongus a ON a.imposters @> ARRAY[p.id::int] AND a.winning_team = 'Imposters'
            GROUP BY p.id
        ),
        
        games_lost_as_imposter AS (
            SELECT 
                p.id, 
                COUNT(a.*) AS games_lost_as_imposter
            FROM players p
            LEFT JOIN amongus a ON a.imposters @> ARRAY[p.id::int] AND a.winning_team = 'Crewmates'
            GROUP BY p.id
        ),
        
        times_died_first AS (
            SELECT 
                p.id, 
                COUNT(a.*) AS times_died_first
            FROM players p
            LEFT JOIN amongus a ON p.id = a.first_death
            GROUP BY p.id
        )
        
        SELECT
            p.id,
            p.name,
            COALESCE(gp.games_played, 0) AS games_played,
            COALESCE(gwi.games_won_as_imposter, 0) AS games_won_as_imposter,
            COALESCE(gli.games_lost_as_imposter, 0) AS games_lost_as_imposter,
            COALESCE(tdf.times_died_first, 0) AS times_died_first
        FROM players p
        LEFT JOIN games_played gp ON p.id = gp.id
        LEFT JOIN games_won_as_imposter gwi ON p.id = gwi.id
        LEFT JOIN games_lost_as_imposter gli ON p.id = gli.id
        LEFT JOIN times_died_first tdf ON p.id = tdf.id;
        `;

        const result = await client.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        client.release(); // Ensure that the client is released after using it
    }
};
