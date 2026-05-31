const { Client } = require('pg');
const candidates = [
  'postgres://postgres@127.0.0.1:5432/postgres',
  'postgres://postgres:postgres@127.0.0.1:5432/postgres',
  'postgres://postgres:password@127.0.0.1:5432/postgres',
  'postgres://postgres:1234@127.0.0.1:5432/postgres',
  'postgres://postgres:postgres@127.0.0.1:5432/project',
];
(async () => {
  for (const url of candidates) {
    const client = new Client({ connectionString: url });
    try {
      await client.connect();
      const res = await client.query('SELECT NOW()');
      console.log('OK', url);
      await client.end();
      process.exit(0);
    } catch (err) {
      console.log('FAIL', url, err.message);
    }
  }
  process.exit(1);
})();