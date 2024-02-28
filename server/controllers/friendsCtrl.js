import { Friends } from '../database/model.js';

export default {
  follow: async (req, res) => {
    // console.log('=== follow user route ===');
    // console.log(req.params.friendId);
    try {
      // check if you are already following this person
      if (
        await Friends.findOne({
          where: {
            userId: req.session.userId,
            friendId: +req.params.friendId,
          },
        })
      ) {
        // freindship already exists, respond
        res.status(200).send({
          message: 'You are already following this user!',
        });
      } else {
        await Friends.create({
          userId: req.session.userId,
          friendId: +req.params.friendId,
        });
        await Friends.create({
          userId: +req.params.friendId,
          friendId: req.session.userId,
        });

        res.status(200).send({
          message: 'You are now following a new user!',
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  unfollow: async (req, res) => {
    // console.log('=== unfollow user route ===');
    // console.log(req.session.userId);
    // console.log(req.params.friendId);
    try {
      const myConnection = await Friends.findOne({
        where: {
          userId: req.session.userId,
          friendId: +req.params.friendId,
        },
      });
      const friendsConnection = await Friends.findOne({
        where: {
          userId: +req.params.friendId,
          friendId: req.session.userId,
        },
      });
      // console.log(myConnection);
      // console.log(friendsConnection);
      await myConnection.destroy();
      await friendsConnection.destroy();

      res.status(200).send({
        message: 'You have unfollowed this user.',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
