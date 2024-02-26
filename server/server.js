import Express from 'express';
import session from 'express-session';
import viteExpress from 'vite-express';
import dotenv from 'dotenv';
import postCtrl from './controllers/postCtrl.js';
import authCtrl from './controllers/authCtrl.js';
import reactionCtrl from './controllers/reactionCtrl.js';
import friendsCtrl from './controllers/friendsCtrl.js';
import commentCtrl from './controllers/commentCtrl.js';

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
const { getFollowingPosts, getPostsByTrailId } = postCtrl;
app.get('/getFollowingPosts', loginRequired, getFollowingPosts);
app.get('/getPostsByTrailId/:trailId', loginRequired, getPostsByTrailId);

// auth
const {
  signUp,
  login,
  logout,
  editUserInfo,
  checkLoginStatus,
  deleteUser,
  verifyOldPassword,
  changePassword,
  getNewsfeedUserInfo,
} = authCtrl;
app.post('/signup', signUp);
app.post('/login', login);
app.get('/checkLoginStatus', checkLoginStatus);
app.delete('/logout', loginRequired, logout);
app.put('/delete-user', loginRequired, deleteUser);
app.post('/old-password', loginRequired, verifyOldPassword);
app.put('/change-password', loginRequired, changePassword);
app.put('/edit-user', loginRequired, editUserInfo);
app.get('/getNewsfeedUserInfo/:userId', loginRequired, getNewsfeedUserInfo);

// reactions
const { createReaction } = reactionCtrl;
app.post('/createReaction', loginRequired, createReaction);

// friends
const { follow, unfollow } = friendsCtrl;
app.post('/follow/:friendId', loginRequired, follow);
app.delete('/unfollow/:friendId', loginRequired, unfollow);

// comments
const { comment } = commentCtrl;
app.post('/comment', loginRequired, comment);

viteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT}`));
