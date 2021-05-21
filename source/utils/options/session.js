import { getPassword } from '../env';

// Set up for express session
export const sessionOptions = {
    key:               'user', // cookie name
    secret:            getPassword(),
    resave:            false, // disable session resave
    rolling:           true, // reset max age on every use
    saveUninitialized: false,
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000,
    },
};
