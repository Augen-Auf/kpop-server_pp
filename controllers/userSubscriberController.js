const { UserSubscriber, User } = require('../models/models');

class UserSubscriberController {
    async create(req, res) {
        const {user_uid, subscriber_id} = req.body;
        const userSubscriber = await UserSubscriber.create({user_uid, subscriber_id});
        return res.json(userSubscriber)
    }

    async getSubscribers(req, res) {
        const user_uid = req.params.id;
        const userSubscribers = await UserSubscriber.getAll({include:User, where: {user_uid: user_uid}});
        return res.json(userSubscribers)
    }
    async getSubscriptions(req, res) {
        const user_uid = req.params.id;
        const userSubscribers = await UserSubscriber.getAll({include:User, where: {subscriber_id: user_uid}});
        return res.json(userSubscribers)
    }

    async unsubscribe(req, res) {
        const subscription_id = req.params.id;
        const { user_uid } = req.body;
        const result = await UserSubscriber.destroy({where: {user_uid: subscription_id, subscriber_id: user_uid }});
        return res.json(result)
    }
}

module.exports = new UserSubscriberController();
