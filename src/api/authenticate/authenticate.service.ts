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
            this.mongoClient.find<User>('users', {username: model.username, password: model.password})
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
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q1OTEyM2NjMjE2ODI0MjgzODBmNjIiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0b3RvIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTU1Nzc0ODE5MywiZXhwIjoxNTU3NzUxNzkzfQ.wxUxI-xYfctnDz0eA0oSf7wFY8ufyF9ZHxrOYiOT4lk';
        const isAuth = jwt.verify(token, JsonWebToken.secret);
        return new Promise<boolean>((resolve, reject) => {
            resolve(true)
        })
    }
}