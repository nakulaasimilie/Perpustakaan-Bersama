const router = require("express").Router();
const { book } = require("../controllers");

router.post("/create", book.create);
router.get("/list", book.getAll);
router.get("/list/custom", book.getBy);
router.get("/list/:id", book.getById);
router.delete("/list/:id", book.delete);
router.patch("/list/:id", book.update);
router.get("/list/total", book.totalBooks);
// router.get("/list/title", book.getByTitle);
// router.get("/author", book.getByAuthor);
// router.get("/genre", book.getByGenre);
// router.get("/publisher", book.getByPublisher);

module.exports = router;
