import {inject} from 'inversify';
import {MongoDBClient} from '../../utils/mongodb/client';
import {Authenticate} from './authenticate';
import * as jwt from 'jsonwebtoken';
import {User} from '../user/user';
import JsonWebToken from '../../utils/constant/json-web-token';
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(AuthenticateService).inSingletonScope().done()
export class AuthenticateService {
    constructor(@inject(MongoDBClient) private mongoClient: MongoDBClient) {
    }

    public authenticate(model: Authenticate): Promise<User> {
        return new Promise((resolve, reject) => {
            this.mongoClient.find<User>('users', {username: model.username, password: model.password})
                .then(
                    (users: Array<User>) => {
                        if (!!users && users.length > 0) {
                            const user = users[0];
                            delete user.password;
                            user.token = jwt.sign(user, JsonWebToken.secret, {expiresIn: JsonWebToken.expireIn});
                            resolve(user);
                        } else {
                            resolve();
                        }
                    },
                    (error: any) => reject(error)
                );
        });
    }

    public verifyAuth(token: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
                if (!!token) {
                    jwt.verify(token, JsonWebToken.secret, (err) => !!err ? reject(err) : resolve())
                } else {
                    reject('no token!');
                }
            }
        );
    }
}