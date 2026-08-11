import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres.xmzvsozvzwbdojylzgpz:Sathya%4001082007@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function getKeys() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const res = await client.query(`
      SELECT * FROM pg_tables WHERE schemaname IN ('auth', 'vault', 'supabase_functions');
    `);
    console.log('Tables:', res.rows.map(r => r.tablename));
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.end();
  }
}
getKeys();
