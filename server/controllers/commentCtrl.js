import { Comment, User, Post, Reaction } from '../database/model.js';


export default {
    comment: async (req, res) => {
        console.log('comment router')
        // const comment = await Comment.
         console.log(req.body);
         const {userId, text, postId} = req.body;
         const newComment = await Comment.create({
            userId: userId,
            text: text,
            postId: postId,
         })
         const newPost= await Post.findOne({
                where: {
                    id: postId
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
         })
         res.status(200).send(newPost)
         
    }
}