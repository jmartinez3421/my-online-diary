import {NextFunction, Request, Response} from 'express';
import Mongoose from 'mongoose';
import {PageModel} from '../db/models';

export const IsHisPage = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.uid;
    const pageId = req.params.id;

    try{
        if(Mongoose.Types.ObjectId.isValid(pageId)){
            const dbPage = await PageModel.findOne({user: userId, _id: pageId});
            if(!dbPage){
                return res.status(404).json({
                    msg: `This page doesn't exists or is not yours`
                });
            }

            req.page = dbPage;
            next();
        }else{
            return res.status(404).json({
                msg: `The page id is not valid`
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}
