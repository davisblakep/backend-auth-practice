const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

const Users = require('./users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', validateUserSignup, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json({
        message: `User ${saved.username} successfully registered.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post('/login', validateUserLogin, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token, //return the token upon login
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    username: user.username,
    // role: user.role || "user"  (optional: if there's role in db schema)
  };
  const options = {
    expiresIn: '7d',
  };
  return jwt.sign(payload, jwtSecret, options);
}

// ---------------------- Custom Middleware ---------------------- //

function validateUserSignup(req, res, next) {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.firstname ||
    !req.body.lastname
  ) {
    res.status(400).json({
      message:
        'First Name, Last Name, Username, and Password fields are required.',
    });
  } else {
    next();
  }
}

function validateUserLogin(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message:
        'First Name, Last Name, Username, and Password fields are required.',
    });
  } else {
    next();
  }
}

module.exports = router;
