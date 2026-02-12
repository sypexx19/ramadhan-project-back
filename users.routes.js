import {Router} from 'express' ;
import { Submit , Show , deleteUser } from './users.controllers.js';

const router = Router();

router.get('/', Show );
router.post('/',Submit);
router.delete('/:id',deleteUser);

export default router;
