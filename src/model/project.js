const database = require('../config/database');

class Project {
    constructor() {
        this.model = database.db.define('task', {
            idProject: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            description: {
                type: database.db.Sequelize.STRING
            }
        });
    }
}

module.exports = (new Project).model;