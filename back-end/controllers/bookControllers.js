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
          [Op.like]: {
            [Op.or]: {
              Title: Title ? Title : "",
              Author: Author ? Author : "",
              Genre: Genre ? Genre : "",
              Publisher: Publisher ? Publisher : "",
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
  //   getByTitle: async (req, res) => {
  //     try {
  //       const users = await book.findAll({
  //         include: book,
  //         where: {
  //           Title: Title,
  //         },
  //       });
  //       res.status(200).send(users);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).send(err);
  //     }
  //   },
  //   getByAuthor: async (req, res) => {
  //     try {
  //       const users = await book.findAll({
  //         include: book,
  //         where: {
  //           Author: req.query.Author,
  //         },
  //       });
  //       res.status(200).send(users);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).send(err);
  //     }
  //   },
  //   getByGenre: async (req, res) => {
  //     try {
  //       const users = await book.findAll({
  //         include: book,
  //         where: {
  //           Genre: req.query.Genre,
  //         },
  //       });
  //       res.status(200).send(users);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).send(err);
  //     }
  //   },
  //   getByPublisher: async (req, res) => {
  //     try {
  //       const users = await book.findAll({
  //         include: book,
  //         where: {
  //           Publisher: req.query.Publisher,
  //         },
  //       });
  //       res.status(200).send(users);
  //     } catch (err) {
  //       console.log(err);
  //       res.status(400).send(err);
  //     }
  //   },

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
};
