const router = require("express").Router();
const { user } = require("../controllers/index");
const { verifyToken, checkRole } = require("../middleware/auth")

router.post("/register", user.register)
router.post("/login", user.login)
router.get("/allUser", user.findAllUser)

module.exports = router;