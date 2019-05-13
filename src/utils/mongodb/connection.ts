import {Db, MongoClient} from 'mongodb';
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(MongoDBConnection).inSingletonScope().done()
export class MongoDBConnection {
    public database: Promise<Db>;

    constructor() {
        console.log('MongoDBConnection constructor');
        this.database = this.connect('mongodb://localhost:27017', 'test');
    }

    private connect(connStr: string, dbName: string): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            MongoClient.connect(connStr, {useNewUrlParser: true}).then(
                (client: MongoClient) => resolve(client.db(dbName)),
                (err: any) => resolve(err)
            );
        })
    }
}