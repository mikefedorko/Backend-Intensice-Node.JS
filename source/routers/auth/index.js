import express from 'express';

export const router = express.Router();

import { login, logout } from './handlers';

// Utils
import { limiter, authenticate } from '../../utils';

router.post('/login', [ limiter(5, 60 * 1000) ], login);
router.post('/logout', [ authenticate, limiter(5, 60 * 1000) ], logout);

export { router as auth };
