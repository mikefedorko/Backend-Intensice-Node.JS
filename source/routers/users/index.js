import express from 'express';

import { get, post } from './handlers';
import { getByHash, updateByHash, removeByHash } from './hash';

// Utils
import { limiter, validator, authenticate } from '../../utils';

// Shemas
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ authenticate, limiter(5, 60 * 1000) ], get);
router.post('/', [ validator(createUser) ], post);
router.get('/:userHash', [ authenticate ], getByHash);
router.put('/:userHash', [ authenticate ], updateByHash);
router.delete('/:userHash', [ authenticate ], removeByHash);

export { router as users };
