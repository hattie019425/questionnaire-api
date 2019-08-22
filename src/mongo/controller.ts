import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { Collection } from './collection';
import { Doc } from './doc';

export class MongoRouteBuilder<T extends Doc> {
    private expressRouter: Router;
    private collectionName: string;
    private resourceName: string;
    private collection: Collection<T>;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.collection = new Collection<T>(collectionName);
        this.expressRouter = express.Router();
        this.buildResourceName();
    }

    private buildResourceName() {
        this.resourceName = "/" + this.collectionName;
    }

    public all(): MongoRouteBuilder<T> {
        return this.findAll().createOne().updateOne().deleteOne();
    }

    public router(): Router {
        return this.expressRouter;
    }

    private findAll(): MongoRouteBuilder<T> {
        this.expressRouter.get(this.resourceName, (req, res, next) =>
            this.collection.findAll().then(questions => res.send(questions)));
        return this;
    }

    private createOne(): MongoRouteBuilder<T> {
        this.expressRouter.post(this.resourceName, (req, res, next) =>
            this.collection.save(req.body).then(writeResult => res.send(writeResult)));
        return this;
    }

    private updateOne(): MongoRouteBuilder<T> {
        this.expressRouter.put(this.resourceName, (req, res, next) =>
            this.collection.save(req.body).then(writeResult => res.send(writeResult)));
        return this;
    }


    private deleteOne(): MongoRouteBuilder<T> {
        this.expressRouter.delete(this.resourceName + "/:id", (req, res, next) => {
            console.log(req.params.id);
            this.collection.delete(req.params.id).then(writeResult => res.send(writeResult));
        });
        return this;
    }
}
