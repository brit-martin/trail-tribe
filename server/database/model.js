import { DataTypes, Model } from 'sequelize';
import connectToDB from './db.js';
import url from 'url';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();
const { POSTGRES_CONNECTION_STRING } = process.env;

class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.BLOB, 
    },
    bio: {
        type: DataTypes.STRING
    },
},
    {
        modelName: 'user',
        sequelize: db,
    })

class Post extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}    

Post.init({
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
        type: DataTypes.BLOB,
    },
},
    {
        modelName: 'post',
        sequelize: db,
        timestamps: true,
    })

class Notification extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
} 

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    hasSeen: {
        type: DataTypes.BOOLEAN,
    }
},
{
    modelName: 'notification',
    sequelize: db,
    timestamps: true,
})

class Reaction extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

Reaction.init({
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
})

class Comment extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }   
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.STRING,
    }
},
{
    modelName: 'comment',
    sequelize: 'db',
    timestamps: true,
})

Post.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Post, {foreignKey: 'userId'})

Notification.belongsTo(User, {foreignKey:'userId'})
User.hasMany(Notification, {foreignKey: 'userId'})

Notification.belongsTo(Reaction,{foreignKey:'reactionId'})
Reaction.hasMany(Notification, {foreignKey: 'reactionId'})

Notification.belongsTo(Comment,{foreignKey:'commentId'})
Comment.hasMany(Notification, {foreignKey: 'commentId'})

Notification.belongsTo(Post,{foreignKey:'postId'})
Post.hasMany(Notification, {foreignKey: 'postId'})

User.belongsToMany(User, {through: 'friends'})

Reaction.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Reaction, {foreignKey: 'userId'})

Reaction.belongsTo(Post, {foreignKey: 'postId'})
Post.hasMany(Reaction, {foreignKey: 'postId'})

Reaction.belongsTo(Comment, {foreignKey: 'commentId'})
Comment.hasMany(Reaction, {foreignKey: 'commentId'})

Comment.belongsTo(Post, {foreignKey:'postId'})
Post.hasMany(Comment, {foreignKey: 'postId'})

Comment.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Comment, {foreignKey: 'userId'})


await sequelize.close();


export const db = await connectToDB(POSTGRES_CONNECTION_STRING);