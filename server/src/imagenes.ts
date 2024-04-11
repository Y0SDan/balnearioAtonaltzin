import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pool from "./database";
class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use(express.static(__dirname + "/imgenes"));
    }
    config(): void {
        this.app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.set('port', process.env.PORT || 3002);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(): void {
    
       
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();