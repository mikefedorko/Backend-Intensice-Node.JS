import express from 'express';

import { authenticate } from '../../utils';
import { get, post } from './handlers';
import { getByHash, updateByHash, removeByHash } from './hash';
import { addVideo } from './education/videos/handlers';
import { addKeynote } from './education/keynotes/handlers';
import { getVideoByHash, removeVideoByHash } from './education/videos/hash';
import { getKeynoteByHash, removeKeynoteByHash } from './education/keynotes/hash';

export const router = express.Router();

router.get('/', get);
router.post('/', [ authenticate ], post);
router.get('/:lessonHash', [ authenticate ], getByHash);
router.put('/:lessonHash', [ authenticate ], updateByHash);
router.delete('/:lessonHash', [ authenticate ], removeByHash);
router.post('/:lessonHash/videos', [ authenticate ], addVideo);
router.post('/:lessonHash/keynotes', [ authenticate ], addKeynote);
router.get('/:lessonHash/videos/:videoHash', [ authenticate ], getVideoByHash);
router.delete('/:lessonHash/videos/:videoHash', [ authenticate ], removeVideoByHash);
router.get('/:lessonHash/keynotes/:keynoteHash', [ authenticate ], getKeynoteByHash);
router.delete('/:lessonHash/keynotes/:keynoteHash', [ authenticate ], removeKeynoteByHash);

export { router as lessons };
