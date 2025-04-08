const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET_KEY = 'batata';

class UserController {
    async criarUsuario(name, email, password) {
        if (
            name === undefined
            || email === undefined
            || password === undefined
        ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        // Cria um hash da senha a partir do bcrypt com 10 rounds
        const senhaCriptografada = await bcrypt.hash(password, saltRounds);

        // INSERT INTO users (name, email, password) VALUES (name, email, password);
        const user = await User
            .create({ name, email, password: senhaCriptografada });

        return user;
    }

    async buscarPorId(idUser) {
        if (idUser === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(idUser);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async alterarUsuario(idUser, name, email, password) {
        if (
            idUser === undefined
            || name === undefined
            || email === undefined
            || password === undefined
        ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(idUser);

        user.name = name;
        user.email = email;
        // Cria um hash da senha a partir do bcrypt com 10 rounds
        const senhaCriptografada = await bcrypt.hash(password, saltRounds);
        user.password = senhaCriptografada;
        // UPDATE users SET name = name, email = email, password = password WHERE idUser = idUser;
        user.save();

        return user;
    }

    async deletarUsuario(idUser) {
        if (idUser === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.buscarPorId(idUser);

        user.destroy();
    }

    async listarUsuarios() {
        return User.findAll();
    }

    async login(email, password) {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios');
        }

        // SELECT * FROM users WHERE email = email;
        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Compara a senha informada com a senha do usuário
        const senhaValida = await bcrypt.compare(password, user.password);

        if (!senhaValida) {
            throw new Error('Senha inválida');
        }

        // Gera o token a partir da assinatura com a chave secreta
        const jwtToken = jwt.sign({ idUser: user.idUser }, JWT_SECRET_KEY);

        return { token: jwtToken }
    }

    async validarToken(token) {
        try {
            // Verifica se o token é válido e retorna o payload
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = new UserController();