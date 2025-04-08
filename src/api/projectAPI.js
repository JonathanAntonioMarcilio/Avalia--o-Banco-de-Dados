const controller = require('../controller/projectController');

class ProjectApi {
    // Método para criar um projeto
    async criarProjeto(req, res) {
        const name = req.body.name
        const description = req.body.description;

        try {
            const project = await controller.criarProjeto(name, description);
            return res.status(201).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para alterar um projeto
    async alterarProjeto(req, res) {
        const { idProject } = req.params;
        const { name, description } = req.body;

        try {
            const project = await controller.alterarProjeto(Number(idProject), name, description);
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para deletar um projeto
    async deletarProjeto(req, res) {
        const { idProject } = req.params;

        try {
            await controller.deletarProjeto(Number(idProject));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para listar todos os projetos
    async listarProjeto(req, res) {
        try {
            const project = await controller.listarProjetos();
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new ProjectApi();