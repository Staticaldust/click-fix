import { Client } from 'pg';
import { config } from 'dotenv';

config();

const connectionString = process.env.DB_CONNECTION_STRING || '';

// Extract database name from connection string
const dbNameMatch = connectionString.match(/\/([^/?]+)(?:\?|$)/);
const dbName = dbNameMatch ? dbNameMatch[1] : 'click_fix_db';

// Remove database name from connection string to connect to postgres default db
const serverConnectionString = connectionString.replace(`/${dbName}`, '/postgres');

async function initializeDatabase() {
  let client: Client | null = null;
  try {
    console.log('🔍 Connecting to PostgreSQL server...');
    client = new Client(serverConnectionString);
    await client.connect();
    console.log('✅ Connected to PostgreSQL server');

    // Check if database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (result.rows.length === 0) {
      console.log(`📦 Database "${dbName}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created successfully`);
    } else {
      console.log(`✅ Database "${dbName}" already exists`);
    }

    await client.end();
    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

export default initializeDatabase;
