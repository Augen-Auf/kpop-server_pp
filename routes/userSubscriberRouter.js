const Router = require('express');
const router = new Router();
const userSubscriberController = require('../controllers/userSubscriberController');


router.post('/subscribe', userSubscriberController.subscribe);
router.get('/author/:id', userSubscriberController.getAuthorSubscribers);
router.get('/user/:id', userSubscriberController.getUserSubscriptions);
router.delete('/unsubscribe', userSubscriberController.unsubscribe);


module.exports = router;