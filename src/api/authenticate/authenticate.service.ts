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
        console.log('AuthenticateService constructor');
    }

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

    public verifyAuth(token: string): Promise<boolean> {
        const isAuth = jwt.verify(token, JsonWebToken.secret);
        return new Promise<boolean>((resolve, reject) => {
            resolve(true)
        })
    }
}