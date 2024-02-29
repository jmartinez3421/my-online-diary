import {Router} from 'express';
import {PageDeleteValidators, PageGetAllValidators, PageGetValidators, PagePutValidators} from './validators';
import {DeletePage, GetAllPages, GetPage, UpdatePage} from '../controllers';

export const pageRouter = Router();

//Private - Get all the pages of the logged user
pageRouter.get('/', PageGetAllValidators, GetAllPages);

//Private - The logged user will get his page of today
pageRouter.get('/:date', PageGetValidators, GetPage);

//Private - The logged user will only be able to update his pages
pageRouter.put('/:id', PagePutValidators, UpdatePage);

//Private - The logged user will only be able to delete his pages
pageRouter.delete('/:id', PageDeleteValidators, DeletePage);
