import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiToken = req.headers['x-secret-token'];
  if (apiToken !== process.env.SECRET_API_TOKEN) {
    return res.status(403).send('Access denied.');
  }
  const client = await pool.connect()

  try {
    const result = await client.query('SELECT * FROM players order by id');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};
