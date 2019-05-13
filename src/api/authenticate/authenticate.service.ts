import {inject, injectable} from 'inversify';
import {MongoDBClient} from "../../utils/mongodb/client";
import {Authenticate} from "./authenticate";
import TYPES from "../../utils/constant/types";
import * as jwt from 'jsonwebtoken';
import {User} from "../user/user";
import JsonWebToken from "../../utils/constant/json-web-token";

@injectable()
export class AuthenticateService {
    @inject(TYPES.MongoDBClient) mongoClient: MongoDBClient;
    public authenticate(model: Authenticate): Promise<User> {
        return new Promise((resolve, reject) => {
            this.mongoClient.find<User>('user', {username: model.username, password: model.password})
                .then(
                    (users: Array<User>) => {
                        const user = users[0];
                        delete user.password;
                        user.token = jwt.sign(user, JsonWebToken.secret, {expiresIn: JsonWebToken.expireIn});
                        resolve(user);
                    },
                    (error: any) => reject(error)
                );
        });
    }

    public verifyAuth(token: string): Promise<boolean>{
        const isAuth = jwt.verify(token, JsonWebToken.secret);
        return new Promise<boolean>((resolve, reject) => {resolve(true)})
    }
}