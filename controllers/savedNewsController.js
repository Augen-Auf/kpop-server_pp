const { SavedNews, News } = require('../models/models');

class SavedNewsController {
    async create(req, res) {
        const { user_uid, publication_id } = req.body;
        const savedNews = await SavedNews.create({user_uid, publication_id});
        return res.json(savedNews)
    }

    async getSavedNews(req, res) {
        const user_uid = req.params.id;
        const savedNews = await SavedNews.getAll({include:News, where: {user_uid: user_uid}});
        return res.json(savedNews)
    }

    async unsave(req, res) {
        const publication_id = req.params.id;
        const { user_uid } = req.body;
        const result = await SavedNews.destroy({where: {user_uid: user_uid, publication_id: publication_id }});
        return res.json(result)
    }
}

module.exports = new SavedNewsController();
