import { Router } from 'express';
import { updateSettings, getSettings } from '../controllers/settingsControllers';

const router = Router();

router.post('/settings', updateSettings);
router.get('/settings', getSettings);

export default router;
