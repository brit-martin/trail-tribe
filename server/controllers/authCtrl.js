import { User } from '../database/model.js';

export default {
  signUp: async (req, res) => {
    console.log('signup router');
    console.log(req.body);
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      res.send('All fields are required to sign up');
      return;
    }
    const alreadyUser = await User.findOne({ where: { email: email } });
    console.log(alreadyUser);
    if (!alreadyUser) {
      let newUser = await User.create({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      });
      console.log(newUser);
      req.session.userId = newUser.id;
      res.send({
        message: 'Sign up successful',
        newUser: newUser,
      });
    } else {
      res.send('User already Exists');
    }
  },

  login: async (req, res) => {
    console.log('login router');
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    console.log(req.body);
    if (user && user.password === password) {
      req.session.userId = user.id;
      res.send({
        // success: true,
        user: user,
      });
    } else {
      res.send({ message: 'Password is incorrect' });
    }
  },
  logout: async (req, res) => {
    console.log('logout router');
  },
  editUserInfo: async (req, res) => {
    console.log('user edit router');
  },
  checkLoginStatus: async (req, res) => {
    console.log('== is logged in route ===');

    try {
      if (!req.session.userId) {
        throw 'You are not logged in! Please login or create an account to access this page';
      } else {
        res.status(200).send({
          message: 'You are logged in and authorized to access this page.',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        message: error,
        reRoute: '/',
      });
    }
  },
};
