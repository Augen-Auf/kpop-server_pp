const Router = require('express');
const router = new Router();
const testController = require('../controllers/testController');


router.post('/', testController.create);
router.post('/score', testController.createTestResult);
router.get('/:id', testController.getOne);
router.get('/', testController.getAll);
router.delete('/:id', testController.deleteTest);

module.exports = router;
