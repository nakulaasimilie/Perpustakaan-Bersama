const db = require("../models");
const user = db.User;
const profile = db.Profile;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");
const transporter = require("../helpers/transporter");

module.exports = {
  register: async (req, res) => {
    try {
      const { NIM, username, email, password, confirmPassword } = req.body;

      if (password != confirmPassword) throw "Wrong Password";

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        NIM,
        username,
        email,
        password: hashPass,
      });
      await profile.create({
        UserNIM: NIM,
      });

      const token = jwt.sign({ NIM: NIM }, "jcwd2204");

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
      const { NIM, password } = req.body;

      const isUserExist = await user.findOne({
        where: {
          NIM: NIM ? NIM : "",
        },
        raw: true,
      });

      if (!isUserExist) throw "User not found";

      const payload = { NIM: isUserExist.NIM };
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
      const result = await user.findOne({
        where: {
          NIM: verify.NIM,
        },
        raw: true,
      });

      const isProflieExist = await db.Profile.findOne({
        where: {
          UserNIM: result.NIM,
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
  findAllUser: async (req, res) => {
    try {
      const users = await user.findAll({ raw: true });
      return res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const { code_otp } = req.body;

      const isAccountExist = await user.findOne({
        where: {
          NIM: req.user.NIM,
        },
        raw: true,
      });

      const isValid = await bcrypt.compare(code_otp, isAccountExist.code_otp);

      if (!isValid) throw `your code otp incorrect...`;

      await user.update(
        { isVerified: true },
        {
          where: {
            NIM: req.user.NIM,
          },
        }
      );
      res.status(200).send({
        message: "Succes Verification",
        data: isAccountExist,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  changeOtp: async (req, res) => {
    try {
      const { NIM } = req.body;

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.update(
        { code_otp: hashOtp },
        {
          where: {
            NIM,
          },
        }
      );

      const isAccountExist = await user.findOne({
        where: { NIM },
        raw: true,
      });

      const token = jwt.sign({ NIM }, "jcwd2204", { expiresIn: "1h" });

      const tempEmail = fs.readFileSync("./template/codeotp.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        username: isAccountExist.username,
        code_otp,
      });

      await transporter.sendMail({
        from: "Admin",
        to: isAccountExist.email,
        subject: "Verifikasi akun",
        html: tempResult,
      });

      res.status(200).send({
        massage: "Check Your Email, code otp send succes",
        data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
