import * as bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import express = require('express');
import logger = require('morgan');
import path = require('path');
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import * as http from 'http';
import * as cors from 'cors';
import { QuestionController } from './question/controller';
import { Server } from 'http';
import { URL } from 'url';

let debug = require('debug')();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
/**
 * The app.
 *
 * @class App
 */
export class App {


    private expressApp: express.Application;
    private server!: Server;

    private port: number;

    /**
     * Bootstrap the application.
     *
     * @class App
     * @method bootstrap
     * @static
     */
    public bootstrap(): void {
        this.server = http.createServer(this.expressApp);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
        this.expressApp.listen(this.port, () => {
            console.log("Listening 2 at http://localhost:" + this.port + "/");
        })
    }

    public static createInstance(port: number): App {
        return new App(port);
    }

    /**
     * Constructor.
     *
     * @class App
     * @constructor
     */
    constructor(port: number) {
        //create expressjs application
        this.expressApp = express();
        this.port = port;

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class App
     * @method config
     */
    public config() {
        //add static paths
        this.expressApp.use(express.static(path.join(__dirname, "public")));

        //use logger middlware
        this.expressApp.use(logger("dev"));

        //use json form parser middlware
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cors(corsOptions));

        //use query string parser middlware
        this.expressApp.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parser middleware
        // this.expressApp.use(cookieParser("SECRET_GOES_HERE"));

        //use override middlware
        this.expressApp.use(methodOverride());

        //catch 404 and forward to error handler
        this.expressApp.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        this.expressApp.use(new QuestionController().createRouter());

        //error handling
        this.expressApp.use(errorHandler());

        //set the port the the app
        this.expressApp.set('port', this.port);
    }

    /**
     * Create router
     *
     * @class App
     * @method api
     */
    public routes() {
        //empty for now
        // new DynamicController(this.expressApp);
        console.log(new URL('http:/localhost/test/test?test'));
    }


    /**
     * Event listener for HTTP server "error" event.
     */

    private onError(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof this.port === 'string'
            ? 'Pipe ' + this.port
            : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    private onListening() {
        let addr = this.server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

}
