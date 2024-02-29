import {DocumentPage, DocumentUser} from '../db/models';

export interface JwtPayload{
    uid: string;
}

declare module "express-serve-static-core" {
    interface Request {
        uid?:           string;
        loggedUser?:    DocumentUser;
        page?:          DocumentPage;
    }
}
