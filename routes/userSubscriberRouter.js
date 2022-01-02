const Router = require('express');
const router = new Router();
const userSubscriberController = require('../controllers/userSubscriberController');


router.post('/subscribe', userSubscriberController.subscribe);
router.get('/author/:id', userSubscriberController.getAuthorSubscribers);
router.get('/user/:id', userSubscriberController.getUserSubscriptions);
router.delete('/:author_id/unsubscribe/:subscriber_id', userSubscriberController.unsubscribe);
router.post('/check', userSubscriberController.checkSubscription);


module.exports = router;
