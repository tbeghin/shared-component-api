import {Db, MongoClient} from 'mongodb';
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(MongoDBConnection).inSingletonScope().done()
export class MongoDBConnection {
    public database: Db;

    constructor() {
        console.log('MongoDBConnection constructor');
        this.connect('mongodb://localhost:27017', 'test');
    }

    private connect(connStr: string, dbName: string): void {
        MongoClient.connect(connStr, { useNewUrlParser: true }).then(
            (client: MongoClient) => this.database = client.db(dbName),
            (err: any) => {
                throw(err);
            }
        );
    }
}