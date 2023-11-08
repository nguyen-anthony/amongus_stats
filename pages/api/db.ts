import { Pool, PoolConfig } from 'pg';
import { parse } from 'pg-connection-string';

// The connection string is expected to be in the DATABASE_URL environment variable when deployed.
const connectionString = process.env.DATABASE_URL;

let pool: Pool;

if (connectionString) {
    // Parse the connection string if it is available (for deployed environments)
    // @ts-ignore
    const config: PoolConfig = {
        ...parse(connectionString),
        // Add SSL config only if required, which might not be needed for Render
        // If Render requires SSL, uncomment the line below and adjust as necessary.
        // ssl: { rejectUnauthorized: false },
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
