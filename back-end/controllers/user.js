const db = require("../models")
const user = db.User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")

module.exports = {
  register: async (req, res) => {
    try {
      const { NIM, username, email, password, confirmPassword } = req.body;
      if (password != confirmPassword) throw "Wrong Password";

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10)

      const hashPass = await bcrypt.hash(password, salt)

      const data = await user.create({
        NIM,
        username,
        email,
        password: hashPass,
      })
      res.status(200).send(data)
    } catch(err) {
      res.status(400).send(err)
      // console.log(err)
    }
  },
  login: async (req,res) => {
      try {
        const { NIM, password } = req.body;

        
        const isUserExist = await user.findOne({
          where: {
              NIM: NIM ? NIM : "",
          },
          // raw: true,
        });
        if(!isUserExist) throw "User not found"

        const isValid = await bcrypt.compare(password, isUserExist.password)
        
        if(!isValid) throw `Wrong password`

        const payload = {id:isUserExist.id, isAdmin: isUserExist.isAdmin}
        const token = jwt.sign(payload,"Perpustakaan Bersama", {expiresIn: '1h'})
        // console.log(token)

          res.status(200).send({
            user: {
              username: isUserExist.username,
              id: isUserExist.id,
            },
            token,
            message: "Login Succses"
          })
      } catch(err) {
        console.log(err)
        res.status(400).send(err)
      }
  },
  findAllUser: async (req, res) => {
    try {
      const users = await user.findAll({ raw: true })
      return res.status(200).send(users)
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  }
}