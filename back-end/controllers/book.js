const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const book = db.Book;
const cart = db.Cart;

module.exports = {
  create: async (req, res) => {
    try {
      const { Title, Author, Genre, Publisher, Abstract, Images } = req.body;
      if (!Title && !Author && !Genre && !Publisher && !Abstract && !Images)
        throw "required field";
      const data = await book.create({
        Title,
        Author,
        Genre,
        Publisher,
        Abstract,
        Images,
      });
      res.status(200).send("Successfully Added");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await book.findAll({
        attributes: [
          "id",
          "Title",
          "Author",
          "Genre",
          "Publisher",
          "Abstract",
          "Images",
          // "Stock",
        ],
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getById: async (req, res) => {
    try {
      const users = await book.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  getBy: async (req, res) => {
    try {
      const { Title, Genre, Publisher, Author } = req.query;
      const users = await book.findAll({
        where: {
          [Op.or]: {
            Title: Title ? Title : "",
            Author: Author ? Author : "",
            Genre: Genre ? Genre : "",
            Publisher: Publisher ? Publisher : "",
          },
        },
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  searchBy: async (req, res) => {
    try {
      const { Title, Author } = req.query;
      const users = await book.findAll({
        where: {
          [Op.or]: {
            Title: {
              [Op.like]: `%${Title}%`,
            },
            Author: {
              [Op.like]: `%${Author}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  totalBooks: async (req, res) => {
    try {
      const users = await book.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      await book.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(req.params.id);
      const users = await book.findAll();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { Title, Author, Genre, Publisher, Abstract, Images, Stock } =
        req.body;
      await book.update(
        {
          Title,
          Author,
          Genre,
          Publisher,
          Abstract,
          Images,
          Stock,
        },
        {
          where: { id: req.params.id },
        }
      );
      const users = await book.findAll({ where: { id: req.params.id } });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const users = await book.findAll({
        order: [[data, order]],
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);
      await book.update(
        {
          Images: fileUploaded.filename,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      const getBook = await book.findOne({
        where: {
          id: req.body.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getBook.id,
        Title: getBook.Title,
        Images: getBook.Images,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  view2: async (req, res) => {
    try {
      const { page, limit, search_query, order, order_direction } = req.query;
      const booklist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * booklist_page;
      const orderby = order || "Title";
      const direction = order_direction || "ASC";
      const totalRows = await book.count({
        where: {
          [Op.or]: [
            {
              Title: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              Author: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              Publisher: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await book.findAll({
        include: [
          {
            model: cart,
            attributes: ["id", "UserNIM"],
          },
        ],
        where: {
          [Op.or]: [
            {
              Title: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              Author: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              Publisher: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        include: [
          {
            model: cart,
            attributes: ["id", "UserNIM"],
          },
        ],
      });

      res.status(200).send({
        result: result,
        page: booklist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  stock: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
