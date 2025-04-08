const database = require('../config/database');

class Task {
    constructor() {
        this.model = database.db.define('task', {
            idTask: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: database.db.Sequelize.STRING
            },
            status: {
                type: database.db.Sequelize.STRING
            },
            idUser: {
                type: database.db.Sequelize.INTEGER
            },
            idProject: {
                type: database.db.Sequelize.INTEGER
            }
        });
    }
}

module.exports = (new Task).model;