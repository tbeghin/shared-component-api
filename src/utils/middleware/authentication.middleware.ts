import {BaseMiddleware, next} from "inversify-express-utils";
import {inject} from "inversify";
import {NextFunction, Request, Response} from "express";
import {AuthenticateService} from "../../api/authenticate/authenticate.service";
import {fluentProvide} from 'inversify-binding-decorators';

@fluentProvide(AuthenticationMiddleware).inSingletonScope().done()
export class AuthenticationMiddleware extends BaseMiddleware {
    constructor(@inject(AuthenticateService) private authenticateService: AuthenticateService) {
        super();
    }

    public handler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let token = req.header("Authorization");
        token = token.split(' ')[1];
        this.authenticateService.verifyAuth(token).then(
            () => next(),
            (err: any) => next(err)
        );
    }
}