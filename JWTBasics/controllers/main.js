const {BadRequest} = require("../errors/index");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide valid username or password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).send({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const randomNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized secret data ${randomNumber}`,
  });
};

module.exports = { login, dashboard };
