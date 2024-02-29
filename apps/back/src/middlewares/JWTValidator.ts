import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import {JwtPayload} from '../models';
import {UserModel} from '../db/models';


export const JWTValidator = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('X-Auth');

    if (!token) {
        return res.status(401).json({
            msg: `There isn't any token in the request`
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;

        //Get the logged user information
        const loggedUser = await UserModel.findById(uid);

        //Verify if the user exists
        if(!loggedUser){
            return res.status(404).json({
                msg: 'No user with this uid'
            });
        }

        //Verify if the user is active
        if(!loggedUser.status){
            return res.status(400).json({
                msg: 'The user is inactive'
            });
        }

        req.uid = uid;
        req.loggedUser = loggedUser;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: `The JWT is not valid`
        })
    }
}
