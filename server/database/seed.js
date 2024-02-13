import { db, User, Post, Reaction, Comment, Notification, Friends } from './model.js';
import userData from './_mock_userData.json' assert { type: 'json' };
import postData from './_mock_postData.json' assert { type: 'json' };
import reactionData from './_mock_reactionData.json' assert { type: 'json' };
import commentData from './_mock_commentData.json' assert { type: 'json' };

// Sync Mock Data to DB
console.log('Started seeding!');
await db.sync({ force: true }).then(async () => {
  await User.bulkCreate(JSON.parse(userData));
  await Post.bulkCreate(JSON.parse(postData));
  await Reaction.bulkCreate(JSON.parse(reactionData));
  await Comment.bulkCreate(JSON.parse(commentData));
});

// close the database
await db.close();
console.log('Finished seeding!');
