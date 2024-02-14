import Express  from "express";
import session from "express-session";
import viteExpress from "vite-express";
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());
app.use(session({secret: 'peak energy',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }}));

function loginRequired(req, res, next) {
  if (!req.session.user_id) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  next();
}

// endpoints here


  viteExpress(app, PORT, () => console.log(`Server is listening on port 8032`))