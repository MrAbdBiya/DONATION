import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { loginHandler, refreshHandler, registerHandler, meHandler } from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/register', registerHandler);
authRouter.post('/login', loginHandler);
authRouter.post('/refresh', refreshHandler);
authRouter.get('/me', authenticate('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'), meHandler);
