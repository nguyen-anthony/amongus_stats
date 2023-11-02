import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await pool.connect()

  try {
    const result = await client.query('SELECT * FROM players');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};
