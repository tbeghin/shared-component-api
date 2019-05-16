import {Db, MongoClient} from 'mongodb';
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(MongoDBConnection).inSingletonScope().done()
export class MongoDBConnection {
    public database: Promise<Db>;

    constructor() {
        const uri = 'mongodb+srv://shared-component-admin:O0mlgiKqZK2IxJQB@shared-component-db-kfjxa.gcp.mongodb.net/teacher-tool?retryWrites=true';
        this.database = this.connect(uri, 'teacher-tool');
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