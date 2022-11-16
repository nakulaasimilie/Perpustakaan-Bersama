const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const book = db.Book;

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
          "Title",
          "Author",
          "Genre",
          "Publisher",
          "Abstract",
          "Images",
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
        // include: book,
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

  delete: async (req, res) => {
    try {
      await book.destroy({
        where: {
          id: req.params.id,
        },
      });
      const users = await book.findAll();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      await book.update(
        {
          Title: req.body.Title,
          Author: req.body.Author,
          Genre: req.body.Genre,
          Publisher: req.body.Publisher,
          Abstract: req.body.Abstract,
          Images: req.body.Images,
        },
        {
          where: { id: req.body.id },
        }
      );
      const users = await book.findAll({ where: { id: req.body.id } });
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

