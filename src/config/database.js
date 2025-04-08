const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize(
            'nodejs',
            'root',
            '',
            { host: 'localhost', dialect: 'sql' }
        )
    }
}

module.exports = new Database();