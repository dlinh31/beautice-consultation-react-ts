"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const UserControllers_1 = require("../controllers/UserControllers");
const express = require('express');
const router = express.Router();
exports.router = router;
router.post('/signup', UserControllers_1.SignUpUser);
router.post('/signin', UserControllers_1.SignInUser);
//# sourceMappingURL=UserRoutes.js.map