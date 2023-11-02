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
            select p.name, count(*) as count
            from players p
                     join amongus a on p.id = a.first_death
            group by p.name
            order by count desc
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
