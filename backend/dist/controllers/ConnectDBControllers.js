"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db_user = process.env.DB_USER;
const db_host = process.env.DB_HOST;
const db_database = process.env.DB_DATABASE;
const db_password = process.env.DB_PASSWORD || '';
const db_port = parseInt(process.env.DB_PORT || '5432');
const client = new pg_1.Client({
    user: db_user,
    host: db_host,
    database: db_database,
    password: db_password,
    port: db_port,
});
client.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error connecting to database', err));
exports.default = client;
//# sourceMappingURL=ConnectDBControllers.js.map