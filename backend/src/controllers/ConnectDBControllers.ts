import { Client } from 'pg';

const client = new Client({
  user: 'duylinh',
  host: 'localhost',
  database: 'duylinh',
  password: '',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database', err));

export default client;