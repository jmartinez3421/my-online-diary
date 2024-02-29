import {Request, Response} from 'express';
import {ConfigModel} from '../db/models/config';

export const GetConfig = async (req: Request, res: Response) => {
    const user = req.loggedUser;

    try{
        let config = await ConfigModel.findOne({user: user!._id});
        if(!config){
            config = new ConfigModel({user: user!._id});
        }

        res.json({
            config
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const UpdateConfig = async (req: Request, res: Response) => {
    const user = req.loggedUser;
    const {locale, quote, theme} = req.body;

    try{
        let config = await ConfigModel.findOne({user: user!._id});
        if(!config){
            config = new ConfigModel({user: user!._id});
        }

        if (locale) config.locale = locale;
        if (quote !== undefined) config.quote = quote;
        if (theme) config.theme = theme;

        await config.save();

        res.json({
            config
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}
