"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'duylinh',
    host: 'localhost',
    database: 'duylinh',
    password: '',
    port: 5432,
});
client.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error connecting to database', err));
exports.default = client;
//# sourceMappingURL=ConnectDBControllers.js.map