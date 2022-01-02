const { UserSubscriber, User } = require('../models/models');

class UserSubscriberController {
    async subscribe(req, res) {
        const {author_id, user_id} = req.body;
        const userSubscriber = await UserSubscriber.create({author_id, subscriber_id: user_id});
        return res.json(userSubscriber)
    }

    async getAuthorSubscribers(req, res) {
        const author_id = req.params.id;
        const userSubscribers = await UserSubscriber.findAll({include:User, where: {author_id}});
        return res.json(userSubscribers)
    }
    async getUserSubscriptions(req, res) {
        const user_id = req.params.id;
        const userSubscribers = await UserSubscriber.findAll({include:User, where: {subscriber_id: user_id}});
        return res.json(userSubscribers)
    }

    async unsubscribe(req, res) {
        const { user_id, author_id } = req.body;
        const result = await UserSubscriber.destroy({where: {author_id, subscriber_id: user_id }});
        return res.json(result)
    }
}

module.exports = new UserSubscriberController();
