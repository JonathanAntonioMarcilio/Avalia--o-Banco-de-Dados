const Project = require('../model/project');

class ProjectController {
    async criarProjeto(name, description) {
        if (
            name === undefined
            || description === undefined
        ) {
            throw new Error('Nome e descrição são obrigatórios');
        }

        const project = await Project.create({ name, description });

        return project;
    }

    async buscarPorId(idProject) {
        if (idProject === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await Project.findByPk(idProject);

        if (!project) {
            throw new Error('Projeto não encontrado');
        }

        return project;
    }

    async alterarProjeto(idProject, name, description) {
        if (
            idProject === undefined
            || name === undefined
            || description === undefined
        ) {
            throw new Error('Id, nome e descrição são obrigatórios');
        }

        const project = await this.buscarPorId(idProject);

        project.name = name;
        project.description = description;
        // UPDATE users SET name = name, description = description WHERE idProject = idProject;
        project.save();

        return project;
    }

    async deletarProjeto(idProject) {
        if (idProject === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await this.buscarPorId(idProject);

        project.destroy();
    }

    async listarProjetos() {
        return Task.findAll();
    }
}

module.exports = new ProjectController();