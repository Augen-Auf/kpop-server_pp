const ApiError = require('../error/ApiError');
const admin = require('../config/firebase-config')
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

        const { uid } = req.params
        const { nickname, email, avatarAction } = req.body;

        if(!nickname && !email && !avatarAction) {
            return next(ApiError.badRequest('Отсутсвуют данные для изменения'))
        }

        let user = await User.findOne({where: {uid}});

        if(email) {
            console.log(email)
            await admin.auth().updateUser(uid, {email});
        }

        if(nickname) {
           user = await user.update({nickname})
        }

        if(avatarAction) {

            const avatar = await Avatar.findOne({where: {id: user.avatarId}});
            let newAvatarId = avatar ? avatar.id : null
            const newAvatarImage = req.files

            if (newAvatarImage && newAvatarImage.img) {
                const {name: imageName, data} = newAvatarImage.img
                const newAvatar = avatar ? await avatar.update({
                    name: imageName,
                    img: data
                }) : await Avatar.create({name: imageName, img: data});
                newAvatarId = newAvatar.id
            } else {
                if (avatar && avatarAction === 'remove') {
                    newAvatarId = null
                    await avatar.destroy();
                }
            }

            user = await user.update({avatarId: newAvatarId})
        }

        return res.json(user)
    }

    async changePassword(req, res, next) {
        const { uid } = req.params;

        const { newPassword } = req.body
        console.log(newPassword)
        if(!newPassword) {
            return next(ApiError.badRequest('Отсутсвуют данные для изменения'))
        }

        await admin.auth().updateUser(uid, {password: newPassword});

        return res.json({'result': true})
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
