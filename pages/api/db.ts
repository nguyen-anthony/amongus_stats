// api/db.ts

import { Pool, PoolConfig } from 'pg';
import { parse } from 'pg-connection-string';

let pool: Pool;

if (process.env.DATABASE_URL) {
    // When running on Heroku, use the DATABASE_URL
    // @ts-ignore
    const config: PoolConfig = {
        ...parse(process.env.DATABASE_URL),
        ssl: { rejectUnauthorized: false } // this is needed for Heroku's self-signed certificates
    };
    pool = new Pool(config);
} else {
    // When running locally, use individual environment variables
    pool = new Pool({
        user: process.env.PG_USER!,
        host: process.env.PG_HOST!,
        database: process.env.PG_DATABASE!,
        password: process.env.PG_PASSWORD!,
        port: parseInt(process.env.PG_PORT!, 10)
    });
}

export default pool;
