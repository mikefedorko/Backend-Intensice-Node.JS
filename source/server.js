// Connect THROUGH Mongo Shell
// mongo "mongodb+srv://cluster0.3jeuc.mongodb.net" --username mfedroko --password mfedorko

// Connect THROUGH Mongo Native Drivers
// mongodb://mfedroko:mfedorko@cluster0-shard-00-00.3jeuc.mongodb.net:27017,cluster0-shard-00-01.3jeuc.mongodb.net:27017,cluster0-shard-00-02.3jeuc.mongodb.net:27017/mfedorko?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority

// Mongoose Data Sequence:
// 1 step: QUERY TO DB (route => handlers=> controllers => models => odm)
// 2 step: RESPONSE FROM DB (odm => models=> controllers => handlers/route)

// Core
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as routers from './routers';

// Utils
import { logger, errorLogger, NotFoundError, notFoundLogger, validationLogger, sessionOptions } from './utils';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));
app.use(session(sessionOptions));
app.use(cors());
app.disable('x-powered-by');

// Logger
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        let body = null;
        req.reqTime = new Date();

        if (req.method !== 'GET') {
            body = JSON.stringify(req.body, null, 2);
        }

        logger.debug(`${req.method} ${body ? `\n${body}` : ''}\n ${req.reqTime}`);
        next();
    });
}

//Routers
app.use('/', routers.auth);
app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

/* Errors */
// For non-existent routes
app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        switch (error.name) {
            case 'NotFoundError':
                notFoundLogger.error(errorMessage);
                break;

            case 'ValidationError':
                validationLogger.error(errorMessage);
                break;

            default:
                errorLogger.error(errorMessage);
                break;
        }

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });

        next();
    });
}

export { app };


/*
Auth via passport

import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import {jwtOptions} from './utils';

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const { email } = jwtPayload;

    return done(null, { email });
}));
*/
