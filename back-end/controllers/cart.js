const db = require("../models")
const user = db.User
const profile = db.Profile
const cart = db.Cart

module.exports = {
    addCart: async (req, res) => {
        try {
            const { BookId, UserNIM } = req.body;

            if (!UserNIM) throw "Login Please";

            const data = await cart.create({
                BookId,
                UserNIM,
            })

            res.status(200).send({
                massage: "Add To Cart Succes",
                data
            });

        } catch(err) {
            res.status(400).send(err)
        }
    },
    deleteCart: async (req, res) => {
        try {
            const { id } = req.body;

            const data = await cart.destroy({
                where: {
                id,
                },
            });

            res.status(200).send({
                massage: "Delete Cart Succes",
                data
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
}