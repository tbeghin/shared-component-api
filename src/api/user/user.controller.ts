import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {inject} from "inversify";
import TYPES from "../../utils/constant/types";
import {UserService} from "./user.service";
import {User} from "./user";

@ApiPath({
    path: "/user",
    name: "User",
    security: {basicAuth: []}
})
@controller('/')
export class AuthenticationController extends BaseHttpController {
    @inject(TYPES.UserService) private userService: UserService;

    @ApiOperationGet({
        summary: "Get all user",
        responses: {
            200: {description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User"}
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet('/', TYPES.AuthenticationMiddleware)
    public get(): Promise<Array<User>> {
        return this.userService.getUsers();
    }
}