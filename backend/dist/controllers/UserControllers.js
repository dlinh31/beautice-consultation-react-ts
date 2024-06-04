"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUser = exports.SignInUser = void 0;
const ConnectDBControllers_1 = __importDefault(require("./ConnectDBControllers"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWTControllers_1 = require("./JWTControllers");
const userSchema = joi_1.default.object({
    email: joi_1.default.string().email().max(30).required(),
    password: joi_1.default.string().min(6).required(),
    first_name: joi_1.default.string().max(30).required(),
    last_name: joi_1.default.string().max(30).required(),
});
const validateUser = async (userData) => {
    const { error } = userSchema.validate(userData);
    if (error) {
        return (error.details[0].message);
    }
    return;
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
    if (!email || !password || !first_name || !last_name) {
        res.status(400).json({ error: "Please enter all required fields" });
        return;
    }
    // Validate user data
    const validationError = await validateUser({ email, password, first_name, last_name });
    if (validationError) {
        res.status(400).json({ error: validationError });
        return;
    }
    // Check if email already exists
    if (await findExistingEmail(email)) {
        res.status(409).json({ error: "Email already exists. Please register with another email." });
        return;
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(password, 10); // Use a salt round of 10
    // Insert user into database
    try {
        const result = await ConnectDBControllers_1.default.query('INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name', [email, hashedPassword, first_name, last_name]);
        res.status(200).json(result.rows[0]); // Successful creation
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: "Failed to create user" });
    }
};
exports.SignUpUser = SignUpUser;
const SignInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Please enter all required fields." });
        return;
    }
    try {
        const userResult = await ConnectDBControllers_1.default.query('SELECT * FROM users WHERE email = $1 ;', [email]);
        if (userResult.rowCount === 0) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        const user = userResult.rows[0];
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: "Incorrect password." });
            return;
        }
        const token = (0, JWTControllers_1.generateToken)(user.id);
        res.status(200).json({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, token: token });
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
exports.SignInUser = SignInUser;
//# sourceMappingURL=UserControllers.js.map