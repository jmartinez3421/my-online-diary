import {Request, Response} from 'express';
import {FilterQuery} from 'mongoose';

import {DocumentPage, PageModel} from '../db/models';
import {decryptMessage} from '../helpers';

export const SearchPage = async (req: Request, res: Response) => {

    const user = req.loggedUser;
    const { feeling, music, notes, main } = req.query;

    const query: FilterQuery<DocumentPage> = {feeling, music, main, notes, user: user!._id, status: true};

    if(!feeling) delete query.feeling;

    if(music === undefined) {
        delete query.music;
    } else if(music === 'false'){
        query.music = '';
    } else{
        query.music = /.+/;
    }

    if(notes === undefined) {
        delete query.notes;
    } else if(notes === 'false'){
        query.notes = '';
    } else{
        query.notes = /.+/;
    }

    if(main === undefined) {
        delete query.main;
    } else if(main === 'false'){
        query.main = '';
    } else{
        query.main = /.+/;
    }

    try{
        const pages: DocumentPage[] = await PageModel.find(query).sort({date: -1});
        pages.forEach( (page, i) => {
            if(page.main !== ''){
                page.main = decryptMessage(page.main);
            }
        });

        res.json({
           pages: pages.filter(page => page.main !== '' || page.notes !== '')
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }

}
