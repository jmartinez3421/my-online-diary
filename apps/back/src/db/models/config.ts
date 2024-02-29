import {model, Model, Document} from 'mongoose';
import {Config} from '../../models';
import {ConfigSchema} from './schemas';

export interface DocumentConfig extends Config, Document {
    _id: any;
}

export const ConfigModel: Model<DocumentConfig> = model<DocumentConfig>('Config', ConfigSchema);
