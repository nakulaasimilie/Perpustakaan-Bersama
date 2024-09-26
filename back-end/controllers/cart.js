const db = require("../models");
const user = db.User;
const profile = db.Profile;
const cart = db.Cart;
const book = db.Book;

module.exports = {
  addCart: async (req, res) => {
    try {
      const { BookId, UserNIM } = req.body;

      if (!UserNIM) throw "Login Please";

      const data = await cart.create({
        BookId,
        UserNIM,
      });

      res.status(200).send({
        massage: "Add To Cart Succes",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await cart.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({
        massage: "Delete Cart Succes",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getCartBy: async (req, res) => {
    try {
      const { NIM } = req.params;
      const carts = await cart.findAll({
        attributes: ["id"],
        where: {
          UserNIM: NIM,
        },
        include: [
          {
            model: user,
            attributes: ["username"],
          },
          {
            model: book,
          },
        ],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
