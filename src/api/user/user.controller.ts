import {BaseHttpController, controller, httpGet, httpPost, requestBody} from "inversify-express-utils";
import {ApiOperationGet, ApiOperationPost, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {inject} from "inversify";
import {UserService} from "./user.service";
import {User} from "./user";
import {AuthenticationMiddleware} from "../../utils/middleware/authentication.middleware";
import JsonResult from "inversify-express-utils/dts/results/JsonResult";
import CreatedNegotiatedContentResult from "inversify-express-utils/dts/results/CreatedNegotiatedContentResult";
import {Authenticate} from "../authenticate/authenticate";

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

    @ApiOperationPost({
        summary: 'Create new user',
        parameters: {
            body: {description: "New User", required: true, model: "User"},
        },
        responses: {
            201: {description: "Created"}
        }
    })
    @httpPost('/')
    public async post(@requestBody() request: User): Promise<JsonResult | CreatedNegotiatedContentResult<any>> {
        return this.userService.newUser(request).then(
            () => this.created('', 'Created'),
            (error: any) => this.json(error, 500)
        );
    }
}