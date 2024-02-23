import { DataTypes, Model } from 'sequelize';
import connectToDB from './db.js';
import url from 'url';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();
const { POSTGRES_CONNECTION_STRING } = process.env;

const db = await connectToDB(POSTGRES_CONNECTION_STRING);

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'user',
    sequelize: db,
  }
);

class Post extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hikeName: {
      type: DataTypes.STRING,
    },
    trailId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    pictureArray: {
      type: DataTypes.STRING,
    },
    review: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    hearts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    celebrates: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    animals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  },
  {
    modelName: 'post',
    sequelize: db,
    timestamps: true,
  }
);

class Notification extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hasSeen: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'notification',
    sequelize: db,
    timestamps: true,
  }
);

class Reaction extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reactionType: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'reaction',
    sequelize: db,
  }
);

class Comment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'comment',
    sequelize: db,
    timestamps: true,
  }
);

class Friends extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Friends.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    friendId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'friends',
    sequelize: db,
  }
);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

Reaction.hasMany(Notification, { foreignKey: 'reactionId' });
Notification.belongsTo(Reaction, { foreignKey: 'reactionId' });

Comment.hasMany(Notification, { foreignKey: 'commentId' });
Notification.belongsTo(Comment, { foreignKey: 'commentId' });

Post.hasMany(Notification, { foreignKey: 'postId' });
Notification.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Friends, { foreignKey: 'userId' });
Friends.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Reaction, { foreignKey: 'userId' });
Reaction.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Reaction, { foreignKey: 'postId' });
Reaction.belongsTo(Post, { foreignKey: 'postId' });

Comment.hasMany(Reaction, { foreignKey: 'commentId' });
Reaction.belongsTo(Comment, { foreignKey: 'commentId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

export { db, User, Post, Notification, Reaction, Comment, Friends };
