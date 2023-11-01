import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'amongus',
    password: 'NOT_REAL_PASSWORD',
    port: 5432,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const playerId = req.query.playerId;

    if (!playerId) {
        return res.status(400).send("playerId is required");
    }

    try {
        const query = `
      SELECT 
        (SELECT count(*) FROM amongus WHERE $1 = ANY(players)) as games_played,
        (SELECT count(*) FROM amongus WHERE $1 = ANY(imposters) AND winning_team = 'Imposters') as games_won_as_imposter,
        (SELECT count(*) FROM amongus WHERE $1 = ANY(imposters) AND winning_team = 'Crewmates') as games_lost_as_imposter,
        (SELECT count(*) FROM amongus WHERE $1 = first_death) as times_died_first
    `;

        const result = await pool.query(query, [playerId]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
};
