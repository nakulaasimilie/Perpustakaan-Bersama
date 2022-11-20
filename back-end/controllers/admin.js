const db = require("../models");
const admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // if (password != confirmPassword) throw "Wrong Password";

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await admin.create({
        username,

        password: hashPass,
      });
      // await profile.create({
      //   UserNIM: NIM,
      // });

      const token = jwt.sign({ username: username }, "jcwd2204");

      res.status(200).send({
        massage: "Register Succes",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const isUserExist = await admin.findOne({
        where: {
          username: username ? username : "",
        },
        raw: true,
      });
      // console.log(isUserExist)

      if (!isUserExist) throw "User not found";

      const payload = { username: isUserExist.username };
      const token = jwt.sign(payload, "jcwd2204");
      // console.log(token)

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) throw `Wrong password`;

      res.status(200).send({
        message: "Login Succes",
        isUserExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      // console.log(verify);
      const result = await admin.findOne({
        where: {
          username: verify.username,
        },
        raw: true,
      });

      result.profilePic = isProflieExist.profilePic;
      // console.log(result)

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
