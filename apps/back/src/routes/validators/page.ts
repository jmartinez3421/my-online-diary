import {check, param} from 'express-validator';

import {CheckErrors, IsHisPage, JWTValidator} from '../../middlewares';
import {validDate} from '../../helpers';

export const PageGetAllValidators = [
    JWTValidator,
    CheckErrors
];

export const PageGetValidators = [
    JWTValidator,
    param('date', 'The date must be a valid date').custom(validDate),
    CheckErrors
];

export const PagePutValidators = [
    JWTValidator,
    IsHisPage,
    check('feeling', 'The feeling must be happy, normal or sad').if(check('feeling').notEmpty()).isIn(['happy', 'normal', 'sad', '-']),
    CheckErrors
];

export const PageDeleteValidators = [
    JWTValidator,
    IsHisPage,
    CheckErrors
];
