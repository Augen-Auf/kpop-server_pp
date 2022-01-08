const ApiError = require('../error/ApiError');
const {User, Test , TestResults } = require('../models/models');
const { Op } = require("sequelize");

class UserController {
    async create(req, res, next) {
        const { name, description, questions, author_id } = req.body
        const test = await Test.create({ name, description, questions, author_id });
        return res.json(test)
    };

    async update(req, res, next) {
        const { id } = req.params
        const { name, description, questions } = req.body
        let test = await Test.findByPk(id);
        test = await test.update({ name, description, questions })
        return res.json(test)
    };

    async createTestResult(req, res, next) {
        const { answers, user_id, test_id } = req.body
        const test = await Test.findByPk(test_id)
        const questions = await JSON.parse(test.questions)

        let score = 0

        console.log(answers)
        for(const questionNumber in answers) {
            const userAnswers = answers[questionNumber]
            const correctAnswers =
                questions[questionNumber].answers.map(item => item.correct ? item.value : null).filter(item => item)

            score += userAnswers.length === correctAnswers.length &&
            correctAnswers.every( val =>  userAnswers.includes(val))
                ? 1 : 0
        }

        let testResult = await TestResults.findOne({ where: {user_id, test_id} })

        if(testResult)
            testResult = await testResult.update({ score, user_id, test_id });
        else
            testResult = await TestResults.create({ score, user_id, test_id })
        return res.json(testResult)
    };

    async getUserTestResult(req, res, next)  {
        const {user_id, test_id} = req.body
        const userScore = await TestResults.findOne({ where: {user_id, test_id} })
        return res.json(userScore)
    }

    async getOne(req, res, next) {
        const { id } = req.params;
        let test = await Test.findOne({ where: {id} })
        return res.json(test)
    }

    async getTestQuestions(req, res, next) {
        const { id } = req.params;
        let test = await Test.findOne({ where: {id} })
        let questions = await JSON.parse(test.questions)
        console.log(questions)
        questions = questions.map(question => {
            question.answers = question.answers.map(answer => answer.value)
            return question
        })

        return res.json(questions)
    }

    async getAll(req, res, next) {
        const tests = await Test.findAll({ attributes: ['id', 'name', 'description', 'createdAt']})
        return res.json(tests)
    }

    async getAllUserTests(req, res, next) {
        const { id } = req.params
        const tests = await Test.findAll({ where:{author_id: id}, attributes: ['id', 'name', 'description', 'createdAt']})
        return res.json(tests)
    }

    async getTestInfo(req, res, next) {
        const { id } = req.params
        const testInfo = await Test.findOne({ where: {id}, attributes: ['id', 'name', 'description', 'createdAt'] })
        return res.json(testInfo)
    }

    async deleteTest(req,  res, next) {
        const id = req.params.id
        const deletedTest = await Test.destroy({ where: { id } })
        return res.json(deletedTest)
    }
}


module.exports = new UserController();
