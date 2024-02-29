import {model, Model, Document} from 'mongoose';

import { PageSchema } from './schemas';
import {Page} from '../../models';

export interface DocumentPage extends Page, Document{
    _id: any;
}

export const PageModel: Model<DocumentPage> = model<DocumentPage>('Page', PageSchema);
