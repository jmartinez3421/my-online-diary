import {Router} from 'express';

import {
    GoogleValidators,
    LoginValidators,
    RememberGetValidators, RememberPostValidators,
    RenewValidators
} from './validators';
import {GetSafeQuestion, GoogleLogin, Login, RenewToken, ResetPassword} from '../controllers';

export const authRouter = Router();

authRouter.post('/login', LoginValidators, Login);

authRouter.post('/google', GoogleValidators, GoogleLogin);

authRouter.get('/renew', RenewValidators, RenewToken);

authRouter.get('/remember/:email', RememberGetValidators, GetSafeQuestion);

authRouter.post('/remember', RememberPostValidators, ResetPassword);
