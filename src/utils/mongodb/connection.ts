import {Db, MongoClient} from 'mongodb';
import {injectable} from "inversify";

@injectable()
export class MongoDBConnection {
    public database: Db;

    constructor(
        private connStr: string = 'mongodb://localhost:27017',
        private dbName: string = 'test'
    ) {
        console.log('MongoDBConnection constructor');
        this.connect(connStr, dbName);
    }

    private connect(connStr: string, dbName: string): void {
        MongoClient.connect(connStr).then(
            (client: MongoClient) => this.database = client.db(dbName),
            (err: any) => {
                throw(err);
            }
        );
    }
}