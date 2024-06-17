const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { register, login };
