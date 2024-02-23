import { User } from "../database/model.js";

export default {
  signUp: async (req, res) => {
    console.log("signup router");
    console.log(req.body);
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      res.send("All fields are required to sign up");
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
      req.session.email = newUser.email;
      req.session.fname = newUser.fname;
      req.session.lname = newUser.lname;
      res.send({
        message: "Sign up successful",
        newUser: newUser,
      });
    } else {
      res.send("User already Exists");
    }
  },

  login: async (req, res) => {
    console.log("login router");
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    console.log(req.body);
    if (user && user.password === password) {
      req.session.email = user.email;
      req.session.fname = user.fname;
      req.session.lname = user.lname;
      req.session.userId = user.id;
      console.log(req.session);
      res.send({
        // success: true,
        user: user,
      });
    } else {
      res.send({ message: "Password is incorrect" });
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).send("Successfully logged out!");
    console.log("logout router");
  },
  editUserInfo: async (req, res) => {
    console.log("user edit router");
    const { fname, lname, email, bio } = req.body;
    const { userId } = req.session;
    console.log(req.body, userId);
    const user = await User.findByPk(userId);
    user.set({ fname, lname, email, bio });
    await user.save();
    req.session.email = user.email;
    req.session.fname = user.fname;
    req.session.lname = user.lname;
    req.session.userId = user.id;
    res.status(200).send("User info updated");
  },
  checkLoginStatus: async (req, res) => {
    console.log("== is logged in route ===");

    try {
      if (!req.session.userId) {
        throw "You are not logged in! Please login or create an account to access this page";
      } else {
        res.status(200).send({
          message: "You are logged in and authorized to access this page.",
          user: {
            id: req.session.userId,
            email: req.session.email,
            fname: req.session.fname,
            lname: req.session.lname,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        message: error,
        reRoute: "/",
      });
    }
  },
  deleteUser: async (req, res) => {
    console.log("delete user router");
    const { email, userId } = req.session;
    const { password } = req.body;
    console.log(email, userId, req.body);
    const user = await User.findByPk(userId);
    if (user.password === password) {
      await User.destroy({ where: { email: email } });
      req.session.destroy();
      res.status(200).send("User deleted");
    } else {
      res.status(400).send("Incorrect password");
    }
  },
  verifyOldPassword: async (req, res) => {
    console.log("verify old password router");
    const { userId, email } = req.session;
    const { password } = req.body;
    console.log(email, userId, password);
    const user = await User.findByPk(userId);
    if (user.password === password) {
      res.status(200).send("Password verified");
    } else {
      res.status(400).send("Incorrect password");
    }
  },
  changePassword: async (req, res) => {
    console.log("change password router");
    const { userId, email } = req.session;
    const { nPassword, cPassword } = req.body;
    console.log(req.body, userId, email);
    const user = await User.findByPk(userId);
    if (nPassword === cPassword) {
      user.password = nPassword;
      await user.save();
      res.status(200).send("Password changed");
    } else {
      res.status(400).send("Passwords do not match");
    }
  },
};
