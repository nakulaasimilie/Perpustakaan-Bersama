const router = require("express").Router();
const { loan } = require("../controllers/index");

router.post("/", loan.addLoan)
router.get("/list", loan.getAll)
router.get("/:NIM", loan.getLoanActive)
router.patch("/:inv", loan.returnLoan)

module.exports = router;