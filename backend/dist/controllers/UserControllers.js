"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUser = exports.SignInUser = void 0;
const ConnectDBControllers_1 = __importDefault(require("./ConnectDBControllers"));
const Joi = require('joi');
const userSchema = Joi.object({
    email: Joi.string().email().max(30).required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().max(30).required(),
    last_name: Joi.string().max(30).required(),
});
const validateUser = async (userData) => {
    const { error } = userSchema.validate(userData);
    if (error) {
        return (error);
    }
    return;
};
const queryAll = async (table) => {
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM "${table}";`);
        return result.rows;
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
};
const findExistingEmail = async (email) => {
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM users WHERE email='${email}';`);
        return result.rows.length > 0;
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        return false;
    }
};
const SignUpUser = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const error = await validateUser({ email, password, first_name, last_name });
    if (error) {
        res.status(400).send(error);
        return;
    }
    if (!email || !password || !first_name || !last_name) {
        res.status(400).send(Error("Please enter all required fields"));
        return;
    }
    const emailExist = await findExistingEmail(email);
    if (emailExist) {
        console.log("email already existed");
        res.status(400).send(Error("email already existed."));
        return;
    }
    else {
        try {
            const result = await ConnectDBControllers_1.default.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}');`);
            res.status(200).send(result);
        }
        catch (err) {
            console.error('Error executing query', err.stack);
            throw err;
        }
    }
};
exports.SignUpUser = SignUpUser;
const SignInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("Please enter all required fields.");
        return;
    }
    try {
        const result = await ConnectDBControllers_1.default.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`);
        res.status(200).send(result);
    }
    catch (err) {
        console.error('Error executing query', err.stack);
        res.status(400).send(err);
        return;
    }
};
exports.SignInUser = SignInUser;
//# sourceMappingURL=UserControllers.js.map