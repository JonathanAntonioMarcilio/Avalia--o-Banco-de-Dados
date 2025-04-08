const controller = require('../controller/taskController');

class TaskApi {
    // Método para criar uma tarefa
    async criarTarefa(req, res) {
        const title = req.body.title
        const status = req.body.status;
        const idUser = req.body.idUser;
        const idProject = req.body.idProject;

        try {
            const task = await controller.criarTarefa(title, status, Number(idUser), Number(idProject));
            return res.status(201).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para alterar uma tarefa
    async alterarTarefa(req, res) {
        const { idTask } = req.params;
        const { title, status, idUser, idProject } = req.body;

        try {
            const task = await controller.alterarTarefa(Number(idTask), title, status, Number(idUser), Number(idProject));
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para deletar uma tarefa
    async deletarTarefa(req, res) {
        const { idTask } = req.params;

        try {
            await controller.deletarTarefa(Number(idTask));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para listar todas as tarefas
    async listarTarefa(req, res) {
        try {
            const tasks = await controller.listarTarefas();
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new TaskApi();