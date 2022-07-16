const express = require('express');
var cors = require('cors');
const {
    dbConection
} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
         this.dbConectar();
        this.moddlewares();
        this.routes();
    }

    async dbConectar() {
        await dbConection();
    }
    moddlewares() {
        this.app.use(cors())
        this.app.use(express.static('public'));
        this.app.use(express.json())


    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarioRoute'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App running at http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;