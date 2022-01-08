const ApiError = require('../error/ApiError');
const {User, Avatar, News, Comment, Viki} = require('../models/models');
const { Op } = require("sequelize");

class UserController {
    async createUser(req, res, next) {
        const {uid, nickname} = req.body;
        const user = await User.create({ uid, nickname });
        return res.json(user)
    };

    async getUser(req, res, next) {
        const { uid } = req.params;
        const user = await User.findOne({ where: { uid } })
        return res.json(user)
    }

    async getUserById(req, res, next) {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } })
        return res.json(user)
    }

    async updateUser(req, res, next) {
        const { nickname } = req.body;
        const { uid } = req.params
        const user = await User.findOne({ where: { uid: uid } })
        const newUser = await user.update({ uid, nickname })
        return res.json(newUser)
    }

    async getUserNews(req, res, next) {
        const { id: userId } = req.body
        const news = await News.findAll({where: {author_id: userId, type:'news'}})
        return res.json(news)
    }

    async getUserComments(req, res, next) {
        const { id:  userId } = req.body
        const comments = await Comment.findAll({where: {user_id: userId}, include: News})
        return res.json(comments)
    }

    async getUserArticles(req, res, next) {
        const { id:  userId } = req.body
        const articles = await News.findAll({where: {author_id: userId, type:'articles'}})
        return res.json(articles)
    }

    async getUserVikis(req, res, next) {
        const { id:  userId } = req.body
        const vikis = await Viki.findAll({where: {author_id: userId}})
        return res.json(vikis)
    }
}


module.exports = new UserController();
