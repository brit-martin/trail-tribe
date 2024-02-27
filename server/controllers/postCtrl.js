import { Post, User, Reaction, Comment } from '../database/model.js';

export default {
  createPost: async (req, res) => {
    console.log('== create post router ==');
    console.log(req.body);
    // createPost.userId = req.session.userId;
    try {
      const newPost = await Post.create({
        userId: req.session.userId,
        trailId: req.body.trailId,
        hikeName: req.body.hikeName,
        description: req.body.description,
        pictureArray: req.body.pictureArray,
        review: req.body.review,
        difficulty: req.body.difficulty,
      });
      console.log(newPost);
      res.status(200).send({
        message: 'You have successfully created your post!',
      });
    } catch (error) {
      console.log(error);
    }
  },
  getFollowingPosts: async (req, res) => {
    console.log('== Get Following Posts Route ==');
    console.log(req.session.userId);
    try {
      const user = await User.findByPk(req.session.userId);
      const friends = await user.getFriends();
      console.log(friends);
      const friendIds = friends.map((friend) => {
        console.log(friend);
        return friend.friendId;
      });
      console.log(friendIds);
      const friendPosts = await Post.findAll({
        where: {
          userId: [...friendIds],
        },
        include: [
          {
            model: User,
            //   attributes: ['name', 'street', 'city', 'state', 'zipcode'],
          },
          {
            model: Reaction,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
        // order: [['created_at', 'DESC']],
        order: [['created_at', 'ASC']],
      });
      console.log(friendPosts);

      //   Send response
      res.status(200).send({
        posts: friendPosts,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getPostsByTrailId: async (req, res) => {
    console.log('=== get posts by trail ID ===');
    console.log(req.params.trailId);
    try {
      // get all posts that match the trailId provided
      const posts = await Post.findAll({
        where: {
          trailId: req.params.trailId,
        },
        include: [
          {
            model: User,
            //   attributes: ['name', 'street', 'city', 'state', 'zipcode'],
          },
          {
            model: Reaction,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      // send the response containing all posts
      res.status(200).send({
        posts: posts,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
