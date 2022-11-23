const router = require("express").Router();
const { book } = require("../controllers");
const { multerUpload } = require("../helpers/multer");

router.post("/create", book.create);
router.get("/list", book.getAll);
router.get("/list/filter", book.getBy);
router.delete("/remove/:id", book.remove);
router.patch("/update/:id", book.update);
router.get("/list/total", book.totalBooks);
router.get("/search", book.searchBy);
router.get("/view2", book.view2);
router.get("/sort", book.sortBy);
router.get("/list/:id", book.getById);
router.post("/uploaded/:id", multerUpload.single("file"), book.uploadFile);

module.exports = router;
