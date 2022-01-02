const { UserSubscriber, User } = require('../models/models');

class UserSubscriberController {
    async subscribe(req, res) {
        const {author_id, subscriber_id} = req.body;
        const userSubscriber = await UserSubscriber.create({author_id, subscriber_id});
        return res.json(userSubscriber)
    }

    async getAuthorSubscribers(req, res) {
        const author_id = req.params.id;
        console.log('a_id', author_id)
        const userSubscribers = await UserSubscriber.findAll({ where: {author_id} });
        return res.json(userSubscribers)
    }
    async getUserSubscriptions(req, res) {
        const user_id = req.params.id;
        const userSubscribers = await UserSubscriber.findAll({ where: {subscriber_id: user_id}, include:[
            {
                model:  User,
                as: 'author',
                attributes: ['nickname', 'id', 'createdAt']
            }
            ]});
        return res.json(userSubscribers)
    }

    async unsubscribe(req, res) {
        const { subscriber_id, author_id } = req.params;
        const result = await UserSubscriber.destroy({where: {author_id, subscriber_id }});
        return res.json(result)
    }

    async checkSubscription(req, res) {
        const { user_id, author_id } = req.body;
        const result = await UserSubscriber.findOne({where: {author_id, subscriber_id: user_id }});
        return res.json(result)
    }
}

module.exports = new UserSubscriberController();
