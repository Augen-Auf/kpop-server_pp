const { Comment, CommentRating, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class CommentController {
    async create(req, res) {
        const {text, parent_id, user_id, publication_id} = req.body;
        const newComment = await Comment.create({text, parent_id, likes:0, dislikes:0, user_id, publication_id})
            .then(async(comment) => {

            comment.dataValues['user'] = await User.findOne({where:{id: user_id}, attributes:['id', 'nickname']})
            return comment;
        })
        return res.json(newComment)
    }

    async getAll(req, res) {
        const comments = await Comment.findAll();
        return res.json(comments)
    }

    async getCommentRatings(req, res) {
        const commentRatings = await CommentRating.findAll({where: {comment_id: req.params.commentId}});
        return res.json(commentRatings)
    }

    async setCommentRating(req, res) {
        const commentId = req.params.commentId;
        const {user_id, action, choice} = req.body;
        const rating = await CommentRating.findOne({where: {comment_id: commentId, user_id}})
            .then(async (comment) => {
                if(action === 'set')
                    if(comment)
                        return await comment.update({choice: choice})
                    else
                        return await CommentRating.create({comment_id: commentId, user_id, choice})
                else
                    return await comment.destroy()
            })

        return res.json(rating)
    }

    async update(req, res) {
        const id = req.params.id;
        const {text, date, time, parent_id, likes, dislikes, id: userId, publication_id} = req.body;
        const comment = await Comment.findByPk(id);
        const new_comment = await comment.update({text, date, time, parent_id, likes, dislikes, user_id: userId, publication_id});
        return res.json(new_comment)
    }

    async getOne(req, res) {
        const id = req.params.id;
        const comment = await Comment.findByPk(id);
        return res.json(comment)
    }

    async delete(req, res) {
        const id = req.params.id;
        const result = await Comment.destroy({where: {id: id}});
        return res.json(result)
    }

}

module.exports = new CommentController();
