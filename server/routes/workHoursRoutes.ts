import { Router } from 'express';
import { updateWorkHours, getWorkHours } from '../controllers/workHoursController';

const router = Router();

router.post('/work-hours', updateWorkHours);
router.get('/work-hours', getWorkHours);

export default router;
