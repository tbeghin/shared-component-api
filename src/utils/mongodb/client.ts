import {Db, ObjectID} from 'mongodb';
import {inject} from 'inversify';
import {MongoDBConnection} from './connection';
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(MongoDBClient).inSingletonScope().done()
export class MongoDBClient {
    private database: Promise<Db>;

    constructor(@inject(MongoDBConnection) mongoDBConnection: MongoDBConnection) {
        this.database = mongoDBConnection.database;
    }

    public find<T>(collection: string, filter: Object): Promise<T[]> {
        return this.database.then((db: Db) => db.collection(collection).find<T>(filter).toArray());
    }

    public findOneById<T>(collection: string, objectId: string): Promise<T> {
        return this.database
            .then(
                (db: Db) => db.collection(collection)
                    .find<T>({_id: new ObjectID(objectId)})
                    .limit(1)
                    .toArray()
            ).then(
                (find: T[]) => find[0],
                (error: any) => error
            )
    }

    public insert<T>(collection: string, model: T): Promise<boolean> {
        return this.database
            .then(
                (db: Db) => db.collection(collection).insertOne(model)
            ).then(
                (insert) => !!insert.result && insert.result.ok === 1,
                (error: any) => error
            )
    }

    public update<T>(collection: string, objectId: string, model: T): Promise<boolean> {
        return this.database
            .then(
                (db: Db) => db.collection(collection).updateOne(
                    {_id: new ObjectID(objectId)},
                    {$set: model}
                )
            ).then(
                (update) => !!update.result && update.result.ok === 1,
                (error: any) => error
            )
    }

    public remove(collection: string, objectId: string): Promise<boolean> {
        return this.database
            .then(
                (db: Db) => db.collection(collection).deleteOne({_id: new ObjectID(objectId)})
            )
            .then(
                (remove) => !!remove.result && remove.result.ok === 1,
                (error: any) => error
            )
    }
}