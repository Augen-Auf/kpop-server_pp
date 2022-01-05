const ApiError = require('../error/ApiError');
const {User, Test , TestResults } = require('../models/models');
const { Op } = require("sequelize");

class UserController {
    async create(req, res, next) {
        const { name, description, questions, answers, correct_answers } = req.body
        const test = await Test.create({ name, description, questions, answers, correct_answers });
        return res.json(test)
    };

    async createTestResult(req, res, next) {
        const { score, user_id, test_id } = req.body
        const testResult = await TestResults.create({ score, user_id, test_id });
        return res.json(testResult)
    };

    async getOne(req, res, next) {
        const { id } = req.params;
        const test = await Test.findOne({ where: {id} })
        return res.json(test)
    }

    async getAll(req, res, next) {
        const tests = await Test.getAll({ attributes: ['id', 'name', 'description', 'createdAt']})
        return res.json(tests)
    }

    async deleteTest(req,  res, next) {
        const id = req.params.id
        const deletedTest = await Test.destroy({ where: { id } })
        return res.json(deletedTest)
    }
}


module.exports = new UserController();
