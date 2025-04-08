const express = require('express');
const userApi = require('./api/userAPI');
const taskApi = require('./api/taskAPI');
const projectApi = require('./api/projectAPI');
const database = require('./config/database');

console.log('Starting server....')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
})
app.post('/login', userApi.login);
app.post('/user', userApi.criarUsuario);

// Aplica a validação do token para as rotas abaixo
app.use(userApi.validarToken);
app.get('/user', userApi.listarUsuario);
app.put('/user/:id', userApi.alterarUsuario);
app.delete('/user:id', userApi.deletarUsuario);

app.get('/task', taskApi.listarTarefa);
app.put('/task/:id', taskApi.alterarTarefa);
app.delete('/task:id', taskApi.deletarTarefa);

app.get('/project', projectApi.listarProjeto);
app.put('/project/:id', projectApi.alterarProjeto);
app.delete('/project:id', projectApi.deletarProjeto);

database.db.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });