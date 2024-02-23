import { Friends } from '../database/model.js';

export default {
  follow: async (req, res) => {
    console.log('=== follow user route ===');
    console.log(req.body.friendId);
    try {
      await Friends.create({
        userId: req.session.userId,
        friendId: req.body.friendId,
      });
      await Friends.create({
        userId: req.body.friendId,
        friendId: req.session.userId,
      });

      res.status(200).send({
        message: 'You are now following a new user!',
      });
    } catch (error) {
      console.log(error);
    }
  },
  unfollow: async (req, res) => {
    console.log('=== unfollow user route ===');
    console.log(req.session.userId);
    console.log(req.params.friendId);
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
      console.log(myConnection);
      console.log(friendsConnection);
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
