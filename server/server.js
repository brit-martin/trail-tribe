import Express from 'express';
import session from 'express-session';
import viteExpress from 'vite-express';
import dotenv from 'dotenv';
import postCtrl from './controllers/postCtrl.js';
import authCtrl from './controllers/authCtrl.js';
import reactionCtrl from './controllers/reactionCtrl.js';

dotenv.config();
const { PORT } = process.env;

const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());
app.use(session({ secret: 'peak energy', resave: false, saveUninitialized: true, cookie: { secure: false } }));

function loginRequired(req, res, next) {
  console.log(req.session);
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

// == ENDPOINTS ==

// posts
const { getPosts } = postCtrl;
app.get('/posts', loginRequired, getPosts);

// auth
const { signUp, login, logout, editUserInfo, checkLoginStatus } = authCtrl;
app.post('/signup', signUp);
app.post('/login', login);
app.get('/checkLoginStatus', checkLoginStatus);

// reactions
const { createReaction } = reactionCtrl;
app.post('/createReaction', loginRequired, createReaction);

viteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT}`));
