const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        try {
          let token = req.headers.authorization;
    
          if (!token) throw "token is empty";
    
          token = token.split(" ")[1];
    
          if (token === null) throw "unauthorized request";
    
          let verifiedUser = jwt.verify(token, "jcwd2204");
    
          if (!verifiedUser) throw "Verify token failed";
    
          req.user = verifiedUser;
    
          next();
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      },

  checkRole: async (req, res, next) => {
    if (req.user.isAdmin) return next();
    res.status(400).send("You are not Admin");
  },
};