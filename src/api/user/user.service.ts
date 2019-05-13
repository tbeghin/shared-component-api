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
        console.log('getUsers');
        return this.mongoClient.find<User>('users', {});
    }

    public getUser(id: string): Promise<User> {
        return this.mongoClient.findOneById<User>('users', id);
    }

    public newUser(user: User): Promise<boolean> {
        return this.mongoClient.insert<User>('users', user);
    }

    public updateUser(id: string, user: User): Promise<boolean> {
        return this.mongoClient.update<User>('users', id, user);
    }

    public deleteUser(id: string): Promise<boolean> {
        return this.mongoClient.remove('users', id);
    }
}