import {DocumentPage, DocumentUser, PageModel} from '../db/models';
import {Request, Response} from 'express';
import {cryptMessage, decryptMessage, isSameDay} from '../helpers';

const createPage = (date: Date, user: DocumentUser) => {
    return new Promise<DocumentPage>(async (resolve, reject) => {
        try {
            const page = new PageModel({date, user: user._id});
            await page.save();

            resolve(page);
        } catch (err) {
            reject(err);
        }
    });
};

export const GetAllPages = async (req: Request, res: Response) => {
    const user = req.loggedUser;

    try{
        const pages = await PageModel.find({user: user!._id, status: true}).select('date main notes');
        if(pages.length > 0){
            pages.forEach(page => {
                const main = decryptMessage(page.main);
                if(main.length > 0) page.main = 'filled';
                if(page.notes.length > 0) page.notes = 'filled';
            });
        }
        res.json({
            pages
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
}

export const GetPage = async (req: Request, res: Response) => {
    const user = req.loggedUser;
    const {date: dateS} = req.params;

    try {
        const date = new Date(dateS);

        date.setHours(0, 0, 0, 0);

        let page = await PageModel.findOne({date, user: user!._id});
        if (!page) {
            createPage(date, user!)
                .then(page => res.json({page}))
                .catch(err => {
                    throw new Error(err);
                });
        } else {
            if (page.main !== '') {
                page.main = decryptMessage(page.main);
            }

            res.json({
                page
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
};

export const UpdatePage = async (req: Request, res: Response) => {
    const dbPage = req.page;
    const {date, user, status, ...data} = req.body;

    try {
        if (!isSameDay(dbPage!.date, new Date())) {
            delete data.main;
            delete data.feeling;
            delete data.music;
        } else {
            data.main = cryptMessage(data.main);
        }

        const page = await PageModel.findByIdAndUpdate(dbPage!._id, data, {new: true});

        if (page!.main !== '') {
            page!.main = decryptMessage(page!.main);
        }

        res.json({
            page
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
};

export const DeletePage = async (req: Request, res: Response) => {
    const page = req.page;

    try {
        await page?.updateOne({status: false});

        res.json({
            msg: 'The page has been deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'There was an error in the server. Try again or contact the administrator'
        });
    }
};
