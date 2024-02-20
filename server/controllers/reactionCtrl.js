import { Post, Reaction } from '../database/model.js';

export default {
  createReaction: async (req, res) => {
    console.log('== create reaction route ==');
    // console.log(req.body);
    const { post, reaction } = req.body;
    console.log(reaction);
    console.log(post);
    console.log(req.session.userId);

    try {
      // get the post that was reacted to
      const dbPost = await Post.findByPk(post.id);
      // search for an existing reaction to this post from the user
      const existingReaction = await Reaction.findOne({
        where: {
          userId: req.session.userId,
          postId: post.id,
        },
      });
      console.log(existingReaction);

      // if an existing reaction exists...
      if (existingReaction) {
        console.log('-- found existing reaction --');
        console.log(existingReaction.reactionType);
        console.log(reaction);
        // check if the existing reaction is the same as the one you just clicked
        if (existingReaction.reactionType === reaction) {
          console.log('existing reaction is the same... delete it and end');
          // throw 'reaction already exists';
          dbPost[existingReaction.reactionType]--;
          post[existingReaction.reactionType]--;
          await existingReaction.destroy();
          await dbPost.save();
          return res.status(200).send({
            post: post,
            message: 'reaction successfully deleted!',
          });
        }

        // decrement the existing appropriate reaction type from the post
        dbPost[existingReaction.reactionType]--;
        post[existingReaction.reactionType]--;

        // delete the existing reaction
        await existingReaction.destroy();
      }

      // create the new reaction in the db
      const newReaction = await Reaction.create({
        reactionType: req.body.reaction,
        userId: req.session.userId,
        postId: post.id,
        commentId: null,
      });

      // increment the appropriate reaction type to the dbpost and the response post object
      dbPost[reaction]++;
      post[reaction]++;
      await dbPost.save();

      // send the response
      res.status(200).send({
        post: post,
        message: 'reaction successfully submitted!',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
