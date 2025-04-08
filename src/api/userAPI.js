const controller = require('../controller/userController');

class UserApi {
    // Método para criar um usuário
    async criarUsuario(req, res) {
        const name = req.body.name
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await controller.criarUsuario(name, email, password);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para alterar um usuário
    async alterarUsuario(req, res) {
        const { idUser } = req.params;
        const { name, email, password } = req.body;

        try {
            const user = await controller.alterarUsuario(Number(idUser), name, email, password);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para deletar um usuário
    async deletarUsuario(req, res) {
        const { idUser } = req.params;

        try {
            await controller.deletarUsuario(Number(idUser));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para listar todos os usuários
    async listarUsuario(req, res) {
        try {
            const users = await controller.listarUsuarios();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await controller.login(email, password);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para validar o token
    async validarToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await controller.validarToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new UserApi();