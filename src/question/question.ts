import { Option } from './option';
import { Doc } from '../mongo/doc';

export class Question extends Doc {
    body: string
    options: Option[] = []
}