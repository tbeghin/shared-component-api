import {inject, injectable} from 'inversify';
import TYPES from "../../utils/constant/types";
import {MongoDBClient} from "../../utils/mongodb/client";
import {User} from "./user";

@injectable()
export class UserService {
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient;
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