const Router = require('express');
const router = new Router();
const testController = require('../controllers/testController');


router.post('/', testController.create);
router.put('/:id', testController.update);
router.get('/user/:id', testController.getAllUserTests);
router.post('/score/create', testController.createTestResult);
router.post('/score', testController.getUserTestResult);
router.get('/:id', testController.getOne);
router.get('/:id/questions', testController.getTestQuestions);
router.get('/info/:id', testController.getTestInfo);
router.get('/', testController.getAll);
router.delete('/:id', testController.deleteTest);

module.exports = router;
