const Task = require('../model/task');

class TaskController {
    async criarTarefa(title, status, idUser, idProject) {
        if (
            title === undefined
            || status === undefined
            || idUser === undefined
            || idProject === undefined
        ) {
            throw new Error('Titulo, status, id do usuário e id do projeto são obrigatórios');
        }

        const task = await Task.create({ title, status, idUser, idProject });

        return task;
    }

    async buscarPorId(idTask) {
        if (idTask === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await Task.findByPk(idTask);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        return task;
    }

    async alterarTarefa(idTask, title, status, idUser, idProject) {
        if (
            idTask === undefined
            || title === undefined
            || status === undefined
            || idUser === undefined
            || idProject === undefined
        ) {
            throw new Error('Titulo, status, id do usuário e id do projeto são obrigatórios');
        }

        const task = await this.buscarPorId(idTask);

        task.title = title;
        task.status = status;
        task.idUser = idUser;
        task.idProject = idProject;
        // UPDATE users SET title = title, status = status, idUser = idUser, idProject = idProject WHERE idTask = idTask;
        task.save();

        return task;
    }

    async deletarTarefa(idTask) {
        if (idTask === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await this.buscarPorId(idTask);

        task.destroy();
    }

    async listarTarefas() {
        return Task.findAll();
    }
}

module.exports = new TaskController();