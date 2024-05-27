"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectDBControllers_1 = require("./ConnectDBControllers");
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
const SignUpUser = async (req, res) => {
    const { username, password } = req.body;
    const usernameExist = await findExistingUsername(username);
    if (usernameExist) {
        console.log("Username already existed");
        res.status(400).send("Username already existed.");
    }
    else {
        try {
            const result = await ConnectDBControllers_1.default.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`);
            res.status(200).send(result);
        }
        catch (err) {
            console.error('Error executing query', err.stack);
            throw err; // Rethrow or handle as needed
        }
    }
};
const SignInUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}';`);
        res.status(200).send(result);
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        res.status(400).send(err);
    }
};
module.exports = {
    SignUpUser,
    SignInUser
};
//# sourceMappingURL=UserControllers.js.map