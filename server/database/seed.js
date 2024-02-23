import { db, User, Post, Reaction, Comment, Notification, Friends } from './model.js';
import userData from './_mock_userData.js';
import postData from './_mock_postData.js';
import reactionData from './_mock_reactionData.js';
import commentData from './_mock_commentData.js';
import friendsData from './_mock_friendsData.js';

// Sync Mock Data to DB
console.log('Started seeding!');

await db
  .sync({ force: true })
  .then(async () => {
    // add all the mock data to their respective tables
    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);
    await Reaction.bulkCreate(reactionData);
    await Comment.bulkCreate(commentData);
    await Friends.bulkCreate(friendsData);
  })
  .then(async () => {
    // add reactions to their respective posts
    const reactions = await Reaction.findAll();
    await Promise.all(
      reactions.map(async (react) => {
        const post = await Post.findOne({
          where: {
            id: react.postId,
          },
        });
        post[react.reactionType]++;
        await post.save();
      })
    );
  })
  .then(async () => {
    // close the database
    await db.close();
    console.log('Finished seeding!');
  });
