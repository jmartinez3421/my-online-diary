import { Router } from 'express';
import {SearchPageValidators} from './validators/search';
import {SearchPage} from '../controllers/search';

export const searchRouter = Router();

searchRouter.get('/page', SearchPageValidators, SearchPage);
