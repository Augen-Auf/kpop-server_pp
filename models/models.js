const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uid: { type: DataTypes.STRING, unique: true },
    nickname: { type: DataTypes.STRING }
});

const Avatar = sequelize.define('avatars', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type:DataTypes.BLOB}
})

const News = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true},
    lid: {type: DataTypes.TEXT},
    text: {type: DataTypes.TEXT},
    type: {type: DataTypes.ENUM("news", "articles")},
    views: {type: DataTypes.INTEGER},
});

const SavedNews = sequelize.define('savedNews', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});


const Viki = sequelize.define('viki', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    short_description: {type: DataTypes.STRING},
    birthday: {type: DataTypes.DATE},
    info: {type: DataTypes.TEXT}
});

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT},
});

const CommentRating = sequelize.define('comment_rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    choice: {type: DataTypes.ENUM("up", "down")}
});

const Reaction = sequelize.define('reaction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    emotion: {type: DataTypes.ENUM("happy", "sweat", "sad", "crying", "angry")}
});

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.BLOB},
});

const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tag: {type: DataTypes.STRING, unique: true}
});

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING},
    crud_access: {type: DataTypes.BOOLEAN},
    moderate_access: {type: DataTypes.BOOLEAN}
});

const Test = sequelize.define('test', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    questions: {type: DataTypes.TEXT }
})

const TestResults = sequelize.define('testResult',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    score: { type: DataTypes.INTEGER }
})

const NewsTag = sequelize.define('newsTag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});
const UserSubscriber = sequelize.define('userSubscribers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});


Role.hasMany(User, {foreignKey: 'role_id', allowNull: true});

User.hasMany(Viki, {foreignKey: 'author_id', onDelete: 'SET NULL'});
User.hasMany(Reaction, {foreignKey: 'user_id', onDelete: 'SET NULL'});
User.hasMany(SavedNews, {foreignKey: 'user_id', onDelete: 'CASCADE'});
User.hasMany(Comment, {foreignKey: 'user_id', onDelete: 'SET NULL'});
User.hasMany(News, {foreignKey: 'author_id', onDelete: 'SET NULL'});
User.hasMany(CommentRating, {foreignKey: 'user_id', onDelete: 'CASCADE'});
User.hasMany(Reaction, {foreignKey: 'user_id', onDelete: 'SET NULL'});
User.hasMany(UserSubscriber, {foreignKey: 'author_id', as: 'author', onDelete: 'SET NULL'})
User.hasMany(UserSubscriber, {foreignKey: 'subscriber_id', as: 'subscriber', onDelete: 'SET NULL'})
User.hasMany(TestResults, {foreignKey: 'user_id', as: 'user', onDelete: 'SET NULL'})
User.hasMany(Test, {foreignKey: 'author_id', onDelete: 'SET NULL'})
User.belongsTo(Avatar, {as: 'avatar', allowNull: true, onUpdate:'SET NULL'})

News.belongsTo(User, {foreignKey: 'author_id', onDelete: 'SET NULL'})
News.belongsTo(Image, {foreignKey: 'image_id', allowNull: true, onDelete: 'SET NULL'})
News.hasMany(Reaction, {foreignKey: 'publication_id', onDelete: 'CASCADE'});
News.hasMany(Comment, {foreignKey: 'publication_id', onDelete: 'CASCADE'});
News.hasMany(SavedNews, {
    foreignKey: 'publication_id',
    constraints: false,
    scope: {
        type: "news"
    },
    onDelete: 'CASCADE'
});


Viki.hasMany(SavedNews, {
    foreignKey: 'publication_id',
    constraints: false,
    scope: {
        type: "vikis"
    },
    onDelete: 'CASCADE'
});

Viki.belongsTo(Image, {foreignKey: 'image_id', allowNull: true, onDelete: 'CASCADE'})
Viki.belongsTo(User, {foreignKey: 'author_id', onDelete: 'SET NULL'})

Comment.hasMany(Comment, {foreignKey: 'parent_id', onDelete: 'SET NULL'})
Comment.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Comment.belongsTo(News, {foreignKey: 'publication_id', onDelete: 'CASCADE'});

Test.hasMany(TestResults, { foreignKey: 'test_id', as: 'test', onDelete: 'CASCADE' })
Test.belongsTo(User, { foreignKey: 'author_id', onDelete: 'CASCADE' })

CommentRating.belongsTo(Comment, {foreignKey: 'comment_id', onDelete: 'SET NULL'});
CommentRating.belongsTo(User, {foreignKey: 'user_id', onDelete: 'SET NULL'});

Reaction.belongsTo(User, {foreignKey: 'user_id', onDelete: 'SET NULL'})
Reaction.belongsTo(News, {foreignKey: 'publication_id', onDelete: 'CASCADE'})


News.belongsToMany(Tag, {through: NewsTag, foreignKey: 'publication_id', onDelete: 'CASCADE'});
Tag.belongsToMany(News, {through: NewsTag, foreignKey: 'tag_id', onDelete: 'CASCADE'});

UserSubscriber.belongsTo(User, { foreignKey: 'author_id', as: 'author', onDelete: 'CASCADE'});
UserSubscriber.belongsTo(User, { foreignKey: 'subscriber_id', as: 'subscriber', onDelete: 'CASCADE'});

NewsTag.belongsTo(Tag, {foreignKey: 'tag_id', onDelete: 'CASCADE'})

TestResults.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' })
TestResults.belongsTo(Test, { foreignKey: 'test_id', as: 'test', onDelete: 'CASCADE' })

module.exports = {
    User,
    Role,
    News,
    Reaction,
    Comment,
    CommentRating,
    Image,
    Viki,
    SavedNews,
    Tag,
    Test,
    TestResults,
    Avatar,
    NewsTag,
    UserSubscriber
};
