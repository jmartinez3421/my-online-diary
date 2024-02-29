import {NextFunction, Request, Response} from 'express';
import bcryptjs from 'bcryptjs';

export const CheckPassword = (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    if(password){
       const isValid = bcryptjs.compareSync(password, req.loggedUser?.password!);
       if(!isValid){
           return res.json({
               msg: `The current password does not match`
           });
       }
    }

    next();
}
