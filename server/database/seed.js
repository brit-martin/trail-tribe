import { db, User, Post, Reaction, Comment, Notification } from './model.js';
import userData from './_mock_userData.js';
import postData from './_mock_postData.js';
import reactionData from './_mock_reactionData.js';
import commentData from './_mock_commentData.js';

// Sync Mock Data to DB
console.log('Started seeding!');


await db.sync({ force: true }).then(async () => {
  await User.bulkCreate(userData);
  await Post.bulkCreate(postData);
  await Reaction.bulkCreate(reactionData);
  await Comment.bulkCreate(commentData);
});

// close the database
await db.close();
console.log('Finished seeding!');
