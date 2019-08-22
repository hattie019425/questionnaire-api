import { ObjectID } from "bson";

export class Doc {
    _id: string | ObjectID
    createTime: number;
    modifyTime: number;
}