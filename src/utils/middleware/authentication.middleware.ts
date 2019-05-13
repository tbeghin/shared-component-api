import {BaseMiddleware} from "inversify-express-utils";
import {inject, injectable} from "inversify";
import TYPES from "../constant/types";
import {NextFunction, Request, Response} from "express";
import {AuthenticateService} from "../../api/authenticate/authenticate.service";

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {
    @inject(TYPES.AuthenticateService) private authenticateService: AuthenticateService;
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