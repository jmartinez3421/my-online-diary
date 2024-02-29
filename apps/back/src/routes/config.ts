import {Router} from 'express';
import {ConfigGetValidators, ConfigPostValidators} from './validators';
import {GetConfig, UpdateConfig} from '../controllers';

export const configRouter = Router();

configRouter.get('/', ConfigGetValidators, GetConfig);

configRouter.put('/', ConfigPostValidators, UpdateConfig);
