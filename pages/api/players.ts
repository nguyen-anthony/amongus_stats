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
  try {
    const result = await pool.query('SELECT * FROM players');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};
