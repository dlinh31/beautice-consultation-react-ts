const { SignUpUser, SignInUser } = require('../controllers/UserControllers');
const express2 = require('express');
const router = express2.Router();
router.post('/signup', SignUpUser);
router.post('/signin', SignInUser);
module.exports = router;
//# sourceMappingURL=UserRoutes.js.map