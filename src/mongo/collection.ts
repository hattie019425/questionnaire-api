import { MongoClient, InsertOneWriteOpResult, Collection as NativeCollection, Db, WriteOpResult, ReplaceWriteOpResult, DeleteWriteOpResultObject, ObjectId } from 'mongodb';
import { Doc } from './doc';

const URL = "mongodb://localhost:27017/";
const DB_NAME = "runoob";

export class Collection<T extends Doc> {
    private static db: Db;
    private collection: NativeCollection<T>
    private collectionName: string
    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    public async findAll(): Promise<T[]> {
        let collection = await this.getCollection();
        return collection.find({}, { sort: { createTime: -1 } }).toArray();
    }

    public async save(doc: T): Promise<ReplaceWriteOpResult | InsertOneWriteOpResult> {
        if (doc._id) {
            return this.replaceOne(doc);
        } else {
            return this.create(doc);
        }
    }

    public async delete(docId: string): Promise<DeleteWriteOpResultObject> {
        let collection = await this.getCollection();
        return collection.deleteOne({ _id: new ObjectId(docId) });
    }

    private async getDB(): Promise<Db> {
        if (!Collection.db) {
            let client: MongoClient = await MongoClient.connect(URL, { useNewUrlParser: true });
            Collection.db = client.db(DB_NAME);
        }
        return Collection.db;
    }

    private async getCollection(): Promise<NativeCollection<T>> {
        let db = await this.getDB();
        this.collection = db.collection(this.collectionName);
        return this.collection;
    }

    private async create(objToSave: any): Promise<InsertOneWriteOpResult> {
        let collection = await this.getCollection();
        return collection.insertOne(objToSave)
    }

    private async replaceOne(doc: T): Promise<ReplaceWriteOpResult> {
        let collection = await this.getCollection();
        console.log('doc', doc);
        let queryFilter = {
            _id: new ObjectId(doc._id)
        };
        doc._id = new ObjectId(doc._id);
        return collection.replaceOne(queryFilter, doc);
    }
}