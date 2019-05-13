import {BaseMiddleware} from "inversify-express-utils";
import {inject} from "inversify";
import {NextFunction, Request, Response} from "express";
import {AuthenticateService} from "../../api/authenticate/authenticate.service";
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(AuthenticationMiddleware).inSingletonScope().done()
export class AuthenticationMiddleware extends BaseMiddleware {
    constructor(@inject(AuthenticateService) private authenticateService: AuthenticateService) {
        super();
        console.log('AuthenticationMiddleware constructor');
    }

    public handler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const token = req.header("");
        if (this.authenticateService.verifyAuth(token)) {
            next();
        } else {
            throw new Error();
        }
    }
}