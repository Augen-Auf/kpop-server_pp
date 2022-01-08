const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.createUser);
router.get('/:uid', userController.getUser);
router.put('/:uid', userController.updateUser);
router.get('/info/:id', userController.getUserById)
// router.post('/password/change', userController.changePassword);
router.post('/news', userController.getUserNews);
router.post('/vikis', userController.getUserVikis);
router.post('/comments', userController.getUserComments);
router.post('/articles', userController.getUserArticles);

module.exports = router;
