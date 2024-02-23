import { Post, User, Reaction, Comment } from '../database/model.js';

export default {
  createPost: async (req, res) => {
    console.log('create post router');
  },
  getPosts: async (req, res) => {
    console.log('== GetPosts Route ==');
    try {
      // Get all posts
      const posts = await Post.findAll({
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
      });

      console.log(posts);

      //   Send response
      res.status(200).send({
        posts: posts,
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
