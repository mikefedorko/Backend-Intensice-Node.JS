import dg from 'debug';
// Instruments
import { Auth } from '../../controllers';

const debug = dg('router:auth');

export const login = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        // req.session.user = { email: 'mikefedorko007@gmail.com' }; // save into session cookie via express session
        const header = req.get('authorization');
        const auth = new Auth(header);
        const data = await auth.login();

        req.session.user = data;
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


/**
 * Via passport
 *
 * import jwt from 'jsonwebtoken';
 * import { promisify } from 'util';
 * import { getPassword } from '../../utils';
 *
 *
 * const sign = promisify(jwt.sign);
 * const key = getPassword();
 *
 * export const login = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const token = await sign({ email: 'jdoe@lectrum.io' }, key, { session: false });

        res.header('X-Token', token);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
*/
