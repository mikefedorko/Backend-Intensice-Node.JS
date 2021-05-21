// Core
import debug from 'debug';

// Instruments
import { } from 'dotenv/config';
import { app } from './server';
import { getPort } from './utils';

// DB

import './db';

const PORT = getPort();

app.listen(PORT, () => {
    debug(`Server API is up on port ${PORT}`);
});
