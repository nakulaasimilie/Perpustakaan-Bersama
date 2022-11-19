const router = require("express").Router();
const { cart } = require("../controllers/index");

router.post("/add", cart.addCart)
router.delete("/", cart.deleteCart)

module.exports = router;