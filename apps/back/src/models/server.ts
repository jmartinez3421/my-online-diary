import express, {Express} from 'express';
import cors from 'cors';
import { dbConnection } from '../db/config';
import {authRouter, configRouter, pageRouter, userRouter, searchRouter} from '../routes';

export class Server {
    private app!: Express;

    private port = process.env.PORT;
    private paths = {
        user: '/api/user',
        auth: '/api/auth',
        pages: '/api/page',
        search: '/api/search',
        config: '/api/config'
    }

    constructor() {
        this.app = express();

        //Connect with the DB
        this.database();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async database(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Process body information
        this.app.use(express.json());

        //Static page
        this.app.use(express.static('public'));
    }

    routes() {
        //User routes
        this.app.use(this.paths.user, userRouter);
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.pages, pageRouter);
        this.app.use(this.paths.search, searchRouter);
        this.app.use(this.paths.config, configRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening port ', this.port);
        });
    }
}
