"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectDBControllers_1 = require("./controllers/ConnectDBControllers");
// A whitelist of table names to prevent SQL injection
const queryAll = async (table) => {
    // Validate table name against a whitelist
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM "${table}";`);
        return result.rows;
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Rethrow or handle as needed
    }
};
const findExistingUsername = async (username) => {
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM users WHERE username='${username}';`);
        return result.rows.length > 0;
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Rethrow or handle as needed
    }
};
const SignUpUser = async (username, password) => {
    const usernameExist = await findExistingUsername(username);
    if (usernameExist) {
        console.log("Username already existed");
    }
    else {
        try {
            const result = await ConnectDBControllers_1.default.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`);
            return result;
        }
        catch (err) {
            console.error('Error executing query', err.stack);
            throw err; // Rethrow or handle as needed
        }
    }
};
const SignInUser = async (username, password) => {
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}';`);
        return result.rows.length > 0;
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Rethrow or handle as needed
    }
};
queryAll("users").then(res => console.log(res))
    .catch(err => console.error('Failed to fetch data:', err));
SignUpUser("test123", "123").then(res => console.log(res));
//# sourceMappingURL=operations.js.map