import {inject} from 'inversify';
import {MongoDBClient} from "../../utils/mongodb/client";
import {User} from "./user";
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(UserService).inSingletonScope().done()
export class UserService {
    constructor(@inject(MongoDBClient) private mongoClient: MongoDBClient) {
        console.log('UserService constructor');
    }

    public getUsers(): Promise<User[]> {
        return this.mongoClient.find<User>('user', {});
    }

    public getUser(id: string): Promise<User> {
        return this.mongoClient.findOneById<User>('user', id);
    }

    public newUser(user: User): Promise<boolean> {
        return this.mongoClient.insert<User>('user', user);
    }

    public updateUser(id: string, user: User): Promise<boolean> {
        return this.mongoClient.update<User>('user', id, user);
    }

    public deleteUser(id: string): Promise<boolean> {
        return this.mongoClient.remove('user', id);
    }
}