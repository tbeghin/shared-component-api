import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {inject} from "inversify";
import {UserService} from "./user.service";
import {User} from "./user";
import {AuthenticationMiddleware} from "../../utils/middleware/authentication.middleware";

@ApiPath({
    path: "/user",
    name: "User",
    security: {basicAuth: []}
})
@controller('/user')
export class UserController extends BaseHttpController {
    constructor(@inject(UserService) private userService: UserService){
        super();
        console.log('UserController constructor');
    }

    @ApiOperationGet({
        summary: "Get all user",
        responses: {
            200: {description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User"}
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet('/', AuthenticationMiddleware)
    public get(): Promise<Array<User>> {
        return this.userService.getUsers();
    }
}