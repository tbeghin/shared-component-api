import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {inject} from "inversify";
import {UserService} from "./user.service";
import {User} from "./user";
import {AuthenticationMiddleware} from "../../utils/middleware/authentication.middleware";
import JsonResult from "inversify-express-utils/dts/results/JsonResult";

@ApiPath({
    path: "/user",
    name: "User"
})
@controller('/user')
export class UserController extends BaseHttpController {
    constructor(@inject(UserService) private userService: UserService){
        super();
    }

    @ApiOperationGet({
        summary: "Get all user",
        responses: {
            200: {description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User"}
        }
    })
    @httpGet('/', AuthenticationMiddleware)
    public async get(): Promise<JsonResult> {
        return this.json(await this.userService.getUsers());
    }
}